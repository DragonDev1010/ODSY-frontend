import { FacebookLogin } from "react-facebook-login"
import GoogleLogin from "react-google-login"

function Signup() {
    const responseFacebook = (response) => {
        console.log(response);
    }

    const responseGoogle = (response) => {
        console.log(response);
    }

    return(
        <>
            <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>

            <FacebookLogin
                appId="" //APP ID NOT CREATED YET
                fields="name,email,picture"
                callback={responseFacebook}
            />
            <br />
            <br />


            <GoogleLogin
                clientId="" //CLIENTID NOT CREATED YET
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        </>
    )
}

export default Signup