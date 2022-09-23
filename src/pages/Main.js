import React, {useState} from "react"
import '../App.css'
import Header from "../components/Header"
import AddButton from "../components/AddButton"
import SearchInput from "../components/SearchInput"
import Jobs from "../components/Jobs"
import {useSelector} from "react-redux"
import Pagination from "../components/Pagination"
import {isRecruiter} from "../services/auth"

const Main = () => {
    const jobs = useSelector(state => state.jobs)

    const [searchText, setSearchText] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [jobsPerPage] = useState(15)

    const filteredJobs = jobs.filter(job => {
        return (
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.company.display_name.toLowerCase().includes(searchText.toLowerCase()) ||
            // job.description.toLowerCase().includes(searchText.toLowerCase()) ||
            job.category.label.toLowerCase().includes(searchText.toLowerCase())
        )
    })

    //get current job
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

    //change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <Header/>
            <div className="py-5">
                <div className="container">
                    {isRecruiter() && <AddButton/>}
                    <SearchInput searchText={searchText} setSearchText={setSearchText}/>
                    {jobs ?
                        <Jobs filteredJobs={currentJobs} searchText={searchText}/>
                        : <h3 className='text-center'>Sorry, no jobs available</h3>
                    }
                    {jobs &&
                    <Pagination jobsPerPage={jobsPerPage} totalJobs={filteredJobs.length} paginate={paginate}
                                currentPage={currentPage}/>
                    }
                </div>
            </div>
        </>
    )
}

export default Main