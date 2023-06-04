import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {login} from "../../../redux/action_creators/auth-action-creator";
import {createUser, getCoachesByLogin} from "../../../redux/action_creators/users-action-creator";
import {useNavigate} from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import {UserDto} from "../../../dtos/userDtoForSelect"
const CreateUserForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const error = useSelector(state => state.usersReducer.errors)
    const [coach, setCoach] = useState(null);
    const [options, setOptions] = useState([])
    const users = useSelector(state => state.usersReducer.foundedUsers)
    const [role, setRole] = useState(0)
    const {
        register,
        watch,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm()
    const Create = (data) => {
        if (!coach){
            console.log(coach)
            setCoach(null)
        }
        const status = dispatch(createUser(data.login, data.password, data.role, data.email, data.phone, coach !== null ? coach?.length > 0 ? coach[0]?.id : null : null)).then(r => {
            if (r === true)
                navigate(-1)
        })
    }

    const FindUser = (data) => {
        dispatch(getCoachesByLogin(data))
    }
    useEffect(() => {
        let array = []
        users.forEach((item) => {
            array.push(new UserDto(item))
        })
        setOptions(array)
    }, [users])
    document.title = "Створення облікового запису"
    return (
        <div className={"container-fluid"}>
            <div className="row mt-2">
                <div className="col-md-5 col-lg-4 m-auto">
                    <div className="my-5 border border-1 ">
                        <div className="w-100 border-bottom border-1 pb-2 pt-3">
                            <h5 className="text-center">Створення облікового запису</h5>
                            <p className={"text-center text-danger"}>{error ?? ""}</p>
                        </div>
                        <form onSubmit={handleSubmit(Create)}>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="username" className="form-label">
                                    Логін
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('login', {
                                        required: true,
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.login?.message && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="mb-3 px-5">
                                <label htmlFor="password" className="form-label">
                                    Пароль
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    {...register('password',{
                                        required: {
                                          value: true,
                                          message: "Це поле обов'язвоке"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Пароль має містити принаймі 8 символів"
                                        }
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.password?.message}</span>
                            </div>
                            <div className="mb-3 px-5">
                                <label htmlFor="password" className="form-label">
                                    Підтвердження паролю
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    {...register('password2',{
                                        required: {
                                            value: true,
                                            message: "Це поле обов'язвоке"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Пароль має містити принаймі 8 символів"
                                        },
                                        validate: (val) => {
                                            if (watch('password') != val) {
                                                return "Паролі не сходяться";
                                            }
                                        },
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.password2?.message}</span>
                            </div>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="role" className="form-label">
                                    Роль
                                </label>
                                <select
                                    {...register('role', {
                                        required: {
                                            value: true,
                                            message: "Це поле обов'язвоке"
                                        },
                                    })}
                                    onChange={(e) => setRole(Number(e.currentTarget.value))}
                                    className={"form-select"}>
                                    <option value="0">Користувач</option>
                                    <option value="1">Тренер</option>
                                    <option value="2">Адмін</option>
                                </select>
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.role?.message}</span>
                            </div>
                            <div className={`px-5 ${role === 0 ? "d-block" : "d-none"}`}>
                                <label htmlFor="username" className="form-label">
                                    Оберіть тренера
                                </label>
                                <Typeahead id={"typehead"} onInputChange={FindUser} onChange={(selected) => setCoach(selected)} options={options}></Typeahead>
                            </div>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="username" className="form-label">
                                    Пошта
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: "Це поле обов'язвоке"
                                        },
                                        pattern: {
                                            value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
                                            message: "Будь-ласка введіть коректну адресу"
                                        }
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.email?.message}</span>
                            </div>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="username" className="form-label">
                                    Номер телефону
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('phone', {
                                        required: {
                                            value: true,
                                            message: "Це поле обов'язвоке"
                                        },
                                        pattern: {
                                            value: /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/g,
                                            message: "Ви ввели не коректний номер телефону"
                                        }
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.phone?.message}</span>
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

export default CreateUserForm;