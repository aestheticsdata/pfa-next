import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import format from 'date-fns/format';
import Button from "@components/common/form/Button";
import Input from "@components/common/form/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Formik,
//   Form,
//   Field,
// } from 'formik';
// import { Autocomplete } from "formik-material-ui-lab";
// import { TextField } from "@material-ui/core";

// import {
//   createRecurring,
//   updateRecurring,
//   createSpending,
//   updateSpending,
//   copyRecurrings,
// } from '../../actions';

// import StyledSpendingModal from './StyledSpendingModal';

import toFixedEval from "@helpers/mathExprEval";

const spendingSchema = z.object({
  spendingLabel: z.string().nonempty(),
  spendingAmount: z.string().nonempty(),
});

type SpendingForm = z.infer<typeof spendingSchema>;


const SpendingModal = ({
   date,
   closeModal,
   user,
   spending,
   recurringType,
   isEditing,
   month,
 }) => {
  const initialEmptyCategoryState = {
    ID: null,
    userID: null,
    name: "",
    color: null
  };
  // const intl = useIntl();
  let initialCategoryState = spending?.category ?
    {
      ID: spending.categoryID,
      userID: user.id,
      name: spending.category,
      color: spending.color,
    }
    :
    initialEmptyCategoryState;

  const { register, handleSubmit, formState } = useForm<SpendingForm>({
    resolver: zodResolver(spendingSchema),
    mode: "onChange",
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

  const onSubmit = (values ) => {
    console.log("onSubmit values", values);
    // const amountEvaluatedExpr = toFixedEval(String(values.amount));
    // const spendingEdited = {
    //   // this format date is required to avoid inconsistency
    //   // when axios convert date in POST request
    //   // see https://github.com/axios/axios/issues/567
    //   date: date ? format(date, 'yyyy-MM-dd') : null,
    //   // ///////////////////////////////////////////////////
    //   label: values.label,
    //   amount: amountEvaluatedExpr,
    //   category: selectedCategory,
    //   currency: user.baseCurrency,
    //   userID: user.id,
    //   id: spending.ID,
    // };

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
        // dispatch(createSpending(spendingEdited));
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
