import {
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import { useForm, useController } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import AutocompleteItem from "@components/spendings/common/spendingModal/AutocompleteItem";
import Layout from "@components/shared/Layout";
import useCategories from "@components/spendings/services/useCategories";
import { useState } from "react";

const data = [
  {
    "month": "Jan",
    "total": 4000,
  },
  {
    "month": "Fev",
    "total": 3000,
  },
  {
    "month": "Mars",
    "total": 2000,
  },
  {
    "month": "Avril",
    "total": 2780,
  },
  {
    "month": "Mai",
    "total": 1890,
  },
  {
    "month": "Juin",
    "total": 2390,
  },
  {
    "month": "Juillet",
    "total": 3490,
  },
  {
    "month": "Aout",
    "total": 3090,
  },
  {
    "month": "Sep",
    "total": 3110,
  },
  {
    "month": "Oct",
    "total": 3400,
  },
  {
    "month": "Nov",
    "total": 1490,
  },
  {
    "month": "Dec",
    "total": 0,
  },
];

const Statistics = () => {
  const { categories } = useCategories();

  const {  control } = useForm<any>({
    mode: "onChange",
  });

  const {
    field,
    fieldState,
  } = useController({
    name: "category",
    control,
    rules: { required: true },
    defaultValue: "",
  });

  const initialEmptyCategoryState = {
    ID: null,
    userID: null,
    name: "",
    color: null
  };
  const [selectedCategory, setselectedCategory] = useState(initialEmptyCategoryState);

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
            <Autocomplete
              {...field}
              freeSolo
              isOptionEqualToValue={(option, value) => {
                return option.ID === value.ID;
              }
              }
              autoComplete={true}
              style={{width: "100%"}}
              classes={{
                root: "backgroundColor: yellow"
              }}
              getOptionLabel={(option) => option.name ?? option}
              options={categories?.data || []}
              renderOption={(props, option) => {
                const { name, color } = option;
                return <AutocompleteItem key={name} props={props} color={color!} name={name} />;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Catégorie"
                  inputRef={field.ref}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
              value={selectedCategory}
              onChange={
                (e, value) => {
                  setselectedCategory(value);
                  return field.onChange(value);
                }
              }
              onInputChange={(_, value) => {value && field.onChange(value)}}
            />
          </div>


        </div>
        <div className="bg-grey0 p-4 rounded">
          <BarChart width={800} height={450} data={data}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="blue" />
          </BarChart>
        </div>
      </div>
    </Layout>
  );
}

export default Statistics;
