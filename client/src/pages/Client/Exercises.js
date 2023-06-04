import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {timeFromInt} from "time-number";
import {getExercises} from "../../redux/action_creators/schedules-action-creator";
import {Trash3Fill} from "react-bootstrap-icons";

const Exercises = () => {
    const {scheduleId} = useParams()
    const dispatch = useDispatch()
    const {exercises, isLoading, errors} = useSelector(state => state.schedulesReducer)
    const [sorted, setSorted] = useState([])

    const getExercisesDay = () => {
        dispatch(getExercises(scheduleId))
    }
    const weeks = [
        "Понеділок",
        "Вівторок",
        "Середа",
        "Четверг",
        "П'ятниця",
    ]
    useEffect(() => {
        if (exercises.length > 0)
            setSorted([...exercises].sort((a, b) => {
                return a.day === b.day ? 0 : a.day > b.day ? 1 : -1
            }))
    }, [exercises])
    useEffect(() => {
        getExercisesDay()
    }, [])
    return (
        <table className={"table table-bordered"}>
        <thead>
        <tr>
            <th>№</th>
            <th>Час</th>
            <th>День</th>
            <th>Підпис</th>
            <th>Опис</th>
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
                </tr>
            )) : <td colSpan={4} className={"text-center"}>Вправи не додані</td>
        }
        </tbody>
    </table>
    );
};

export default Exercises;