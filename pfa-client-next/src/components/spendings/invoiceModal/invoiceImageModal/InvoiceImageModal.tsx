import { useRef } from "react";
import useOnClickOutside from 'use-onclickoutside';


const InvoiceImageModal = ({ image, closeImage }) => {
  const ref = useRef(null);
  useOnClickOutside(ref, closeImage);

  return (
    <div
      className="image-container-fullsize"
    >
      <img
        ref={ref}
        src={image}
        alt="invoice"
      />
    </div>
  );
};

export default InvoiceImageModal;
