import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {createSchedule} from "../../redux/action_creators/schedules-action-creator";

const CreateSchedule = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userId} = useParams()
    const error = useSelector(state => state.schedulesReducer.errors)
    const {
        register,
        watch,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm()
    const Create = (data) => {
        const status = dispatch(createSchedule(data.weekStart, data.weekEnd, userId)).then(r => {
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
                        <form onSubmit={handleSubmit(Create)}>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="weekStart" className="form-label">
                                    Початок неділі
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    {...register('weekStart', {
                                        required: true,
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.weekStart?.message && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="weekEnd" className="form-label">
                                    Кінець неділі
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    {...register('weekEnd', {
                                        required: true,
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.weekEnd?.message && "Це поле обов'язкове!"}</span>
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

export default CreateSchedule;