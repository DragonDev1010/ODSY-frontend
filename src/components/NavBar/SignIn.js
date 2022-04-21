import { Link } from "react-router-dom";

function SignIn() {
    return (
        <div className="signIn">
            <Link to="/create"><button className='normal'>Create</button></Link>
            <Link to="/signin"><button className='normal'>Sign In</button></Link>
        </div>
    )
}

export default SignIn