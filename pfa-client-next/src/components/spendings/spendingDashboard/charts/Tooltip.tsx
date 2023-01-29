import adjustFontColor from "@components/shared/helpers/adjustColor";

import type { CategoryProps } from "@src/interfaces/category";


interface TooltipProps {
  tooltipPos: { x: number, y: number };
  categoryInfos: CategoryProps;
}

const Tooltip = ({ tooltipPos, categoryInfos }: TooltipProps) => {
  return (
    <div
      className="flex flex-col absolute w-[100px] h-[50px] bg-grey1 rounded border border-grey0 text-xs shadow-charttooltip"
      style={{
        left: tooltipPos.x + 20 + 'px',
        top: tooltipPos.y - 50 + 'px',
      }}
    >
      <div className="flex h-1/2 justify-center items-center text-white">
        {
          categoryInfos && (
            <div>{Number(categoryInfos.value).toFixed(2)} €</div>
          )
        }
      </div>
      {
        categoryInfos && (
          <div
            className={`flex h-1/2 justify-center items-center uppercase text-tiny font-bold ${adjustFontColor(categoryInfos.categoryColor) === "#ffffff" ? "text-white" : "text-black"}`}
            style={{backgroundColor: categoryInfos?.categoryColor ?? "#ffffff"}}
          >
            {categoryInfos?.category ?? "sans catégories"}
          </div>
        )
      }
    </div>
  )
};

export default Tooltip;

