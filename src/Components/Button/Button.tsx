import React, { ReactNode } from 'react'

interface IButton {
    style?:string
    onClick?:()=>void
    children:ReactNode
}

export default function Button({style,onClick,children}:IButton) {
  return (
    <button onClick={onClick} className={style} >
        {children}
    </button>
  )
}
