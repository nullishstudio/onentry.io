import React from "react";
import { Input, InputProps } from "./ui/input";

const TextInput = ({ className, placeholder, ...rest }: InputProps) => {
  return (
    <Input
      placeholder={placeholder}
      {...rest}
      className={`${
        className && className
      } w-full text-sm text-black bg-[#F9FAFC] rounded-xl min-h-[52px] p-4 border-[#EBEFF3] outline-[#7880E9] focus:outline-[#7880E9]`}
    />
  );
};

export default TextInput;
