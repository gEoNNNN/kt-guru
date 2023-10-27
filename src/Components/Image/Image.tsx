import { ReactNode } from "react";

interface IImage {
  style?: string;
  url: string;
  children?: ReactNode;
  onMouseEnter?: any;
  onMouseLeave?: any;
  onClick?: any;
  text?: any;
  text_style?: string;
}

export default function Image({
  url,
  style,
  onMouseEnter,
  onMouseLeave,
  onClick,
  text,
  text_style,
}: IImage) {
  return (
    <div
      className={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <img src={url} className="rounded-full" />
      <span className={text_style}>{text}</span>
    </div>
  );
}
