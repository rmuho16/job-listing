import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="jumbotron ">
            <div className="container text-center mt-5">
                <h1 className="display-1">404, Not Found!</h1>
                <p>Sorry, the page you are looking for doesn't exist</p>
                <p>
                    <Link to='/' className="text-decoration-none">Go back Home</Link></p>
            </div>
        </div>
    )
}

export default NotFound