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
import PFAResponsiveChartsContainer from "@components/statistics/PFAResponsiveChartsContainer";


const firstYearAvailable = 2018;

const Statistics = () => {
  const { categories } = useCategories();
  const categoriesMarshalled = useStatisticsCategories(categories);
  const [initialCategories, setinitialCategories] = useState();

  const makeYearsOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - firstYearAvailable + 1 },
      (_, i) => firstYearAvailable + i
    );
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
      <div className="flex flex-col gap-y-8 mt-20 p-2 w-full">
        <div className="flex flex-col space-y-2 w-full">
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

        <div className="w-full flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <PFAResponsiveChartsContainer>
            <PFABarCharts data={statistics} year={initialYear.value} />
          </PFAResponsiveChartsContainer>

          <PFAResponsiveChartsContainer>
            <PFALineCharts data={statistics} year={initialYear.value} />
          </PFAResponsiveChartsContainer>
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
