import { MouseEventHandler } from "react";

type ButtonType = "button" | "submit" | "reset" | undefined;

interface ButtonProps {
  type: ButtonType;
  value?: string;
  fontSize?: string;
  onClick: MouseEventHandler;
  label: string;
  disabled?: boolean;
}

const Button = ({ type, value, onClick, label, disabled = false, fontSize="text-sm" }: ButtonProps) => {
  return (
    <button
      type={type}
      value={value}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fontSize}
        uppercase
        bg-transparent
        rounded
        border-formsGlobalColor
        border
        px-2
        cursor-pointer
        outline-none
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:shadow-none
        hover:shadow-xl
      `}
    >
      {label}
    </button>
  )
}

export default Button;
