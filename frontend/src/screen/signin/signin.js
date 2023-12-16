import { useReducer, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "./signin.module.css"
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { LOG_IN_USER } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";



const Signin = () => {

   const usernameRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true, user: {}, message: {} };
      case "FETCH_SUCCESS":
        return { ...state, user: action.payload, loading: false, message: action.message };
      case "FETCH_FAIL":
        return { ...state, loading: false, message: action.message };
      default:
        return state;
    }
  };

  const [{ loading, message, user }, dispatchLoc] = useReducer(reducer, {
    message: {},
    user: {},
    loading: false,
    
  });
  const dispatch = useDispatch();
//   const dispatch = useDispatch()
  const loginSubmit = async (values) => {

    values.preventDefault();
    dispatchLoc({ type: "FETCH_REQUEST" });
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_URL}/user/signin`,
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        });

      dispatchLoc({ type: "FETCH_SUCCESS", payload: data.user, message: data });

      dispatch({ type:  LOG_IN_USER , payload: data.user })
      setTimeout(()=> navigate('/'), 1000);



    } catch (error) {
      console.log(error)
      dispatchLoc({ type: "FETCH_FAIL", message: error.response.data });
      usernameRef.current.value = "";
      passwordRef.current.value = "";

    }
  }
  return (
    <div className={Style.loginWrap}>
      <div className={Style.login1}>
        <div className={Style.logo}>
          <span>Stay Healthy</span>
        </div>
        <p>
          Health helps you stay healthy and fit, so you live longer
        </p>
      </div>

      <div className={Style.login2}>
        <div className= {Style.login2Wrap}>
          <div className= {Style.loginForm}>
        
                <form onSubmit={loginSubmit}>
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
                  <button className={Style.blueBtn} type="submit">
                  {
              loading ?  <BeatLoader color="#0055f1" />: "Log In"
            }
                  </button>
                </form>
    
          </div>

          
   
          <button onClick={()=> navigate('/signup')} className={Style.openSignup}>Create Account</button>
          
          {message && 
            <p style={{color : message.status ? "green" : "red"}}>{message.message}</p>  
        }
        </div>
          <b>Log in </b> for living life like a pro.
      </div>
    </div>
  )
    

}
export default Signin;