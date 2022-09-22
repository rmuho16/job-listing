import {useState} from "react"
import {useDispatch} from "react-redux"
import {addJob} from "../redux/jobsSlice"

const AddButton = () => {
    const dispatch = useDispatch()
    const [company, setCompany] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [label, setLabel] = useState('')
    const [location, setLocation] = useState('')
    const [showInputs, setShowInputs] = useState(false)
    const [showInputError, setShowInputError] = useState(false)
    const bookmarked = false
    const applied = false


    const handleShow = (e) => {
        e.preventDefault()
        setShowInputs(currInputs => !currInputs)
    }

    const handleCompany = (e) => {
        setCompany(e.target.value)
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleLabel = (e) => {
        setLabel(e.target.value)
    }

    const handleLocation = e => {
        setLocation(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newJob = {
            id: Date.now(),
            title: title,
            company: {display_name: company},
            description,
            category: {label: label},
            location: {display_name: location},
            bookmarked,
            applied
        }

        if (title && company && description
            && label
            && location) {
            dispatch(addJob(newJob))
            setCompany('')
            setDescription('')
            setTitle('')
            setLabel('')
            setLocation('')
            setShowInputs(false)
        } else {
            setShowInputError(true)
        }

    }

    return (
        <>
            <button onClick={handleShow}
                    className='mx-2 w-auto text-white border-0 bg-theme px-5 py-2 fw-semibold rounded-0'>
                Add Job
            </button>

            {/*<FaPlus className='faIcon'/>*/}
            {showInputs &&
                <form className="needs-validation mt-2" onSubmit={handleSubmit}>
                    <div className="row g-3 d-flex justify-content-center">
                        <div className="col-sm-6 col-lg-5">
                            <label htmlFor="firstName" className="form-label fw-semibold">Company</label>
                            <input type="text" value={company} onChange={handleCompany} className="form-control rounded-0"
                                   placeholder="Enter company name..."/>
                            <div className="invalid-feedback">
                                Company name is required.
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-5">
                            <label className="form-label fw-semibold">Job title</label>
                            <input type="text" className="form-control rounded-0" id="jobTitle"
                                   placeholder="Enter job title..." value={title} onChange={handleTitle}
                                   required/>
                            <div className="invalid-feedback">
                                Job title is required.
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-5">
                            <label htmlFor="location" className="form-label fw-semibold">Location</label>
                            <input className="form-control rounded-0 " id="exampleFormControlTextarea1"
                                   placeholder="Enter job location..." value={location}
                                   onChange={handleLocation}/>
                            <div className="invalid-feedback">
                                Job location is required.
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-5">
                            <label htmlFor="label" className="form-label fw-semibold">Label</label>
                            <input className="form-control rounded-0 " id="exampleFormControlTextarea2"
                                   placeholder="Enter job label: e.g.(Engineering Jobs)..." value={label}
                                   onChange={handleLabel}/>
                            <div className="invalid-feedback">
                                Job label is required.
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-5">
                            <label htmlFor="description" className="form-label fw-semibold">Description</label>
                            <input className="form-control rounded-0 " id="exampleFormControlTextarea3"
                                   placeholder="Enter job description..." value={description}
                                   onChange={handleDescription}/>
                            <div className="invalid-feedback">
                                Job description is required.
                            </div>
                        </div>
                        {showInputError &&
                            <p className='text-danger'>Please fill in all inputs</p>
                        }
                        <div className='d-flex justify-content-evenly'>
                            {/*<button className='color-theme fw-semibold' onClick={handleCancel}>Cancel</button>*/}
                            <button type='submit' className='w-auto text-white border-0 bg-theme px-8 py-2 fw-semibold rounded-0'
                                    onClick={handleSubmit}>Submit
                            </button>
                        </div>
                    </div>
                </form>
            }
        </>
    )
}

export default AddButton