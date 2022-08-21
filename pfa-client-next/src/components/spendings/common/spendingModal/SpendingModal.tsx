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
import adjustFontColor from "@components/shared/helpers/adjustColor";
import { useUserStore } from "@auth/store/userStore";
import useSpendings from "@components/spendings/services/useSpendings";

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
  const { createSpending } = useSpendings();
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
      color: spending.color,
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
  // const dispatch = useDispatch();
  // const categories = useSelector(state => state.spendingsReducer.categories);
  // const recurrings = useSelector(state => state.spendingsReducer.recurrings);

  const getRandomHexColor = () => {
    let r = Math.floor(Math.random()*255).toString(16);
    let g = Math.floor(Math.random()*255).toString(16);
    let b = Math.floor(Math.random()*255).toString(16);
    r = r.length < 2 ? '0' + r : r;
    g = g.length < 2 ? '0' + g : g;
    b = b.length < 2 ? '0' + b : b;
    return r+g+b;
  };

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
      category: selectedCategory,
      currency: user!.baseCurrency,
      userID: user!.id,
      id: spending.ID,
    };

    console.log("spendingEdited", spendingEdited);

    if (isEditing) {
      if (recurringType) {
        // dispatch(updateRecurring(spendingEdited));
      } else {
        // dispatch(updateSpending(spendingEdited));
      }
    } else {
      if (recurringType) {
        const formattedMonth = {
          start: format(month.start, 'yyyy-MM-dd'),
          end: format(month.end, 'yyyy-MM-dd'),
        };
        // dispatch(createRecurring(spendingEdited, formattedMonth));
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
          registerName="spendingLabel"
        />
        <Input
          placeHolder="montant"
          register={register}
          registerName="spendingAmount"
        />

        <Autocomplete
          {...field}
          freeSolo
          autoComplete={true}
          style={{width: "440px"}}
          classes={{
           root: "backgroundColor: yellow"
          }}
          getOptionLabel={(option) => option.name ?? option}
          options={categories?.data || []}
          renderOption={(props, option) => {
            const { name, color } = option;
            return (
              <span
                {...props}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "7px 0",
                  backgroundColor: "white",
                }}
                onMouseOver={(e) => {(e.currentTarget as HTMLInputElement).style.backgroundColor = "rgb(220, 220, 220)"}}
                onMouseOut={(e) => {(e.currentTarget as HTMLInputElement).style.backgroundColor = "white"}}
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "5px",
                    backgroundColor: color,
                    width: "110px",
                    color: adjustFontColor(color),
                    borderRadius: "3px",
                    fontSize: "10px",
                    padding: "2px 10px",
                    textTransform: "uppercase",
                  }}
                >
                  {name}
                </span>
              </span>
            )
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
          onChange={(e, value) => field.onChange(value)}
          onInputChange={(_, data) => {data && field.onChange(data)} }
        />



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
