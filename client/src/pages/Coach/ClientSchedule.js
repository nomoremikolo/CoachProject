import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteSchedule, getUserSchedules} from "../../redux/action_creators/schedules-action-creator";
import {Trash3Fill} from "react-bootstrap-icons";

const ClientSchedule = () => {
    const {userId} = useParams()
    const dispatch = useDispatch()
    const {schedules, isLoading, errors} = useSelector(state => state.schedulesReducer)
    const [reservedSchedules, setReservedSchedules] = useState([])
    const updateSchedule = () => {
        dispatch(getUserSchedules(userId))
    }
    useEffect(() => {
        updateSchedule()
    }, [userId])

    const deleteScheduleHandler = (id) => {
        dispatch(deleteSchedule(id)).then(r => {
            if (r === true)
                updateSchedule()
        })
    }
    useEffect(() => {
        if (schedules.length > 0){
            setReservedSchedules([...schedules].reverse())
        }
    }, [schedules])
    return (
        <>
            <Link to={`/schedule/new/${userId}`} className={"btn btn-primary my-2 ms-2 py-1"}>Додати новий розклад</Link>
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
                                    <button onClick={() => deleteScheduleHandler(item._id)} className={"btn btn-danger py-0 px-1 align-items-center ms-2"}>Видалити</button>
                                </td>
                            </tr>
                        ))}
                    </> : <td colSpan={3} className={"text-center"}>У користувача немає розкладів</td>
                }
                </tbody>
            </table>
        </>

    );
};

export default ClientSchedule;