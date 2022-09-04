import { useRef } from "react";
import useOnClickOutside from 'use-onclickoutside';


const InvoiceImageModal = ({ image, closeImage }) => {
  const ref = useRef(null);
  useOnClickOutside(ref, closeImage);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-grey2 z-10">
      <div className="absolute max-h-screen overflow-y-auto">
        <img
          ref={ref}
          src={image}
          alt="invoice"
        />
      </div>
    </div>
  );
};

export default InvoiceImageModal;

