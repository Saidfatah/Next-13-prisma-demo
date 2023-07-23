"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from 'zod'
import { zact } from 'zact/server'


type updateTaskNameActionInput = {
    taskId: number
    projectId: number
    name: string
}

//This a server action - works like standard HTML Form actions
export const changeTaskNameAction = zact(z.object({ taskId: z.number().gt(-1), projectId: z.number().gt(-1), name: z.string().min(6) }))(
    async ({ taskId, projectId, name }: updateTaskNameActionInput) => {
        const updateTask: Prisma.TasksUpdateInput = {
            name,
        };

        await prisma.tasks.update({ where: { id: taskId }, data: updateTask });
        revalidatePath(`/projects/${projectId}`);

        return { success: true, message: "Task updated successfully" };
    }
);