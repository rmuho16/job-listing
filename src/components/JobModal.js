import React, {useContext, useEffect, useState} from 'react'
import '../App.css'
import Modal from 'react-bootstrap/Modal'
import {ModalContext} from "../context/ModalContext"
import {updateJob} from "../redux/jobsSlice"
import {useDispatch, useSelector} from "react-redux"

const JobModal = () => {
    const {show, setShow, handleClose} = useContext(ModalContext)
    const jobEdit = useSelector(state => state.jobEdit)
    const dispatch = useDispatch()
    const [showError, setShowError] = useState(false)
    const [state, setState] = React.useState({
        company: "",
        title: "",
        description: "",
        label: "",
        location: "",
    })


    useEffect(() => {
        if (jobEdit.edit === true) {
            state.company = jobEdit.item.company.display_name
            state.title = jobEdit.item.title
            state.description = jobEdit.item.description
            state.label = jobEdit.item.category.label
            state.location = jobEdit.item.location.display_name
            setShow(true)
        }
    }, [jobEdit])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const {company, title, description, label, location} = state

    const handleSubmit = (e) => {
        e.preventDefault()
        const newJob = {
            id: Date.now(),
            title: title,
            company: {display_name: company},
            description,
            category: {label: label},
            location: {display_name: location},
        }
        if (title && company && description && label && location) {
            dispatch(updateJob(
                {
                    id: jobEdit.item.id,
                    title: newJob.title,
                    company: newJob.company,
                    description: newJob.description,
                    category: newJob.category,
                    location: newJob.location
                }
            ))
            setShowError(false)
            setShow(false)

        } else setShowError(true)

        setState({
            company: "",
            title: "",
            description: "",
            label: "",
            location: "",
        });

    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="needs-validation mt-2" onSubmit={handleSubmit}>
                    <div className="row g-3 d-flex justify-content-center">
                        <div className="col-sm-6 col-lg-5">
                            <label htmlFor="company" className="form-label fw-semibold">Company</label>
                            <input type="text" name='company' value={state.company} onChange={handleChange}
                                   className="form-control rounded-0"
                                   placeholder="Enter company name..."/>
                        </div>

                        <div className="col-sm-6 col-lg-5">
                            <label className="form-label fw-semibold">Job title</label>
                            <input type="text" name='title' className="form-control rounded-0" id="jobTitle"
                                   placeholder="Enter job title..." value={state.title} onChange={handleChange}
                                   required/>
                        </div>
                        <div className="col-sm-6 col-lg-5">
                            <label htmlFor="label" className="form-label fw-semibold">Label</label>
                            <input className="form-control rounded-0 " id="exampleFormControlTextarea1"
                                   name='label'
                                   placeholder="Enter job label: e.g.(Engineering Jobs)..." value={state.label}
                                   onChange={handleChange}/>
                        </div>

                        <div className="col-sm-6 col-lg-5">
                            <label htmlFor="location" className="form-label fw-semibold">Location</label>
                            <input className="form-control rounded-0 " id="exampleFormControlTextarea1"
                                   name='location'
                                   placeholder="Enter job location..." value={state.location}
                                   onChange={handleChange}/>
                        </div>
                        <div className="col-sm-6 col-lg-10">
                            <label htmlFor="description" className="form-label fw-semibold">Description</label>
                            <textarea className="form-control rounded-0" id="exampleFormControlTextarea1"
                                      name='description'
                                      placeholder="Enter job description..." value={state.description}
                                      onChange={handleChange}
                                      rows="4"/>
                        </div>
                        {showError &&
                        <p className='text-danger text-center'>Please fill in all inputs</p>}
                        <div className='d-flex justify-content-evenly'>
                            <button type='submit' className='w-auto text-white bg-theme px-5 border-0 py-2 fw-semibold rounded-0'
                                    onClick={handleSubmit}>Submit
                            </button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default JobModal