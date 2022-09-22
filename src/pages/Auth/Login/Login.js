import {Link} from "react-router-dom";
import './Login.css'
import {useState} from "react";
import {signIn} from '../../../services/auth'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        password: '',
        error: ''
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        signIn(state.email, state.password)
            .then((user) => {
                if (user) {
                    navigate("/")
                } else {
                    setState({
                        email: state.email,
                        password: '',
                        error: "Incorrect email/password",
                    })
                }
            })
    }

    return (

        <main className="form-signin w-100 m-auto mt-5">
            <form onSubmit={handleSubmit} className=''>
                <h1 className="h3 my-5 fw-normal fw-bold text-center">Sign in to
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

                {state.error && <p className="text-danger">{state.error}</p>}

                <button className="w-100 bg-theme text-white px-8 rounded-0 py-3 my-2 fw-semibold" type="submit">Sign in
                </button>
                <small className='fw-semibold text-muted mt-3'>New here?
                    <Link to='/register'> Register now</Link>
                </small>
            </form>
        </main>
    )
}

export default Login