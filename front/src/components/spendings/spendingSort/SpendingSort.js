// import StyledSpendingSort from "@components/spendings/spendingSort/StyledSpendingSort";
import SpendingSortItem from "@components/spendings/spendingSort/SpendingSortItem";

const SpendingSort = ({ recurringType, onClickSort }) => {
  return (
    <div>
      <div className="flex justify-between px-4 py-2 select-none text-xxs">
        <SpendingSortItem
          name="label"
          onClickSort={onClickSort}
        />
        {
          !recurringType && (
            <SpendingSortItem
              name="category"
              onClickSort={onClickSort}
            />
          )
        }
        <SpendingSortItem
          name="amount"
          onClickSort={onClickSort}
        />
      </div>
    </div>
  );
};

export default SpendingSort;
