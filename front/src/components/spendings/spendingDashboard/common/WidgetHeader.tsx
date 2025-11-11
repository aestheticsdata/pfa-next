import Period from "@components/spendings/spendingDashboard/common/Period";


interface WidgetHeaderProps {
  title: string;
  periodType: string;
  center?: boolean;
}

const WidgetHeader = ({ title, periodType, center = false }: WidgetHeaderProps) => (
  <div className={`flex flex-col w-5/6 border-b border-b-grey2 ${center ? "items-center" : "items-start"} text-xs py-2`}>
    <div className="font-bold uppercase">
      {title}
    </div>
    <Period periodType={periodType} />
  </div>
);

export default WidgetHeader;

