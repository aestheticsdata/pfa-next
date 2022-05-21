import {
  useEffect,
  useState,
} from "react";
import Tooltip from "@components/spendings/spendingDashboard/charts/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import WidgetHeader from "@components/spendings/spendingDashboard/common/WidgetHeader";
import useCharts from "@components/spendings/services/useCharts";
import { MONTHLY, WEEKLY } from "@components/spendings/spendingDashboard/common/widgetHeaderConstants";


type periodType = typeof MONTHLY | typeof WEEKLY;

interface ChartsProps {
  title: string;
  periodType: periodType;
}

const getMaxValue = data => Math.max(...data.map(category => +category.value));
const getTotal = data => data.reduce((acc: number, curr) => acc + curr.value, 0);

const widthOfContainer = 290; // 300 - (border width * 2)



const Charts = ({ title, periodType }: ChartsProps) => {
  console.log("periodType", periodType);
  const [maxv, setMaxv] = useState(0);
  const [total, setTotal] = useState(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({x: 0, y: 0});
  const [categoryInfos, setCategoryInfos] = useState(null);
  const { data: charts } = useCharts(periodType);

  useEffect(() => {
    console.log("charts", charts);
    if (charts?.data.length > 0) {
      setMaxv(getMaxValue(charts.data));
      setTotal(getTotal(charts.data));
    }
  }, [charts]);

  const getWidth = value => {
    let width;
    if (maxv !== 0) {
      width = (value * widthOfContainer) / maxv;
    }
    return width;
  }

  return (
    <>
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
            charts.data.map(category => {
              return (
                  <div className="flex items-center gap-x-1" key={category.label}>
                      <div
                        className="h-[15px]"
                        style={{
                          width: getWidth(category.value),
                          backgroundColor: category.bgcolor ?? "#ffffff",
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


/*

const StyledCharts = styled.div`
  .header {
    ${header};
  }

  .spinner {
    text-align: center;
    padding-top: 60px;
  }

  .stats-container {
    height: 185px;
    overflow: hidden;
    overflow-y: auto;

    .charts-icon {
      display: flex;
      justify-content: center;
      font-size: 90px;
      color: ${colors.grey01};
      margin-top: 40px;
    }

    .transition-bar-enter {
      opacity: 0.01;
      transform: scaleX(0);
      transform-origin: left;
    }
    .transition-bar-enter-active {
      opacity: 1;
      transform: scaleX(1);
      transition: all 300ms ease-in;
      transform-origin: left;
    }
    .transition-bar-exit {
      opacity: 1;
      transform: translate(0, 0);
    }
    .transition-bar-exit-active {
      opacity: 0.01;
      transform: translate(0, 10px);
      transition: all 300ms ease-out;
    }

    .bar-container {
      display: flex;
      margin: 5px 0;
      height: 15px;
      .percent-value {
        font-size: 10px;
        font-weight: 600;
        margin-left: 4px;
        line-height: 1.5;
      }
    }
  }
`;
 */
