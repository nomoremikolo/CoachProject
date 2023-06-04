import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {changeData, login} from "../../../redux/action_creators/auth-action-creator";
import {useNavigate} from "react-router-dom";

const ProfileLoginDataEditForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {user, error} = useSelector(state => state.authReducer)
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm()
    const Edit = (data) => {
        dispatch(changeData({
            "login": data.login,
            "oldPassword": data.oldPassword,
            "password": data.password,
            "password2": data.password2
        })).then(r => {
            if (r.isOk){
                navigate(-1)
            }
        })
    }
    document.title = "Редагування данних"
    return (
        <div className={"container-fluid"}>
            <div className="row mt-5">
                <div className="col-md-5 col-lg-4 m-auto">
                    <div className="my-5 border border-1 ">
                        <div className="w-100 border-bottom border-1 pb-2 pt-3">
                            <h5 className="text-center">Редагування данних</h5>
                            <p className={"text-danger text-center"}>{error ?? ""}</p>
                        </div>
                        <form onSubmit={handleSubmit(Edit)}>
                            <div className="mb-3 px-5 mt-2">
                                <label htmlFor="username" className="form-label">
                                    Логін
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={"Your login"}
                                    disabled={true}
                                    value={user.login}
                                    {...register('login', {
                                        required: false,
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.username && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="mb-3 px-5">
                                <label htmlFor="password" className="form-label">
                                    Поточний пароль
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder={"Ваш поточний пароль"}
                                    {...register('oldPassword',{
                                        required: true
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.oldPassword && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="mb-3 px-5">
                                <label htmlFor="password" className="form-label">
                                    Новий пароль
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder={"Ваш новий пароль"}
                                    {...register('password',{
                                        required: true
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.password && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="mb-3 px-5">
                                <label htmlFor="password" className="form-label">
                                    Підтвердження нового пароля
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder={"Підтвердження нового пароля"}
                                    {...register('password2',{
                                        required: true
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.password2 && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="px-5 mb-3 padding-bottom text-center text-sm-start">
                                <button className={"btn btn-danger me-2 px-3"} type={"submit"}>Змінити данні</button>
                                <button className={"btn btn-primary px-3"} type={"button"} onClick={() => navigate(-1)}>Відхилити</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLoginDataEditForm;