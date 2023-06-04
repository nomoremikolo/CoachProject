import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteUserById} from "../../redux/action_creators/users-action-creator";
import {useNavigate} from "react-router-dom";

const DeleteUserModal = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    if(!props.show)
        return null

    const deleteHandler = () => {
        dispatch(deleteUserById(props.user.id))
        navigate(-1)
        props.onClose()
    }
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ви впевненні що хочете видалити користувача {props?.user?.login}?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Відмінити
                </Button>
                <Button variant="danger" onClick={deleteHandler}>
                    Видалити
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteUserModal;