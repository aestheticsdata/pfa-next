import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import useDatePickerStore from "@components/datePickerWrapper/store";
import Period from "@components/spendings/spendingDashboard/common/Period";

import type { CategoryInfos } from "@components/spendings/interfaces/categoryInfos";


interface SpendingsListModalProps {
  handleClickOutside: any;
  periodType: string;
  categoryInfos: CategoryInfos | undefined;
}

const SpendingsListModal = ({ handleClickOutside, periodType, categoryInfos }: SpendingsListModalProps) => {
  const { to, from } = useDatePickerStore();
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
        className="absolute w-[700px] h-[520px] bg-grey0 rounded overflow-hidden"
      >
        <Period periodType={periodType} />
      </div>
    </div>
  );
}

export default SpendingsListModal;
