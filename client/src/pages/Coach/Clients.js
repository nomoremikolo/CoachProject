import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getClients} from "../../redux/action_creators/clients-action-creator";
import {Link} from "react-router-dom";

const Clients = () => {
    const dispatch = useDispatch()
    const {clients, isLoading, errors} = useSelector(state => state.clientsReducer)
    useEffect(() => {
        dispatch(getClients())
    }, [])
    return (
        <table className={"table table-bordered"}>
            <thead>
                <tr>
                    <th>Логін</th>
                    <th>Номер телефону</th>
                    <th>Пошта</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {clients.length > 0 && !isLoading ?
            <>
                {clients.map(item => (
                    <tr>
                        <td className={"py-2"}><div className={"d-flex align-items-center py-1"}>{item.login}</div></td>
                        <td className={"py-2"}><div className={"d-flex align-items-center py-1"}>{item.phone}</div></td>
                        <td className={"py-2"}><div className={"d-flex align-items-center py-1"}>{item.email}</div></td>
                        <td className={"py-2"}>
                            <div className={"d-flex align-items-center py-1"}>
                                <Link to={`/client/schedules/${item.id}`} className={"btn btn-primary py-0 px-1"}>Розклад</Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </> : <td colSpan={3} className={"text-center"}>У вас ще немає клієнтів</td>
            }
            </tbody>
        </table>
    );
};

export default Clients;