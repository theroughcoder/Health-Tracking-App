import { useEffect, useRef, useState } from "react"
import Style from "./healthReport.module.css"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const DailyScoreItem = ({ day, score }) => {

    const [isTodoForm, setIsTodoForm] = useState(false);

    const taskRef = useRef("")
    const levelRef = useRef("");
    const dueDateRef = useRef("");
    const user  = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // const editTaskHandler = async (e) => {

    //     e.preventDefault();

    //     try {
    //         setTasks((pre) => pre.map((i) => {
    //             if (i._id == id) {
    //                 return {
    //                     username: user.username,
    //                     task: taskRef.current.value,
    //                     level: levelRef.current.value,
    //                     due_date: dueDateRef.current.value,
    //                 }
    //             }
    //             return i

    //         }))
    //         setIsTodoForm(false);
    //         const { data } = await axios.put(`${process.env.REACT_APP_URL}/task/${id}`,
    //             {
    //                 username: user.username,
    //                 task: taskRef.current.value,
    //                 level: levelRef.current.value,
    //                 due_date: dueDateRef.current.value,
    //             });


    //         // dispatch({ type: "USER_LOGIN", payload: data })
    //         setTimeout(() => setIsTodoForm(false), 1000);


    //         taskRef.current.value = "";
    //         levelRef.current.value = "";
    //         dueDateRef.current.value = "";

    //     } catch (error) {
    //         console.log(error)


    //     }


    // }

    // async function deleteHandler() {

    //     setTasks((pre) => pre.filter((i) => i._id != id))
    //     try {
    //         const { data } = await axios.delete(`${process.env.REACT_APP_URL}/task/${id}`,
    //         );


    //     } catch (error) {
    //         console.log(error)


    //     }

    // }

    return (
        <div className={Style.dailyScoreItem}>
            <div style={{width: '90px'}}>Day: {day}</div>
            <div style={{width: '200px'}}> Health Score: {score}</div>
            <div style={{background: score < 30 ? 'rgb(23, 147, 44)' :
             score < 60 ? 'rgb(127, 177, 46)':
             score < 90 ? 'rgb(230, 171, 20)'  :
             score < 120 ? 'rgb(229, 104, 21)': 
             score < 150 ? 'rgb(240, 67, 36)' :
             'rgb(130, 0, 0)'
             
            }} className={Style.level}></div>
        </div>
    )
}
