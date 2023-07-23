"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from 'zod'
import { zact } from 'zact/server'

const saveTaskToDB = async (data: Prisma.TasksCreateInput) => {
    return await prisma.tasks.create({ data });

}

type AddTAskActionInput = {
    lastIndex: number
    projectId: number
    name: string
}

//This a server action - works like standard HTML Form actions
export const addTaskAction = zact(z.object({ lastIndex: z.number().gt(-1), projectId: z.number().min(0), name: z.string().min(6) }))(
    async ({ lastIndex, projectId, name }: AddTAskActionInput) => {
        const project: Prisma.ProjectsCreateNestedOneWithoutTasksInput = {
            connect: { id: projectId }
        }
        const newTask: Prisma.TasksCreateInput = {
            name,
            project,
            order: lastIndex ? lastIndex + 1 : lastIndex,
        };

        const taskCreated = await saveTaskToDB(newTask);

        revalidatePath(`/projects/${projectId}`);

        return { success: true, task: taskCreated };
    }
);