import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {createUser, getUserById, updateUserById} from "../../../redux/action_creators/users-action-creator";
import EditUserForm from "../../../components/EditUserForm";

const EditUser = () => {
    const {id} = useParams()
    const error = useSelector(state => state.usersReducer.errors)
    const {user, isLoading} = useSelector(state => state.usersReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserById(id))
    }, [ ])
    document.title = "Редагування облікового запису"
    return (
        <div className={"container-fluid"}>
                <div className="row mt-2">
                    <div className="col-md-5 col-lg-4 m-auto">
                        <div className="my-5 border border-1 ">
                            <div className="w-100 border-bottom border-1 pb-2 pt-3">
                                <h5 className="text-center">Редагування облікового запису користувача {user?.login}</h5>
                                <p className={"text-center text-danger"}>{error ?? ""}</p>
                            </div>
                            {user !== null && !isLoading ? <EditUserForm user={user}/> : <></> }
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default EditUser;