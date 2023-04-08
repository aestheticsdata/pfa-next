import ConfirmDelete from "@components/common/confirmDelete";
import DeleteSpendingButton from "@components/spendings/common/deleteSpendingButton";

import type { Spending } from "@components/spendings/interfaces/spendingDashboardTypes";

interface ConfirmDeletePopinProps {
  hideConfirm: () => void;
  spending: Spending;
  recurringType: boolean;
}

const ConfirmDeleteSpendingPopin = ({ hideConfirm, spending, recurringType }: ConfirmDeletePopinProps) => {
 return (
   <ConfirmDelete hideConfirm={hideConfirm}>
     <DeleteSpendingButton
       hideConfirm={hideConfirm}
       spending={spending}
       recurringType={recurringType}
     />
   </ConfirmDelete>
 )
};

export default ConfirmDeleteSpendingPopin;
