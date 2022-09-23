import {addApplied, addFavourite, deleteApplied, deleteFavourite, deleteJob, editJob} from "../redux/jobsSlice"
import {Link} from "react-router-dom"
import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {FiBookmark, FiEdit, FiTrash} from "react-icons/fi"
import './Jobs.css'
import JobModal from "./JobModal"
import {isJobSeeker, isLoggedIn, isRecruiter} from "../services/auth"

const Jobs = ({filteredJobs}) => {
    const dispatch = useDispatch()
    const favs = useSelector(state => state.favouriteJobs)

    const applyForJob = (job) => {
        if (isLoggedIn() && isJobSeeker()) {
            dispatch(addApplied({id: job.id, job}))
        } else {
            alert('You do not have the right access to do this.')
        }
    }

    const onEditJob = (job) => {
        if (isLoggedIn() && isRecruiter()) {
            dispatch(editJob(job))
        } else {
            alert('You do not have the right access to do this.')
        }
    }

    const isFav = (job) => {
        for (let i in favs) {
            if (String(favs[i].id) === String(job.id)) {
                return true
            }
        }
        return false
    }

    return (
        <section className="pt-5 pb-5">
            <div className="container">
                <JobModal/>
                <div className="row card-deck">
                    {filteredJobs.map(job => (
                        <div className=" col-lg-4 d-flex align-items-stretch mb-3" key={job.id}>
                            <div className="card shadow-sm border-0 cardWidth">
                                <div className="card-body d-flex flex-column flex-row">
                                    <div className="d-flex flex-row-reverse">
                                        {isRecruiter() &&
                                        <>
                                            <span
                                                role="button"
                                                onClick={() => {
                                                    window.confirm('Are you sure you want to delete this item?') &&
                                                    dispatch(deleteJob({id: job.id}))
                                                }
                                                }
                                                className="m-1"><FiTrash/>
                                            </span>

                                            <span
                                                role="button"
                                                onClick={() => onEditJob(job)}
                                                className="m-1 cursor-pointer"><FiEdit/>
                                        </span>
                                        </>
                                        }

                                        {isLoggedIn() &&

                                        ((isFav(job) === false && isJobSeeker()) ?
                                                <span
                                                    role="button"
                                                    onClick={() => {
                                                        dispatch(addFavourite({id: job.id, job}))
                                                    }}
                                                    className='m-1 cursor-pointer'>
                                            <FiBookmark/>
                                            </span>
                                                : (isFav(job) === true && isJobSeeker()) &&
                                                <span
                                                    role="button"
                                                    onClick={() => {
                                                        dispatch(deleteFavourite({id: job.id}))
                                                    }}
                                                    className='m-1 cursor-pointer text-warning'>
                                            <FiBookmark/>
                                            </span>
                                        )
                                        }

                                        {isJobSeeker() &&
                                        (job.applied === false ?
                                            <span
                                                role="button"
                                                onClick={() => applyForJob(job)}
                                                className='m-1 fw-semibold color-theme'>
                                            <p>Apply</p>
                                            </span>
                                            :
                                            <span
                                                role="button"
                                                onClick={() => {
                                                    dispatch(deleteApplied({id: job.id}))
                                                }}
                                                className='m-1 fw-semibold color-theme'>
                                                <p>Remove application</p>
                                            </span>)
                                        }
                                    </div>
                                    <h5 className="title color-theme">
                                        {job.company.display_name}
                                    </h5>
                                    <small className="text-muted">
                                        {job.category.label}
                                    </small>
                                    <h4 className='card-text text-black'>
                                        {job.title}
                                    </h4>
                                    <Link to={`/job-details/${job.id}`}
                                          className='text-decoration-none mt-auto align-self-center w-100'>
                                        <button
                                            className='w-100 bg-theme text-white border-0 px-8 py-2 fw-semibold rounded-0'>
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Jobs