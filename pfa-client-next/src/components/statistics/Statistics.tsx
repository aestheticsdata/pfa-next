import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Layout from "@components/shared/Layout";
import useCategories from "@components/spendings/services/useCategories";
import { selectOptionsCSS } from "@components/common/form/selectOptionCSS";
import useStatisticsCategories from "@components/statistics/helpers/useStatisticsCategories";
import useStatistics from "@components/statistics/services/useStatistics";
import PFABarCharts from "@components/statistics/PFABarCharts";
import PFALineCharts from "@components/statistics/PFALineCharts";

const chartsData = {
  colors: {
    "alimentation": "#ff339A",
    "foo": "#4756AB",
  },
  data: {
    2022: [
      {
        "month": "Jan 2022",
        "alimentation": 4000,
        "foo": 2388,
      },
      {
        "month": "Fev",
        "alimentation": 3000,
        "foo": 2388,
      },
      {
        "month": "Mars",
        "alimentation": 2000,
        "foo": 2388,
      },
      {
        "month": "Avril",
        "alimentation": 2780,
        "foo": 2388,
      },
      {
        "month": "Mai",
        "alimentation": 1890,
        "foo": 2388,
      },
      {
        "month": "Juin",
        "alimentation": 2390,
        "foo": 2388,
      },
      {
        "month": "Juillet",
        "alimentation": 3490,
        "foo": 2388,
      },
      {
        "month": "Aout",
        "alimentation": 3090,
        "foo": 2388,
      },
      {
        "month": "Sep",
        "alimentation": 3110,
        "foo": 3726,
      },
      {
        "month": "Oct",
        "alimentation": 3400,
        "foo": 2388,
      },
      {
        "month": "Nov",
        "alimentation": 1490,
        "foo": 1388,
      },
      {
        "month": "Dec",
        "alimentation": 0,
        "foo": 2388,
      },
    ]
  }
}
const chartsDataAlt = {
  "colors": {
    "aliments": "#87086a",
    "fsfs": "#e7453a"
  },
  "data": {
    "2022": [
      {
        "month": "mars",
        "aliments": "60.00",
        "fsfs": "0"
      },
      {
        "month": "avr.",
        "aliments": "55.00",
        "fsfs": "210.00"
      },
      {
        "month": "mai",
        "aliments": "40.00",
        "fsfs": "210.00"
      },
      {
        "month": "juin",
        "aliments": "78.00",
        "fsfs": "210.00"
      },
      {
        "month": "déc.",
        "aliments": "106.90",
        "fsfs": "40.00"
      }
    ]
  }
};
const Statistics = () => {
  const { categories } = useCategories();
  const categoriesMarshalled = useStatisticsCategories(categories);
  const [initialCategories, setinitialCategories] = useState();

  const { control, watch } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      categories: [],
    }
  });

  const categorySelectorWatcher = watch("categorySelector");
  const { isLoading, statistics } = useStatistics(categorySelectorWatcher);

  useEffect(() => {
    console.log(categorySelectorWatcher);
  }, [categorySelectorWatcher]);

  useEffect(() => {
    statistics?.data?.[2022] && console.log("statistics data WTF",  statistics.data[2022]);
  }, [statistics]);

  return (
    <Layout>
      <div className="flex flex-col gap-y-8 mt-20 p-2">
        <div>
          <select name="year" id="year">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2023</option>
          </select>

          <div>
            {categoriesMarshalled &&
              <div>
                <Controller
                  name="categorySelector"
                  control={control}
                  render={({field}) =>
                    <Select
                      placeholder="Catégories"
                      isMulti={true}
                      styles={selectOptionsCSS("500px")}
                      options={categoriesMarshalled}
                      value={initialCategories}
                      onChange={(selectedOptions) => {
                        setinitialCategories(selectedOptions);
                        field.onChange(selectedOptions);
                      }}
                    />
                  }
                />
              </div>
            }
          </div>


        </div>
        {/*{statistics?.data?.[2022]?.length > 0 &&*/}
          <div className="bg-grey0 p-4 rounded">
            <PFABarCharts data={statistics} year={2022} />
          </div>
        {/*}*/}

          <div className="bg-grey0 p-4 rounded">
           <PFALineCharts data={chartsData} />
          </div>
        </div>
    </Layout>
);
}

export default Statistics;
