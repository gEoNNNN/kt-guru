import React, { ReactNode } from 'react';

interface IInputboxProps {
  style?: string;
  type?: string;
  id?: string;
  name?: string;
  children?: ReactNode;
  register?:any;
}

export default function Inputbox({
  style,
  type,
  id,
  name,
  children,
  register,
}: IInputboxProps) {
  return (
    <input
      className={style}
      type={type}
      id={id}
      name={name}
      placeholder={children as string}
      {...register}
    />
  );
}
