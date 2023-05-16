import {auth, provider} from "../firebase-config"
import {signInWithPopup} from "firebase/auth" //this func is used when we want 
//sign in with any kind of popup like Google, GitHub or whatever
import Cookies from "universal-cookie"; //very easy library to get/set/remove cookies

const cookies = new Cookies();

export const Auth = (props) => {

    const signInWithGoogle = async () => {
        try {
        const result = await signInWithPopup(auth, provider);
        console.log(result)
        cookies.set("auth-token", result.user.refreshToken);
        props.setIsAuth(true) //in order to open the chat authomatically (not after refresh the page)
    } catch(err) {
        console.error(err);
    }
    };

    return (
    <div className="auth">
        <p>Sign In With Google To Continue</p>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
    );
}