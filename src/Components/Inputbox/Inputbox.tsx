import React, { ReactNode, ForwardedRef } from 'react';

interface IInputboxProps {
  style?: string;
  type?: string;
  id?: string;
  name?: string;
  children?: ReactNode;
  register?: any;
  placeholder?: string;
  value?: string; // Added
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void; 
}


const Inputbox = React.forwardRef<HTMLInputElement, IInputboxProps>(
  ({ style, type, id, name, register, placeholder, value, onChange, onKeyPress }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        className={style}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        ref={ref}
        value={value} 
        onChange={onChange} 
        onKeyPress={onKeyPress} 
        {...register}
      />
    );
  }
);


export default Inputbox;
