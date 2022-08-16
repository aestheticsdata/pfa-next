import { MouseEventHandler } from "react";

type ButtonType = "button" | "submit" | "reset" | undefined;

interface ButtonProps {
  type: ButtonType;
  value?: string;
  onClick: MouseEventHandler;
  label: string;
  disabled?: boolean;
}

const Button = ({ type, value, onClick, label, disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      value={value}
      onClick={onClick}
      disabled={disabled}
      className="
        text-sm
        uppercase
        bg-transparent
        rounded
        border-formsGlobalColor
        border
        w-1/2
        cursor-pointer
        outline-none
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:shadow-none
        hover:shadow-xl
      "
    >
      {label}
    </button>
  )
}

export default Button;
