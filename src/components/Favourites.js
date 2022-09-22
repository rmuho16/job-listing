import {Link} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import JobModal from "./JobModal";
import {deleteFavourite} from "../redux/jobsSlice";
import {FiBookmark} from "react-icons/fi";

const Favourites = () => {
    const favourite = useSelector(state => state.favouriteJobs)

    const dispatch = useDispatch()
    return (
        <section className="pt-5 pb-5">
            <div className="container">
                <JobModal/>
                <div className="row card-deck">
                    {favourite?.map(favJob => (
                        <div className=" col-lg-4 d-flex align-items-stretch mb-3" key={favJob.id}>
                            <div className="card shadow-sm border-0 cardWidth">
                                <div className="card-body d-flex flex-column flex-row">
                                    <div className="d-flex flex-row-reverse">
                                        <span
                                            onClick={() =>
                                            {
                                                dispatch(deleteFavourite({id: favJob.id}))}
                                            }
                                            className="m-1 cursor-pointer text-warning">
                                            <FiBookmark/>
                                </span>
                                    </div>
                                    <h5 className="title color-theme">
                                        {favJob.job.company.display_name}
                                    </h5>
                                    <small className="text-muted">
                                        {favJob.job.category.label}
                                    </small>
                                    <h4 className='card-text text-black'>
                                        {favJob.job.title}
                                    </h4>
                                    <Link to={`/job-details/${favJob.id}`}
                                          className='text-decoration-none text-white mt-auto align-self-center w-100'>
                                        <button className='w-100 bg-theme text-white border-0 px-8 py-2 fw-semibold rounded-0'>
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

export default Favourites