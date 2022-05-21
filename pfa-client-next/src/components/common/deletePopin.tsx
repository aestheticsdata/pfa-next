import commonTexts from "@components/common/config/text";

const ConfirmDeletePopin = ({ item, hideConfirm }) => {
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
              // deleteCallback(item.ID, item.itemType);
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
