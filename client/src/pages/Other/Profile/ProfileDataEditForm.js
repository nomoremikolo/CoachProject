import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {changeData} from "../../../redux/action_creators/auth-action-creator";

const ProfileDataEditForm = () => {
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
            "email": data.email,
            "phone": data.phone,
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
                                <label htmlFor="email" className="form-label">
                                    Пошта
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder={"Ваша пошта"}
                                    disabled={false}
                                    defaultValue={user.email}
                                    {...register('email', {
                                        required: true,
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.email && "Це поле обов'язкове!"}</span>
                            </div>
                            <div className="mb-3 px-5">
                                <label htmlFor="phone" className="form-label">
                                    Номер телефону
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={"Ваш номер телефону"}
                                    defaultValue={user.phone}
                                    {...register('phone',{
                                        required: true
                                    })}
                                />
                                <span className={"text-danger mt-1 opacity-100"}>{errors?.phone && "Це поле обов'язкове!"}</span>
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

export default ProfileDataEditForm;