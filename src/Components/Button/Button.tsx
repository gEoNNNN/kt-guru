import { ReactNode } from "react";

interface IButton {
  style?: string;
  onClick?: () => void;
  children: ReactNode;
  id?: string;
  type?: string;
}

export default function Button({ style, onClick, children, id }: IButton) {
  return (
    <button onClick={onClick} className={style} id={id}>
      {children}
    </button>
  );
}
