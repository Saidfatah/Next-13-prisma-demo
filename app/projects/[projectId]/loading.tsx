import { ProjectPageProps } from "./page";

const getRandomWidthClass = () => {
    const widthClasses = ["w-20", "w-24", "w-28", "w-32", "w-36", "w-40", "w-50", "w-60", "w-72"];
    const randomIndex = Math.floor(Math.random() * widthClasses.length);
    return widthClasses[randomIndex];
}


export default (props: ProjectPageProps) => {
    return <div className="h-screen flex animate-pulse  ">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3">
            <div className=" bg-gray-200 dark:bg-gray-300 mb-6 mr-6 h-10 w-40 rounded" />
            <div className="mt-4 w-full flex justify-between">

                <div className=" bg-gray-200 dark:bg-gray-300  h-14 w-40 flex-grow mr-1 text-xl px-2 py-3 border rounded border-grey-600" />
                <div className="bg-gray-200 dark:bg-gray-300 rounded flex items-center h-14 px-4 py-2" ><span>Add </span></div>
            </div>

            <ul className="list-reset">
                {[...Array(3)].map((_, index) => (
                    <li
                        key={index}
                        className="relative flex items-center justify-between px-2 py-6 border-b last:border-b-0 last:pb-0"
                    >
                        <div>
                            <div className="flex items-center">
                                <div className="bg-gray-200 dark:bg-gray-300 mr-2 h-4 w-4  rounded" />
                                <div className={"bg-gray-200 dark:bg-gray-300 h-4 rounded " + getRandomWidthClass()} />
                            </div>
                        </div>
                        <div className="absolute right-0 flex items-center" >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
}