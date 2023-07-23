"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from 'zod'
import { zact } from 'zact/server'


type deleteTaskActionInput = {
    taskId: number
    projectId: number
}

//This a server action - works like standard HTML Form actions
export const deleteTaskAction = zact(z.object({ taskId: z.number().gt(-1), projectId: z.number().gt(-1) }))(
    async ({ taskId, projectId }: deleteTaskActionInput) => {

        const deleteTask: Prisma.TasksDeleteArgs = {
            where: {
                id: taskId
            }
        };
        await prisma.tasks.delete(deleteTask);
        revalidatePath(`/projects/${projectId}`);

        return { success: true, message: "Task deleted successfully" };
    }
);