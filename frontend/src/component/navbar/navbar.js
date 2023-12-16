import {Link, Outlet, useNavigate} from "react-router-dom"
import Style from "./navbar.module.css"
import { useDispatch } from "react-redux"
import { LOG_OUT_USER } from "../../redux/actions/userAction";

export  const Navbar = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch();

    return(
        <>
         {/* this is the header of the website  */}
            <header>
                {/* <!-- this is the logo  --> */}
                <div className={Style.logo}><img src="/Health.png"/></div>
                {/* <!-- right section in header for holding header links */}
                
                    <h3 className={Style.logout} onClick={()=> {
                        dispatch({type : LOG_OUT_USER}) 
                        navigate('/signin')
                    }
                    
                        }>Log out</h3>
            </header>
                <Outlet />
        </>
    )
}

