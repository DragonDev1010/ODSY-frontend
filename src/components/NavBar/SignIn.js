import { Link } from "react-router-dom";

function SignIn() {
    return (
        <div className="signIn">
            <button className='normal'><a to="/">Create</a></button>
            <button className='normal'><a to="/wallet-connect">Sign In</a></button>
        </div>
    )
}

export default SignIn