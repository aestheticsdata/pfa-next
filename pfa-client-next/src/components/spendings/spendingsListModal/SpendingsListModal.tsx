import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import useDatePickerStore from "@components/datePickerWrapper/store";
import Period from "@components/spendings/spendingDashboard/common/Period";
import getCategoryComponent from "@components/common/Category";

import type { Category } from "@src/interfaces/category";
import useSpendings from "@components/spendings/services/useSpendings";


interface SpendingsListModalProps {
  handleClickOutside: any;
  periodType: string;
  categoryInfos: Category;
}

const SpendingsListModal = ({ handleClickOutside, periodType, categoryInfos }: SpendingsListModalProps) => {
  const { to, from } = useDatePickerStore();
  const { spendingsByWeek, spendingsByMonth } = useSpendings();
  const ref = useRef(null);

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    // prevent scrolling on body when modal is open
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    }
  }, []);

  return (
    <div className="fixed flex justify-center items-center z-50 left-0 right-0 top-0 bottom-0 bg-invoiceFileModalBackground">
      <div
        ref={ref}
        className="absolute flex flex-col w-[700px] h-[520px] bg-grey0 rounded overflow-hidden"
      >
        <div className="flex flex-row justify-around border-b border-b-grey3 mx-3 h-10 items-center">
          <div className="w-1/3">
            {categoryInfos?.category && getCategoryComponent(categoryInfos)}
          </div>
          <div className="w-1/3">total</div>
          <Period periodType={periodType} />
        </div>

        <div className="flex flex-col mx-3">
          {spendingsByMonth
            ?.filter((spending) => spending.category === categoryInfos.category)
            .map((spending, i) =>
              <div key={i}>
                {spending.label}
              </div>
            )}
        </div>

      </div>
    </div>
  );
}

export default SpendingsListModal;
