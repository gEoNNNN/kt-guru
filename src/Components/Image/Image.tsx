import React, { ReactNode } from "react";

interface IImage {
  style?: string;
  url: string;
  children?: ReactNode;
  onMouseEnter?:any;
  onMouseLeave?:any;

  
}

export default function Image({ url, style, children, onMouseEnter, onMouseLeave }: IImage) {
  return (
    <div className={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
      <img src={url} className="rounded-full" />
    </div>
  );
}