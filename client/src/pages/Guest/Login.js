import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/action_creators/auth-action-creator"
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const {error} = useSelector(state => state.authReducer)
    const navigate = useNavigate()
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm()
    const Login = (data) => {
        dispatch(login(data.login, data.password)).then(r => {
            if (r === true)
                navigate("/")
        })
    }
    document.title = "Авторизація"
    return (
        <div className={"container-fluid"}>
            <div className="row mt-5">
                <div className="col-md-5 col-lg-4 m-auto">
                    <div className="my-5 border border-1 ">
                        <div className="w-100 border-bottom border-1 pb-2 pt-3">
                            <h5 className="text-center">Авторизація</h5>
                            <p className={"text-center text-danger"}>{error ?? ""}</p>
                        </div>
                        <form onSubmit={handleSubmit(Login)}>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="username" className="form-label">
                                    Логін
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={"Ваш логін"}
                                    {...register('login', {
                                        required: true,
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.username && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="mb-3 px-5">
                                <label htmlFor="password" className="form-label">
                                    Пароль
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder={"Ваш пароль"}
                                    {...register('password',{
                                        required: true
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.password && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="px-5 mb-3 padding-bottom text-center text-sm-start">
                                <button className={"btn btn-primary me-1 px-4"} type={"submit"}>Увійти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;