import {
  useEffect,
  useState,
  useCallback,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import useCharts from "@components/spendings/services/useCharts";
import Tooltip from "@components/spendings/spendingDashboard/charts/Tooltip";
import WidgetHeader from "@components/spendings/spendingDashboard/common/WidgetHeader";
import SpendingsListModal from "@components/spendings/spendingsListModal/SpendingsListModal";
import { MONTHLY, WEEKLY } from "@components/spendings/spendingDashboard/common/widgetHeaderConstants";

import type { Category } from "@src/interfaces/category";


type periodType = typeof MONTHLY | typeof WEEKLY;

interface ChartsProps {
  title: string;
  periodType: periodType;
}

const getMaxValue = (data: Category[]) => Math.max(...data.map(category => +category.value));
const getTotal = (data: Category[]) => data.reduce((acc, curr) => acc + +curr.value, 0);

const widthOfContainer = 290; // 300 - (border width * 2)

const Charts = ({ title, periodType }: ChartsProps) => {
  const [maxv, setMaxv] = useState(0);
  const [total, setTotal] = useState(0);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({x: 0, y: 0});
  const [categoryInfos, setCategoryInfos] = useState<Category>();
  const { data: charts } = useCharts(periodType);

  useEffect(() => {
    console.log("charts", charts);
    if (charts?.data.length > 0) {
      setMaxv(getMaxValue(charts!.data));
      setTotal(getTotal(charts!.data));
    }
  }, [charts]);

  const handleEscKey = useCallback((event) => {
    if (event.key === "Escape") {
      setIsInvoiceModalVisible(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keyup", handleEscKey, false);
  });

  const getWidth = (value: number) => {
    let width;
    if (maxv !== 0) {
      width = (value * widthOfContainer) / maxv;
    }
    return width;
  }

  return (
    <>
      {
        isInvoiceModalVisible && (
          <SpendingsListModal
            handleClickOutside={() => setIsInvoiceModalVisible(!isInvoiceModalVisible)}
            periodType={periodType}
            categoryInfos={categoryInfos!}
            total={categoryTotal}
          />
        )

      }
      <WidgetHeader
        title={title}
        periodType={periodType}
        center
      />
      <div className="flex w-full h-3/4 overflow-hidden overflow-y-auto">
        {
          charts?.data.length === 0 && (
            <div className="flex justify-center items-center w-full h-full text-8xl text-grey01">
              <div>
                <FontAwesomeIcon icon={faChartBar} />
              </div>
            </div>
          )
        }
        <div className="flex flex-col gap-y-1">
        {
          maxv !== 0 && charts &&
            charts.data.map((category: Category) => {
              return (
                <div
                  key={category.category}
                  className="flex items-center gap-x-1"
                  onClick={() => {
                    setIsInvoiceModalVisible(!isInvoiceModalVisible);
                    setCategoryTotal(category.value);
                  }}
                >
                  <div
                    className="h-[15px] cursor-pointer"
                    style={{
                      width: getWidth(category.value),
                      backgroundColor: category.categoryColor ?? "#ffffff",
                    }}
                    onMouseEnter={() => setIsTooltipVisible(true)}
                    onMouseLeave={() => setIsTooltipVisible(false)}
                    onMouseMove={e => {
                      setTooltipPos({x: e.clientX, y: e.clientY});
                      setCategoryInfos(category);
                    }}
                  />
                  <div className="text-tiny">
                    {Number((category.value / total) * 100).toFixed(1)}%
                  </div>
                </div>
              )
            })
        }
        </div>
        {
          isTooltipVisible && categoryInfos && (
            <Tooltip
              tooltipPos={tooltipPos}
              categoryInfos={categoryInfos}
            />
          )
        }
      </div>
    </>
  )
}

export default Charts;

