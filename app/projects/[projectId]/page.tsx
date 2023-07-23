import { NewTaskInput } from "@/components/NewTaskInput";
import { TaskRow } from "@/components/TaskRow";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";


export type ProjectPageProps = {
    params: { projectId: string }
}

export default async function Page({ params: { projectId } }: ProjectPageProps) {


    const projectIdParsed = parseInt(projectId)

    if (isNaN(projectIdParsed)) return notFound();

    const project = await prisma.projects.findUnique({ where: { id: projectIdParsed }, select: { name: true, id: true, Tasks: { select: { name: true, order: true, id: true, completedDateTime: true, projectId: true } } } })


    return <div className="flex h-screen" >
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3">
            <div className="flex items-center mb-6">
                <a href="/projects">
                    <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                </a>

                <h2 className="mr-6 text-4xl font-bold text-gray-600 "> {project?.name}</h2>
            </div>
            <div className="relative">
                <NewTaskInput projectId={project?.id as number} lastIndex={project?.Tasks.length ?? 0} />
            </div>
            <ul className="list-reset py-2">
                {project?.Tasks.sort((a, b) => a.order && b.order ? a.order - b.order : 0).sort((a, b) => {
                    if (a.completedDateTime === null && b.completedDateTime !== null) {
                        return 1; // Move objects with undefined completedDateTime to the bottom
                    }
                    if (a.completedDateTime !== null && b.completedDateTime === null) {
                        return -1; // Move objects with defined completedAt to the top
                    }
                    return 0; // Preserve the relative order of other elements
                }).map(task => (
                    <TaskRow key={task.id} task={task} />
                ))}
            </ul>
        </div>
    </div>

}