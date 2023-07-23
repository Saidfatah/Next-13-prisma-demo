"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from 'zod'
import { zact } from 'zact/server'


type updateTaskActionInput = {
    taskId: number
    projectId: number
    isCompleted?: boolean
}

//This a server action - works like standard HTML Form actions
export const toggleCompleteTaskAction = zact(z.object({ taskId: z.number().gt(-1), projectId: z.number().gt(-1), isCompleted: z.boolean() }))(
    async ({ taskId, projectId, isCompleted }: updateTaskActionInput) => {
        const updateTask: Prisma.TasksUpdateInput = {
            completedDateTime: isCompleted ? new Date() : null,
        };

        await prisma.tasks.update({ where: { id: taskId }, data: updateTask });
        revalidatePath(`/projects/${projectId}`);

        return { success: true, message: "Task updated successfully" };
    }
);