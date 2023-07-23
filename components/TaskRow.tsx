"use client"
import { deleteTaskAction } from "@/actions/deleteTask";
import { Tasks } from "@prisma/client";
import { useZact } from "zact/client";
import { Loader } from "./loader";
import clsx from 'clsx'
import { Error } from "./Error";
import { toggleCompleteTaskAction } from "@/actions/toggleCompleteTask";
import { ChangeEvent, useEffect, useState } from "react";
import { changeTaskNameAction } from "@/actions/changeTaskName";
import { useDebounce } from "@/hooks/useDebounce";

interface TaskRowProps {
    task: Tasks
}

export const TaskRow = ({ task }: TaskRowProps) => {
    const [name, setName] = useState(task.name ?? "")
    const { mutate: mutateDeleteTask, error: deleteTaskError, isLoading: deleteTaskIsLoading } = useZact(deleteTaskAction);
    const { mutate: mutateCompleteTask, error: completeTaskError, isLoading: completeTaskIsLoading } = useZact(toggleCompleteTaskAction);
    const { mutate: changeTaskNameTask, error: changeTaskNameError, isLoading: changeTaskNameIsLoading } = useZact(changeTaskNameAction);

    const isLoading = deleteTaskIsLoading || completeTaskIsLoading
    const error = deleteTaskError ?? completeTaskError

    const onTaskCheck = (e: ChangeEvent<HTMLInputElement>) => {
        mutateCompleteTask({ isCompleted: e.target.checked, taskId: task.id, projectId: task.projectId })
    }

    const onTaskNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onTaskDelete = () => {
        mutateDeleteTask({
            taskId: task.id, projectId: task.projectId
        })
    }

    const debouncedName = useDebounce(name,300)
    useEffect(() => {
        if (debouncedName != "") {
            console.log({debouncedName})
            changeTaskNameTask({ name: debouncedName, taskId: task.id, projectId: task.projectId });
        }
    }, [debouncedName])

    return (
        <>
            <li className={clsx("relative rounded flex items-center justify-between px-2 mb-1 py-4 border", isLoading ? "animate-pulse bg-gray-500 dark:bg-gray-300" : "bg-transparent")}>
                <input disabled={isLoading} checked={task.completedDateTime !== null} onChange={onTaskCheck} type="checkbox" className=" mr-2" />

                <input className="inline-block bg-transparent mt-1 text-gray-600  w-full " type="text" value={name} onChange={onTaskNameChange} />

                <button
                    onClick={onTaskDelete}
                    disabled={isLoading}
                    className="relative flex items-center justify-center"
                >
                    {deleteTaskIsLoading && <div className="absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2 " ><Loader /> </div>}
                    <svg xmlns="http://www.w3.org/2000/svg" className={clsx("w-5 h-5 text-red-700", deleteTaskIsLoading ? "opacity-0" : "opacity-100")} fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </li>
            <Error message={error?.message} />
        </>
    );
};