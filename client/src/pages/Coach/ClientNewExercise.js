import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {createExercise, createSchedule} from "../../redux/action_creators/schedules-action-creator";
import TimePicker from 'react-bootstrap-time-picker';

const ClientNewExercise = () => {
    const {scheduleId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const error = useSelector(state => state.schedulesReducer.errors)
    const [time, setTime] = useState(28800)
    const {
        register,
        watch,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm()
    const Add = (data) => {
        const status = dispatch(createExercise(scheduleId, time, data.day, data.title, data.description)).then(r => {
            if (r === true)
                navigate(-1)
        })
    }
    document.title = "Додавання розкладу"
    return (
        <div className={"container-fluid"}>
            <div className="row mt-2">
                <div className="col-md-5 col-lg-4 m-auto">
                    <div className="my-5 border border-1 ">
                        <div className="w-100 border-bottom border-1 pb-2 pt-3">
                            <h5 className="text-center">Додавання розкладу</h5>
                            <p className={"text-center text-danger"}>{error ?? ""}</p>
                        </div>
                        <form onSubmit={handleSubmit(Add)}>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="title" className="form-label">
                                    Підпис
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('title', {
                                        required: true,
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.title?.message && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="description" className="form-label">
                                    Опис
                                </label>
                                <textarea
                                    className="form-control form-floating"
                                    {...register('description', {
                                        required: false,
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.description?.message && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="time" className="form-label">
                                    Час
                                </label>
                                <TimePicker onChange={setTime} value={time} start="8:00" end="20:00" step={10} />
                            </div>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="time" className="form-label">
                                    День
                                </label>
                                <select
                                    {...register('day', {
                                        required: true
                                    })}
                                    className={"form-select"}>
                                    <option value="0">Понеділок</option>
                                    <option value="1">Вівторок</option>
                                    <option value="2">Середа</option>
                                    <option value="3">Четверг</option>
                                    <option value="4">П'ятниця</option>
                                </select>
                            </div>
                            <div className="px-5 mb-3 padding-bottom text-center text-sm-start">
                                <button className={"btn btn-primary me-1 px-4"} type={"submit"}>Створити</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientNewExercise;