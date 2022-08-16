import type { FieldValue, UseFormRegister } from "react-hook-form";

interface InputProps<T> {
  register: UseFormRegister<T>;
  registerName: string;
  placeHolder: string;
}

const Input = ({ register, registerName, placeHolder }: InputProps<FieldValue<any>>) => {
  return (
    <input
      className="text-inherit py-2 w-full bg-transparent border-b-formsGlobalColor border-b outline-none"
      placeholder={placeHolder}
      {...register(registerName)}
    />
  );
}

export default Input;
