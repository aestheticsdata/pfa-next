import commonTexts from "@components/common/config/text";
import useSpendings from "@components/spendings/services/useSpendings";
import type { Spending } from "@components/spendings/interfaces/spendingDashboardTypes";

interface ConfirmDeletePopinProps {
  spending: Spending;
  hideConfirm: () => void;
}

const ConfirmDeletePopin = ({ spending, hideConfirm }: ConfirmDeletePopinProps) => {
  const { deleteSpending } = useSpendings();

  return (
    <div className="flex justify-center space-x-4 items-center bg-warningDeleteBackground border border-warningDelete rounded text-xs w-[460px] h-6">
        <div>
          {commonTexts.deletePopin.confirmLabel}
        </div>
      <div className="flex space-x-1">
        <button
          className="border border-grey1 bg-grey0 px-0.5 rounded hover:bg-grey1 hover:text-white"
          onClick={() => hideConfirm()}
        >
          {commonTexts.deletePopin.cancel}
        </button>
        <button
          className="border border-grey1 bg-grey0 px-0.5 rounded hover:bg-grey1 hover:text-white"
          onClick={
            () => {
              deleteSpending.mutate({ spending });
              hideConfirm();
            }
          }>
          {commonTexts.deletePopin.delete}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeletePopin;
