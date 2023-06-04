import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSchedule} from "../../redux/action_creators/schedules-action-creator";
import {Link} from "react-router-dom";

const Schedule = () => {
    const {schedules, isLoading, errors} = useSelector(state => state.schedulesReducer)
    const [reservedSchedules, setReservedSchedules] = useState([])
    const dispatch = useDispatch()

    const updateSchedule = () => {
        dispatch(getSchedule())
    }
    useEffect(() => {
        dispatch(getSchedule())
    }, [ ])
    useEffect(() => {
        if (schedules.length > 0){
            setReservedSchedules([...schedules].reverse())
        }
    }, [schedules])
    document.title = "Розклад вправ"
    return (
        <div className={"mt-2"}>
            <h3 className={"text-center display-6 mb-4"}>Ваш розклад</h3>
            <div>
                <table className={"table table-bordered"}>
                    <thead>
                    <tr>
                        <th>Початок неділі</th>
                        <th>Кінець неділі</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedules?.length > 0 && !isLoading ?
                        <>
                            {reservedSchedules.map(item => (
                                <tr>
                                    <td>{new Date(item.weekStart).toLocaleString('uk', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                    <td>{new Date(item.weekEnd).toLocaleString('uk', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                    <td>
                                        <Link to={`/schedule/exercises/${item._id}`} className={"btn btn-primary py-0 px-1"}>Переглянути вправи</Link>
                                    </td>
                                </tr>
                            ))}
                        </> : <td colSpan={3} className={"text-center"}>У користувача немає розкладів</td>
                    }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Schedule;