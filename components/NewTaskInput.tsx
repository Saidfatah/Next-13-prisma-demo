"use client"
import { addTaskAction } from "../actions/addTask";
import { KeyboardEvent, useEffect, useState } from "react";
import { useZact } from "zact/client";
import { Loader } from "./loader";
import clsx from "clsx"
import { Error } from "./Error";

export interface AddTaskProps {
    lastIndex: number;
    projectId: number
}

export const NewTaskInput = ({ lastIndex, projectId }: AddTaskProps) => {
    const { mutate, error, isLoading } = useZact(addTaskAction);
    const [name, setName] = useState<string>('')

    const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            await mutate({
                lastIndex, projectId, name
            })
            setName('')
        }
    };

    return (
        <div>
            <div className={clsx("mt-4 w-full flex justify-between ", isLoading && " animate-pulse")} >
                <input
                    disabled={isLoading}
                    type="text"
                    value={name}
                    onKeyPress={handleKeyPress}
                    onChange={(val) => setName(val.target.value)}
                    className={clsx("flex-grow mr-1 text-xl text-gray-600 px-2 py-3 border rounded border-grey-600", isLoading ? " bg-gray-200 dark:bg-gray-300 " : 'bg-transparent')}
                    placeholder="Add a task..."
                    name="name"
                />

                <button
                    disabled={isLoading}
                    onClick={async () => {
                        await mutate({
                            lastIndex, projectId, name
                        })
                        setName('')
                    }}
                    type="button"
                    className="bg-blue-500 text-white rounded px-4 py-2 relative"
                >
                    {isLoading && <div className="absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2 " ><Loader /> </div>}
                    <span>Add</span>
                </button>

            </div>

            <Error message={error?.message} />

        </div>
    );
};