import ConfirmDelete from "@components/common/confirmDelete";
import DeleteInvoiceButton from "@components/spendings/invoiceModal/deleteInvoiceButton";

const ConfirmDeleteInvoicePopin = ({ hideConfirm, deleteInvoice }) => {
  return (
    <ConfirmDelete hideConfirm={hideConfirm}>
      <DeleteInvoiceButton
        hideConfirm={hideConfirm}
        deleteInvoice={deleteInvoice}
      />
    </ConfirmDelete>
  )
}

export default ConfirmDeleteInvoicePopin;
