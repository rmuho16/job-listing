import React from "react";
import '../App.css'

const Pagination = ({jobsPerPage, totalJobs, paginate, currentPage}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className='d-flex justify-content-center mt-4'>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => {paginate(number); window.scrollTo(0, 0)}}
                                className={number === currentPage ?
                                    'checked page-link m-1 rounded-0' :
                                    'page-link m-1 rounded-0'}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination