"use client";
import React from "react";

interface InputProps {
  type: any;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  textarea?: boolean;
  id: string;
  placeholder?: string;
  big?: boolean;
}
const Input = ({
  type,
  value,
  onChange,
  name,
  textarea,
  id,
  placeholder,
  big,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`w-full p-5 m-[20px] font-light bg-white rounded  outline-none text-black ${
        big ? "w-[400px] pb-[6rem] " : ""
      }`}
    />
  );
};

export default Input;
