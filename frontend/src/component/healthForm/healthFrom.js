import { useDispatch, useSelector } from "react-redux";
import Style from "./healthFrom.module.css"
import { useEffect, useRef, useState } from "react";
import axios from "axios";

// Health form component for storing insights from the users
export const HealthFrom = ({setIsHealthForm}) => {

    const [healthInfo, setHealthInfo] = useState({
        sleep : 0,
        steps : 0,
        drink: 0,
        exercise: 0
    });

    const [score, setScore] = useState(0);

    function changeScore(name, value){
        if(name == 'steps' && value > 6000 ) return; 
        if(name == 'exercise' && value > 180 ) return; 
        if(name == 'drink' && value > 10  ) return; 
        if(name == 'sleep' && value > 10  ) return; 

        const obj = { ...healthInfo, [name] : Number( value)}
        setHealthInfo((pre)=> obj)
        setScore( Math.floor( (obj.drink / 10) * 45  + (obj.exercise / 180)*45 + (obj.sleep/10)*45 + (obj.steps / 6000)*45) )

    }
    const needleRef = useRef("")
    // const levelRef = useRef("");
    // const dueDateRef = useRef("");
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // console.log(user._id)
    
    const healthHandler = async(e) => {

        e.preventDefault();

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_URL}/health/add-daily-health`,
              {...healthInfo, id : user._id, score});
      
      
            // dispatch({ type: "USER_LOGIN", payload: data })
            setTimeout(()=> setIsHealthForm(false), 1000);
      
      
          } catch (error) {
            console.log(error)
            
            //  taskRef.current.value = "";
            //  levelRef.current.value = "";
            //  dueDateRef.current.value = "";
      
          }
        
    }

    return (
        <div className={Style.healthFormWrap}>
            <div className={Style.meter}>
                <img src="/meter.png"/>
                <div style={{transform: `rotate( ${score}deg) translateX(-100px)`}} ref={needleRef} className={Style.needle}></div>
                <div className={Style.circle}></div>
                <div className={Style.score}>Score : {score}</div>


            </div>
            <form className={Style.healthForm} onSubmit={healthHandler} >
                <label>Walk Steps (range 0-6000)</label>
                <input
                    placeholder="No of steps"
                    type="number"
                    name="steps"
                    min='0'
                    max='6000'
                    onChange={(e)=> changeScore(e.target.name, e.target.value)}
                    />
                <label>Glass of Water (range 0-10)</label>
                <input
                    placeholder="No of glasses"
                    type="number"
                    name="drink"
                    min='0'
                    max='10'
                    onChange={(e)=> changeScore(e.target.name, e.target.value)}  
                    />
                <label>Exercise in Minutes (range 0-180)</label>
                <input
                    placeholder="No of Minutes"
                    type="number"
                    name="exercise"
                    min='0'
                    max='180'
                onChange={(e)=> changeScore(e.target.name, e.target.value)}  
                />
                <label>sleep in hours (range 0-10)</label>
                <input
                    placeholder="No of Hours"
                    type="number"
                    name="sleep"
                    min='0'
                    max='10'
                    onChange={(e)=> changeScore(e.target.name, e.target.value)}  
                    />
                
                <button className={Style.blueBtn} type="submit">
                    Add Health details
                </button>
            </form>
        </div>
    )
}

