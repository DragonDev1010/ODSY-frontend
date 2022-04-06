import { Link } from "react-router-dom";

function SignIn() {
    return (
        <div className="signIn">
            <Link to="/create"><button className='normal'>Create</button></Link>
            <button className='normal'><a to="/wallet-connect">Sign In</a></button>
        </div>
    )
}

export default SignIn