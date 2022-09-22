import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {addJob} from "../redux/jobsSlice"

const AddButton = () => {
    const dispatch = useDispatch()
    const [state, setState] = React.useState({
        company: "",
        title: "",
        description: "",
        label: "",
        location: "",
    })
    const [showInputs, setShowInputs] = useState(false)
    const [showInputError, setShowInputError] = useState(false)
    const bookmarked = false
    const applied = false


    const handleShow = (e) => {
        e.preventDefault()
        setShowInputs(currInputs => !currInputs)
    }

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
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
            bookmarked,
            applied
        }

        if (title && company && description
            && label
            && location) {
            dispatch(addJob(newJob))

            setState({
                company: "",
                title: "",
                description: "",
                label: "",
                location: "",
            })

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
                    {showInputError &&
                    <p className='text-danger text-center'>Please fill in all inputs</p>}
                    <div className='d-flex justify-content-evenly'>
                        <button type='submit' className='w-auto text-white bg-theme px-5 border-0 py-2 fw-semibold rounded-0'
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