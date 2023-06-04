import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteExercise, getExercises} from "../../redux/action_creators/schedules-action-creator";
import schedulesReducer from "../../redux/reducers/schedules-slice";
import { timeFromInt } from 'time-number';
import {Trash3Fill} from "react-bootstrap-icons";

const ClientScheduleExercises = () => {
    const {scheduleId} = useParams()
    const dispatch = useDispatch()
    const {exercises, errors, isLoading} = useSelector(state => state.schedulesReducer)
    const [sorted, setSorted] = useState([])

    const updateExercises = () => {
        dispatch(getExercises(scheduleId))
    }
    useEffect(() => {
        updateExercises()
    }, [scheduleId])

    useEffect(() => {
        if (exercises.length > 0)
            setSorted([...exercises].sort((a, b) => {
            return a.day === b.day ? 0 : a.day > b.day ? 1 : -1
        }))
    }, [exercises])

    const deleteExerciseHandler = (id) => {
        dispatch(deleteExercise(id)).then(r => {
            if (r === true)
                updateExercises()
        })
    }
    const weeks = [
        "Понеділок",
        "Вівторок",
        "Середа",
        "Четверг",
        "П'ятниця",
    ]
    return (
        <>
            <Link to={`/schedule/exercises/new/${scheduleId}`} className={"btn btn-primary my-2 ms-2 py-1"}>Додати нову вправу</Link>
            <table className={"table table-bordered"}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Час</th>
                        <th>День</th>
                        <th>Підпис</th>
                        <th>Опис</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {exercises.length > 0 && !isLoading ?
                    sorted.map((item, iterator) => (
                        <tr>
                            <td>{iterator+1}</td>
                            <td>{timeFromInt(item.time)}</td>
                            <td>{weeks[item.day]}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => deleteExerciseHandler(item._id)} className={'btn py-0 px-1'}><Trash3Fill/></button>
                            </td>
                        </tr>
                    )) : <td colSpan={4} className={"text-center"}>Вправи не додані</td>
                }
                </tbody>
            </table>
        </>
    );
};

export default ClientScheduleExercises;