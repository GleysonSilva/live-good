import { InputHTMLAttributes } from "react";
import "../styles/input.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  colorBorder?: Boolean;
};

export function Input({ colorBorder, ...props }: InputProps) {
  // className={colorBorder} console.log(props);
  return (
    <div className="content-input">
      <label>{props.label}</label>
      <input {...props} />
    </div>
  );
}
