import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register";
import Profile from './pages/Profile'
import JobDetails from './pages/JobDetails'
import NotFound from "./pages/NotFound";
import JobModal from "./components/JobModal";
import {isJobSeeker, isLoggedIn, userEmail} from "./services/auth";
import {getAllJobListings, getApplications, getFavorites} from "./firebase";
import {useDispatch} from "react-redux";
import {setApplications, setFavorites, setJobs} from "./redux/jobsSlice";

const ProtectedRoute = ({children }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

function App() {
    const dispatch = useDispatch()

    getAllJobListings().then((res) => {
        dispatch(setJobs(res))
    })

    if(isJobSeeker()) {
        getApplications(userEmail()).then((res) => {
            dispatch(setApplications(res))
        })
    } else {
        dispatch(setApplications([]))
    }

    if(isLoggedIn()) {
        getFavorites(userEmail()).then((res) => {
            dispatch(setFavorites(res))
        })
    }

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Main/>}/>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/register' element={<Register/>}/>
                <Route exact path='/job-details/:id' element={<JobDetails i={1}/>}/>
                <Route exact path='/profile' element={
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                }/>
                <Route exact path='/modal' element={<JobModal/>}/>
                <Route path='/*' element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
