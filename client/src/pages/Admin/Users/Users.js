import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers, getCoachesByLogin, getUsersByLogin} from "../../../redux/action_creators/users-action-creator";
import {
    ArrowClockwise,
    PencilSquare,
    PersonFillGear,
    PersonFillSlash,
    PersonSlash,
    PersonSquare
} from "react-bootstrap-icons";
import {Link} from "react-router-dom";

const Users = () => {
    const dispatch = useDispatch()
    const {users} = useSelector(state => state.usersReducer)
    const updateHandler = () => {
        dispatch(getAllUsers())
    }
    const FindByLogin = (value) => {
        if (value === ""){
            updateHandler()
            return
        }
        dispatch(getUsersByLogin(value))
    }
    useEffect(() => {
        dispatch(getAllUsers())
    }, [ ])
    document.title = "Список користувачів"
    return (
        <div>
            <div className={"align-items-center d-flex"}>
                <Link to={'/users/New/'} className={"btn btn-primary my-2 ms-2 py-1"}>Створити користувача</Link>
                <button className={"btn btn-secondary my-2 ms-2 py-1"} onClick={updateHandler}><ArrowClockwise/></button>
                <div className={"input-group input-group-sm w-25"}>
                    <input onChange={e => FindByLogin(e.currentTarget.value)} className={"form-control d-inline w-25 ms-2 form-control-sm py-1"} type="text" placeholder={"Пошук по логіну"}/>
                    <button onClick={e => {e.currentTarget.previousElementSibling.value = "";updateHandler()}} className={"btn btn-outline-secondary"}>X</button>
                </div>
            </div>
            {users !== [] ?
            <table className={"table table-bordered"}>
                <thead>
                    <tr>
                        <th className={""}>Логін</th>
                        <th className={""}>Роль</th>
                        <th className={""}>Тренер</th>
                        <th className={""}>Пошта</th>
                        <th className={""}>Номер телефону</th>
                        <th className={""}>Статус</th>
                        <th className={""}></th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, iterator) => (
                    <tr>
                        <td className={"py-2"}>{user.login}</td>
                        <td className={"py-2"}>{user.role === 2 ? "Адмін" : user.role === 1 ? "Тренер" : "Користувач"}</td>
                        <td className={"py-2"}>{user.coach?.login}</td>
                        <td className={"py-2"}>{user.email}</td>
                        <td className={"py-2"}>{user.phone}</td>
                        <td className={"py-2"}>
                            <Link to={`/users/Edit/${user.id}`} className={'btn btn-secondary px-1 py-0 border-0'}><i><PencilSquare width={17} height={17}/></i></Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            :<></>
            }
        </div>
    );
};

export default Users;