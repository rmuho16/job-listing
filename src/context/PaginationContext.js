// import {createContext, useState} from "react";
//
//
// export const PaginationContext = createContext()
//
// export const PaginationProvider = ({children}) => {
//     const [currentPage, setCurrentPage] = useState(1)
//     const [jobsPerPage] = useState(12)
//
//     //get current job
//     const indexOfLastJob = currentPage * jobsPerPage;
//     const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//     const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
//
//     //change page
//     const paginate = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     }
//
//     return(
//         <PaginationContext.Provider value={{
//
//         }}>
//             {children}
//         </PaginationContext.Provider>
//     )
// }