import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Layout from "@components/shared/Layout";
import useCategories from "@components/spendings/services/useCategories";
import { selectOptionsCSS } from "@components/common/form/selectOptionCSS";
import useStatisticsCategories from "@components/statistics/helpers/useStatisticsCategories";
import useStatistics from "@components/statistics/services/useStatistics";

const chartsData = [
  {
    "month": "Jan",
    "alimentation": 4000,
    "foo": 2388,
    colors: {
      "alimentation": "#ff339A",
      "foo": "#4756AB",
    }
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
];

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
    console.log("statistics data", statistics);
  }, [statistics]);

  // const initialEmptyCategoryState = {
  //   ID: null,
  //   userID: null,
  //   name: "",
  //   color: null
  // };
  // // const [selectedCategory, setselectedCategory] = useState(initialEmptyCategoryState);

  useEffect(() => {

  }, []);

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
        {statistics && statistics.length > 0 &&
          <div className="bg-grey0 p-4 rounded">
            <BarChart width={800} height={450} data={chartsData}>
              <CartesianGrid strokeDasharray="5 5"/>
              <XAxis dataKey="month"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey="alimentation" fill="blue"/>
              <Bar dataKey="foo" fill="green"/>
            </BarChart>
          </div>
        }

          <div className="bg-grey0 p-4 rounded">
            <LineChart width={730} height={250} data={chartsData}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" dataKey="alimentation" stroke="#8884d8"/>
              <Line type="monotone" dataKey="foo" stroke="#82ca9d"/>
            </LineChart>
          </div>
        </div>
    </Layout>
);
}

export default Statistics;
