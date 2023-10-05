import React, { ReactNode } from 'react';

interface IInputboxProps {
  style?: string;
  type?: string;
  id?: string;
  name?: string;
  children?: ReactNode;
  register?: any;
  placeholder?: string; // Add the placeholder prop
}

export default function Inputbox({
  style,
  type,
  id,
  name,
  children,
  register,
  placeholder,
}: IInputboxProps) {
  return (
    <input
      className={style}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder} // Include the placeholder prop here
      {...register}
    />
  );
}
