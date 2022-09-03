import { useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";
import format from 'date-fns/format';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import Button from "@components/common/form/Button";
import Input from "@components/common/form/Input";
import toFixedEval from "@helpers/mathExprEval";
import useCategories from "@components/spendings/services/useCategories";
import { useUserStore } from "@auth/store/userStore";
import useSpendings from "@components/spendings/services/useSpendings";
import useReccurings from "@components/spendings/services/useReccurings";
import AutocompleteItem from "@components/spendings/common/spendingModal/AutocompleteItem";
import category from "@components/common/Category";
import Swal from "sweetalert2";

const spendingSchema = z.object({
  spendingLabel: z.string().nonempty(),
  spendingAmount: z.string().nonempty(),
  category: z.any(),
});

type SpendingForm = z.infer<typeof spendingSchema>;


const SpendingModal = ({
   date,
   closeModal,
   spending,
   recurringType,
   isEditing,
   month,
 }) => {
  const user = useUserStore((state) => state.user);
  const { createSpending, updateSpending } = useSpendings();
  const { createRecurring, updateRecurring } = useReccurings();
  const { data: categories } = useCategories();


  const initialEmptyCategoryState = {
    ID: null,
    userID: null,
    name: "",
    color: null
  };
  let initialCategoryState = spending?.category ?
    {
      ID: spending.categoryID,
      userID: user?.id,
      name: spending.category,
      color: spending.categoryColor,
    }
    :
    initialEmptyCategoryState;

  const { register, handleSubmit, formState, control } = useForm<SpendingForm>({
    resolver: zodResolver(spendingSchema),
    mode: "onChange",
  });

  const {
    field,
    fieldState,
  } = useController({
    name: "category",
    control,
    rules: { required: true },
    defaultValue: "",
  });

  const [selectedCategory, setselectedCategory] = useState(initialCategoryState);

  const getRandomHexColor = () => {
    let r = Math.floor(Math.random()*255).toString(16);
    let g = Math.floor(Math.random()*255).toString(16);
    let b = Math.floor(Math.random()*255).toString(16);
    r = r.length < 2 ? "0" + r : r;
    g = g.length < 2 ? "0" + g : g;
    b = b.length < 2 ? "0" + b : b;
    return `${r}${g}${b}`;
  };

  const processCategory = (values: SpendingForm) => {
    let tempCategory;

    if (!values.category) { // it's a category deletion
      tempCategory = {
        ID: null,
        userID: user!.id,
        name: "",
        color: null, // if there is a name, it's a new category, else it's a category deletion
      }
    } else if ((!selectedCategory?.name || !selectedCategory) && !!values.category) { // so it's a new category. 1) !selectedCategory?.name: pas de catégorie vers une nouvelle catégorie qui n'existe pas encore. 2) !selectedCategory: on passe d'une catégorie qui existe à une nouvelle catégorie qui n'existe pas encore
      tempCategory = {
        ID: null,
        userID: user!.id,
        name: values.category,
        color: `#${getRandomHexColor()}` // if there is a name, it's a new category, else it's a category deletion
      }
    } else {
      // changement de catégorie qui existe deja, ou meme categorie inchangee
      tempCategory = selectedCategory;
    }

    return tempCategory;
  }

  const onSubmit = (values: SpendingForm) => {
    console.log("onSubmit values", values);
    const amountEvaluatedExpr = toFixedEval(String(values.spendingAmount));
    const spendingEdited = {
      // this format date is required to avoid inconsistency
      // when axios convert date in POST request
      // see https://github.com/axios/axios/issues/567
      date: date ? format(date, 'yyyy-MM-dd') : null,
      // ///////////////////////////////////////////////////
      label: values.spendingLabel,
      amount: amountEvaluatedExpr,
      category: processCategory(values),
      currency: user!.baseCurrency,
      userID: user!.id,
      id: spending.ID,
    };

    console.log("spendingEdited", spendingEdited);

    if (isEditing) {
      if (recurringType) {
        // dispatch(updateRecurring(spendingEdited));
        updateRecurring.mutate(spendingEdited);
      } else {
        updateSpending.mutate(spendingEdited);
      }
    } else {
      if (recurringType) {
        const formattedMonth = {
          start: format(month.start, 'yyyy-MM-dd'),
          end: format(month.end, 'yyyy-MM-dd'),
        };
        createRecurring.mutate({ spendingEdited, formattedMonth });
      } else {
        createSpending.mutate(spendingEdited);
      }
    }

    closeModal();
  };

  const handleAutocompleteChange = (value) => {
    setselectedCategory(value ?? initialEmptyCategoryState);
  }

  return (
    <div className={`
      flex bg-spendingItemHover p-2 rounded-b
      ${recurringType
        ? "md:w-[398px] h-[220px]"
        : "md:w-[488px] h-[285px]"
        }
      absolute top-11`
    }>
      <form className="flex flex-col w-full items-center px-4 pt-2 space-y-2">
        <Input
          placeHolder="label"
          register={register}
          defaultValue={spending.label}
          registerName="spendingLabel"
        />
        <Input
          placeHolder="montant"
          register={register}
          defaultValue={spending.amount}
          registerName="spendingAmount"
        />

        {!recurringType &&
          <Autocomplete
            {...field}
            freeSolo
            isOptionEqualToValue={(option, value) => {
                return option.ID === value.ID;
              }
            }
            autoComplete={true}
            style={{width: "440px"}}
            classes={{
             root: "backgroundColor: yellow"
            }}
            getOptionLabel={(option) => option.name ?? option}
            options={categories?.data || []}
            renderOption={(props, option) => {
              const { name, color } = option;
              return <AutocompleteItem key={name} props={props} color={color!} name={name} />;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Catégorie"
                inputRef={field.ref}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
            value={selectedCategory}
            onChange={
              (e, value) => {
                setselectedCategory(value);
                return field.onChange(value);
              }
            }
            onInputChange={(_, value) => {value && field.onChange(value)}}
          />
        }

        <Button
          type="submit"
          disabled={formState.isSubmitting || !formState.isValid}
          label={isEditing ? "Mettre à jour" : "Créer"}
          onClick={handleSubmit(onSubmit)}
        />
        <Button
          type="reset"
          value="Reset"
          onClick={() => closeModal()}
          label="annuler"
        />
      </form>
    </div>
  )
};

export default SpendingModal;
