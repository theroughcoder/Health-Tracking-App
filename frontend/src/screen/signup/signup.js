import Style from './signup.module.css'
import {useRef, useState} from "react"
import axios from "axios";
import {BeatLoader} from "react-spinners"
import { useNavigate } from "react-router-dom";

const Signup = () => {
const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({});
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const confirmRef = useRef("");

  const usercreateHandler = async(e) => {

    e.preventDefault();

    // console.log(usernameRef.current.value)
    const postData = {
      username: usernameRef.current.value ,
      password: passwordRef.current.value ,
      confirm_password : confirmRef.current.value ,

    }
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/user/signup`, postData);
      setStatus(response.data)
      setTimeout(()=> navigate('/'), 1000);
      console.log('Post successful! Server responded with:', response.data);
    } catch (error) {
      console.error('Oops, something went wrong:', error);
      setStatus(error.response.data);
    }
    setLoading(false);
  }

    return(
        <div>
            <div className= {Style.signupForm}>
        
        <div className={Style.signupWrap}>
            <h1 style={{marginTop : '-5px'}}>Registration</h1>

        <form onSubmit={usercreateHandler}>
       
          <input
            placeholder="Username"
            type="text"
            name="username"
            ref={usernameRef}
            />
         
          <input
            placeholder="Password"
            type="password"
            name="password"
            ref={passwordRef}
            />
           
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirm password"
            ref={confirmRef} 
            />
          <button className={Style.blueBtn} type="submit">
            {
              loading ?  <BeatLoader color="#0055f1" />: "Create Account"
            }
          
          </button>
        </form>
            </div>

            {status  && 
            <p style={{textAlign: 'center', color : status.status == "success" ?  "green" : "red"}}>{status.message}</p>
            }

  </div>
        </div>
        
    )
}
export default Signup;