import { useState } from "react";
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

  const makeYearsOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = new Array(currentYear - 2018 + 1).fill(2018).map((start, index) => start + index);
    return years.map(year => ({ value: year, label: year }));
  };
  const [initialYear, setinitialYear] = useState(new Date().getFullYear());

  const { control, watch } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      categories: [],
    }
  });

  const categorySelectorWatcher = watch("categorySelector");
  const yearSelectorWatcher = watch("yearSelector");
  const { isLoading: isStatisticsLoading, statistics } = useStatistics(categorySelectorWatcher, yearSelectorWatcher);

  return (
    <Layout>
      <div className="flex flex-col gap-y-8 mt-20 p-2">
        <div className="flex flex-col space-y-2">
          <Controller
            name="yearSelector"
            control={control}
            render={({field}) =>
              <Select
                placeholder="Select Year"
                isMulti={false}
                styles={selectOptionsCSS("500px")}
                options={makeYearsOptions()}
                value={initialYear}
                onChange={(selectedYear) => {
                  setinitialYear(selectedYear);
                  field.onChange(selectedYear);
                }}
              />
            }
          />

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

        <div className="bg-grey0 p-4 rounded">
          <PFABarCharts data={statistics} year={initialYear.value} />
        </div>

        <div className="bg-grey0 p-4 rounded">
         <PFALineCharts data={chartsData} />
        </div>

      </div>

      {isStatisticsLoading &&
        <div className="flex absolute items-center justify-center z-10 inset-0 bg-green-50 opacity-70">
          Loading statistics...
        </div>
      }

    </Layout>
);
}

export default Statistics;
