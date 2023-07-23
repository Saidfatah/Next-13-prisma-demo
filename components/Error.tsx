"use client"
export interface ErrorProps {
    message: string | undefined
}

export const Error = ({ message }: ErrorProps) => {
    if (!message) return null

    return (
        <p className=" text-sm text-red-600" >{message}</p>
    );
};