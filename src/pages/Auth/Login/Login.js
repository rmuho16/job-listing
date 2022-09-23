import {Link} from "react-router-dom";
import './Login.css'
import {useContext, useState} from "react";
import {signIn} from '../../../services/auth'
import {useNavigate} from "react-router-dom"
import {LoadingContext} from "../../../context/LoadingContext/LoadingContext"

const Login = () => {
    const navigate = useNavigate()
    const {loading, setIsLoading, setIsNotLoading} = useContext(LoadingContext)

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
        setIsLoading()
        signIn(state.email, state.password)
            .then((user) => {
                if (user) {
                    setIsNotLoading()
                    navigate("/")
                } else if(!state.email || !state.password){
                    setIsNotLoading()
                    setState({
                        email: state.email,
                        password: '',
                        error: "Please fill in all input fields",
                    })
                }
                else {
                    setIsNotLoading()
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
            <form onSubmit={handleSubmit}>
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

                {loading ?
                    <button className="w-100 bg-theme text-white px-5 border-0 rounded-0 py-3 my-2 fw-semibold"
                            type="submit" disabled={true}>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                    </button>
                    :
                    <button className="w-100 bg-theme text-white px-5 border-0 rounded-0 py-3 my-2 fw-semibold"
                            type="submit" >Sign in
                    </button>
                }
                <small className='fw-semibold text-muted mt-3'>New here?
                    <Link to='/register'> Register now</Link>
                </small>
            </form>
        </main>
    )
}

export default Login