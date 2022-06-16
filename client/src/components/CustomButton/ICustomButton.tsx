import { MouseEventHandler, ReactNode } from 'react'

export interface ICustomButton {
    id?: string;
    name?: string;
    color: string;
    type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined;
    _key: string;
    onClick: MouseEventHandler<HTMLElement>;
    className?: string;
    children: ReactNode | string;
    loading?: boolean;
    customStyle?: any;
}