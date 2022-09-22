import Header from "../components/Header";
import {FiTag, FiMapPin, FiClock, FiTrash, FiEdit, FiBookmark} from "react-icons/fi";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import { Circles } from 'react-loading-icons'


const JobDetails = ({i}) => {
    const jobs = useSelector(state => state.jobs)
    console.log(jobs)
    const params = useParams()
    const job = jobs.find(job => {
        return String(job.id) === String(params.id)
    })

    return (
        <>
            <Header/>

            <div className="container px-4 py-4">
                <main className="container">
                    {job === undefined ?
                        <div>Loading data...</div>
                        :
                        <div className="row g-5">
                            <div className="col-md-8">
                                <article className="blog-post">
                                    <div className='mb-4'>
                                        <h2>{job.title}</h2>
                                        <small><span
                                            className='fw-semibold'>
                                        Job ID:</span> {job.id} | {job.company.display_name}, {job.location.display_name}
                                        </small>
                                    </div>
                                    <div className='mb-2'>
                                        <h3 className="fw-semibold">Description</h3>
                                        <h6 className="fw-semibold">Job Summary</h6>
                                    </div>
                                    <p>{job.description}
                                    </p>

                                </article>
                            </div>

                            <div className="col-md-4 mt-5">
                                <div className="position-sticky">
                                    <div className="">
                                        <h4 className="fw-semibold mb-3">Job Details</h4>
                                        <hr className=''/>
                                        <div className="d-flex">
                                            <span className='m-1 color-theme'><FiMapPin/></span>
                                            <span className='m-1 fw-semibold'><p>{job.location.display_name}</p></span>
                                        </div>
                                        <div className="d-flex ">
                                            <span className='m-1 cursor-pointer color-theme'><FiTag/></span>
                                            <span className='m-1 fw-semibold'><p>{job.category.label}</p></span>
                                        </div>
                                        {/*<div className="d-flex mb-3">*/}
                                        {/*    <span className="m-1 cursor-pointer color-theme"><FiClock/></span>*/}
                                        {/*    <h6 className='text-black'>{job.contract_time}</h6>*/}
                                        {/*</div>*/}
                                        {/*<hr className='w-75'/>*/}
                                        {/*<div className="d-flex mb-3">*/}
                                        {/*    <span className="m-1 cursor-pointer color-theme"><FiLink/></span>*/}
                                        {/*    <a target="_blank" rel='noreferrer'*/}
                                        {/*       href="">View more</a>*/}
                                        {/*</div>*/}
                                        {/*<hr className='w-75'/>*/}

                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </main>
            </div>
        </>
    )
}

export default JobDetails