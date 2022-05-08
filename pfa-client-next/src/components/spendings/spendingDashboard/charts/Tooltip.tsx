import adjustFontColor from "@components/shared/helpers/adjustColor";

interface categoryInfos {
  value: number;
  label: string;
  bgcolor: string;
}

interface TooltipProps {
  tooltipPos: { x: number, y: number };
  categoryInfos: categoryInfos;
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
            className={`flex h-1/2 justify-center items-center uppercase text-tiny font-bold ${adjustFontColor(categoryInfos.bgcolor) === "#ffffff" ? "text-white" : "text-black"}`}
            style={{backgroundColor: categoryInfos?.bgcolor ?? "#ffffff"}}
          >
            {categoryInfos?.label ?? "sans catégories"}
          </div>
        )
      }
    </div>
  )
};

export default Tooltip;

