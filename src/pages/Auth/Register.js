import {Link} from "react-router-dom";
import './Login/Login.css'
import {useState} from 'react'
import {register} from "../../services/auth";
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        password: '',
        error: '',
        type: 'jobSeeker',
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (state.password.length < 6) {
            setState({
                email: state.email,
                password: state.password,
                error: "Password should be at least 6 chars long.",
                type: '',
            })
        } else {
            register(state.email, state.password, state.type)
                .then((result) => {
                    if (result) {
                        navigate("/")
                    } else {
                        setState({
                            email: state.email,
                            password: '',
                            error: "User already exists",
                        })
                    }
                })
        }
    }

    function onTypeSelect(event) {
        state.type = event.target.value
        console.log(event.target.value)
    }

    return (

        <main className="form-signin w-100 m-auto mt-5">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 fw-normal fw-bold text-center">Sign up for
                    <span className='color-theme'> CareerPool</span></h1>
                <div className="form-floating">
                    <input
                        type="email"
                        name='email'
                        value={state.email}
                        onChange={handleChange}
                        className="rounded-0 form-control mb-4 mt-4" id="floatingInput"
                        placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        name='password'
                        value={state.password}
                        onChange={handleChange}
                        className="rounded-0 form-control mb-4" id="floatingPassword"
                        placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div onChange={onTypeSelect}>
                    <input type="radio" value="jobSeeker" name="type" className="mb-3" defaultChecked={true}/> Job Seeker
                    <br/>
                    <input type="radio" value="recruiter" name="type" /> Recruiter
                </div>

                {state.error && <p className="text-danger">{state.error}</p>}

                <button className="w-100 bg-theme text-white mt-4 px-5 border-0 py-3 my-2 fw-semibold rounded-0"
                        type="submit">Sign up
                </button>
                <small className='fw-semibold text-muted mt-3 '>Already a user?
                    <Link to='/login'> Log in</Link>
                </small>
            </form>
        </main>
    )
}

export default Login