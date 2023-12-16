import { useEffect, useState } from "react";
import { HealthFrom } from "../../component/healthForm/healthFrom";
import Style from "./home.module.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import  {HealthReport}  from "../../component/healthReport/healthReport";

const Home = () => {
    const [isHealthForm, setIsHealthForm] = useState(true);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()

    useEffect(()=>{
        if(user == undefined){
            navigate('/signin');
        }

    }, [])
    
    return(
        <div className={Style.healthWrap}>
            <div className={Style.healthHeader }>
                {isHealthForm ? <h1>Health Form</h1> : <h1>Health Report</h1>}
                <button className={Style.healthWrapBtn +" "+ Style.blueBtn} onClick={()=>  setIsHealthForm((pre)=>!pre)}>
                    {isHealthForm ?  "Health List" : "Health From"}
                </button>
            </div>
            {
                isHealthForm ?
                 <HealthFrom setIsHealthForm={setIsHealthForm}/> :
                 <HealthReport />

            }
        </div>
    )
}

export default Home;