
import prisma from "@/lib/prisma";
import Link from 'next/link';
export default async function Page() {
    await setTimeout(() => {
        console.log("finished")
    }, 3000);
    const projects = await prisma.projects.findMany();

    return <div className="flex  h-screen">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3">
            <div className="flex items-center mb-6">
                <h2 className="mr-6 text-4xl font-bold text-gray-600 "> My projects</h2>
            </div>

            <ul className="list-reset">
                {projects.map((project) => (
                    <li key={project.id} className="relative flex items-center justify-between px-2 py-6 border-b last:border-b-0 last:pb-0" >
                        <Link className="text-gray-600 flex justify-between w-full" href={"/projects/" + project.id}>
                            <span>
                                {project.name}
                            </span>
                            <svg className="text-gray-600 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>;
                    </li>
                ))}

            </ul>
        </div>
    </div>

}