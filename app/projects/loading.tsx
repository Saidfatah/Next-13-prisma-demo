export default function Loading() {
  return <div className=" animate-pulse flex  h-screen">
  <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3">
      <div className="flex items-center mb-6">
          <div className=" flex">
              <div className="mr-6 h-10 w-40  bg-gray-200 dark:bg-gray-300  rounded" />
          </div>
      </div>
      <ul className="list-reset">
          {[...Array(3)].map((_, index) => (
              <li
                  key={index}
                  className="relative flex items-center justify-between  py-6 border-b last:border-b-0 last:pb-0"
              >
                  <div className="flex justify-between w-full">
                      <span className="w-1/2 h-6 bg-gray-200 dark:bg-gray-300  rounded" />
                      <svg className="text-gray-300 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                  </div>
              </li>
          ))}
      </ul>
  </div>
</div>;
}