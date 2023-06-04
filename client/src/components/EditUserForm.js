import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {getUserById, getCoachesByLogin, updateUserById} from "../redux/action_creators/users-action-creator";
import DeleteUserModal from "./modals/DeleteUserModal";
import {UserDto} from "../dtos/userDtoForSelect";
import {Typeahead} from "react-bootstrap-typeahead";

const EditUserForm = (props) => {
    const {user} = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [coach, setCoach] = useState(user.coach?.id ?? null);
    const [options, setOptions] = useState([])
    const users = useSelector(state => state.usersReducer.foundedUsers)
    const [role, setRole] = useState(0)

    const showHandler = () => {
        setShow(true)
    }
    const Edit = (data) => {
        let r = dispatch(updateUserById({
            id: user.id,
            login: data.login,
            role: data.role,
            email: data.email,
            phone: data.phone,
            coach: coach !== null ? coach[0].id : null
        })).then(r => {
            if(r === true){
                navigate(-1)
            }
        })

    }
    const {
        register,
        watch,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm()
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
    return (
        <form onSubmit={handleSubmit(Edit)}>
            <div className="mb-3 px-5 mt-2">
                <label htmlFor="username" className="form-label">
                    Логін
                </label>
                <input
                    type="text"
                    className="form-control"
                    {...register('login', {
                        required: true,
                        value: user?.login
                    })}
                />
                <span className={"text-danger mt-1 opacity-100"}>{errors?.login?.message && "Це поле обов'язкове!"}</span>
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
                        value: user?.role
                    })
                    }
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
                <Typeahead id={"typehead"} defaultInputValue={user.coach?.login ?? ""} onInputChange={FindUser} onChange={(selected) => setCoach(selected)} options={options}></Typeahead>
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
                        },
                        value: user?.email
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
                        pattern: /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/g,
                        value: user?.phone
                    })}
                />
                <span className={"text-danger mt-1 opacity-100"}>{errors?.phone?.message}</span>
            </div>
            <div className="px-5 mb-3 padding-bottom text-center text-sm-start">
                <button className={"btn btn-primary me-1 px-4"} type={"submit"}>Редагувати</button>
                <button className={"btn btn-danger me-1 px-4"} type={"button"} onClick={showHandler}>Видалити аккаунт</button>
            </div>
            <DeleteUserModal user={user} show={show} onClose={() => {setShow(false)}}/>
        </form>
    );
};

export default EditUserForm;