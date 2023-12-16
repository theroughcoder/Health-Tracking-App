import { useEffect, useState } from "react";
import { DailyScoreItem } from "./dailyScoreItem"
import Style from "./healthReport.module.css"
import { useSelector } from "react-redux";
import axios from "axios";

// Health report component for displaying average daily score and every day health score 
export const HealthReport = () => {

    const [avgScore, setAvgScore] = useState(0);
    const [score, setScore] = useState(0);
    const [steps, setSteps] = useState(0);
    const [water, setWater] = useState(0);
    const [sleep, setSleep] = useState(0);
    const [exercise, setExercise] = useState(0);
    const user = useSelector((state) => state.user)
    const [healthArr, setHealtArr] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const { data } = await axios.get(`${process.env.REACT_APP_URL}/health/health-report/${user._id}`,);
                console.log(data.health)
                setHealtArr(data.health);
                const avgSre = data.health.reduce((sum, value) => ({ score: sum.score + value.score }));
                // console.log(data.health.length)
                if (avgSre != undefined) setAvgScore(Math.floor(avgSre.score / data.health.length));

            } catch (error) {
                console.log(error)



            }
        }

        fetchData();

    }, [])


    return (
        <div className={Style.healthReportWrap}>
            <div className={Style.meter}>
                <img src="/meter.png" />
                <div style={{ transform: `rotate( ${avgScore}deg) translateX(-100px)` }} className={Style.needle}></div>
                <div className={Style.circle}></div>
            </div>
            <div className={Style.avgScore}>Average Daily Score : {avgScore}</div>
            <br/>
            <br/>
            <hr></hr>
            <br/>
            <h1 className={Style.head}>Daily Scores</h1>
            <div className={Style.dailyScoresWrap}>
                <div>

                <div className={Style.meter}>
                    <img src="/meter.png" />
                    <div style={{ transform: `rotate( ${score}deg) translateX(-100px)` }} className={Style.needle}></div>
                    <div className={Style.circle}></div>
                </div>
                {/* <div className={Style.avgScore}>Score : {score}</div> */}
                <div className={Style.healthScores}>
                    <div> Walk Steps : {steps} </div>
                    <div> Water Glass : {water} </div>
                    <div> Exercise mins  : {exercise} </div>
                    <div> Sleep hours  : {sleep} </div>
                    </div>
                </div>
                <div className={Style.dailyScores}>
                    {
                        healthArr.map((e, i)=>{
                           return <div key={i} onClick={()=> {setScore(e.score)
                            setSteps(e.steps)
                            setExercise(e.exercise)
                            setWater(e.drink)
                            setSleep(e.sleep)
                            }}>  
                               <DailyScoreItem day={i+1} score={e.score}/>
                            </div>
                        })
                    }

                </div>
            </div>
           

        </div>
    )
}

