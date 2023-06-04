import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import {PencilSquare, PersonCircle, Shield} from "react-bootstrap-icons";
import {Link} from "react-router-dom";

const Profile = () => {
    const {user, isAuth} = useSelector(state => state.authReducer)
    const [currentTab, setCurrentTab] = useState(0)
    document.title = "Особистий кабінет"

    return (
        <Container>
            <div className="row mt-5">
                <div className="col-md-5 col-lg-5 m-auto">
                    <div className={"my-5 border border-1 pb-3"}>
                        <div className={"w-100 border-bottom border-1 pb-2 pt-3"}>
                            <h5 className="text-center">Особистий кабінет</h5>
                        </div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className={`hoverpointer nav-link ${currentTab === 0 ? "active" : ""}`} onClick={() => {setCurrentTab(0)}}><Shield className={"mb-1"}/> Данні для входу</a>
                            </li>
                            <li className="nav-item">
                                <a className={`hoverpointer nav-link ${currentTab === 1 ? "active" : ""}`} onClick={() => {setCurrentTab(1)}}><PersonCircle className={"mb-1"}/> Особисті данні</a>
                            </li>
                        </ul>
                        {currentTab === 0 ?
                            <div>

                                <div className={"mb-3 px-5 mt-2"}>
                                    <label htmlFor="username" className="form-label mt-3">
                                        Логін
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        disabled={true}
                                        value={user.login}
                                    />
                                </div>
                                <div className={"mb-3 px-5 mt-2 mb-4"}>
                                    <label htmlFor="password" className="form-label">
                                        Пароль
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        disabled={true}
                                        value={"********"}
                                    />
                                </div>
                                <Link className={"d-block text-center"} to={'/profile/edit/loginData'}>Редагувати</Link>
                            </div> : <></>
                        }
                        {currentTab === 1 ?
                            <div className={""}>
                                <div className={"mb-3 px-5 mt-2"}>
                                    <label htmlFor="email" className="form-label mt-3">
                                        Пошта
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        disabled={true}
                                        value={user.email}
                                    />
                                </div>
                                <div className={"px-5 mt-2 mb-4"}>
                                    <label htmlFor="phone" className="form-label">
                                        Номер телефону
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        disabled={true}
                                        value={user.phone}
                                    />
                                </div>
                                <Link className={"d-block text-center"} to={'/profile/edit/profileData'}>Редагувати</Link>
                            </div> : <></>
                        }
                    </div>
                </div>
            </div>

        </Container>
    );
};

export default Profile;