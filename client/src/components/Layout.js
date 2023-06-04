import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {DoorOpen, PeopleFill, PersonCircle} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/action_creators/auth-action-creator";
import {LinkContainer} from 'react-router-bootstrap'

const Layout = () => {
    const dispatch = useDispatch()
    const {user, isAuth} = useSelector(state => state.authReducer)
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand className={"ms-3"} href="/">Train Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={"/"}>
                            <Nav.Link>Головна</Nav.Link>
                        </LinkContainer>
                        {user?.role === 0 ?
                        <>
                            <LinkContainer to={"/schedule"}>
                                <Nav.Link>Розклад</Nav.Link>
                            </LinkContainer>
                        </> : <></>
                        }
                        {user?.role === 1 ?
                        <>
                            <LinkContainer to={"/clients"}>
                                <Nav.Link>Клієнти</Nav.Link>
                            </LinkContainer>
                        </> : <></>
                        }
                    </Nav>
                    <div className={"me-4"}>
                        {!isAuth ?
                            <Link to={"/login"}>Авторизуватися</Link>
                            :
                            <NavDropdown className={"text-primary"} align={"end"} title={user.login}>
                                <LinkContainer to={'/profile'}>
                                    <NavDropdown.Item>Profile <PersonCircle className={'mb-1'} height={'18'} width={'18'}/></NavDropdown.Item>
                                </LinkContainer>
                                {user.role === 2 ?
                                    <>
                                        <LinkContainer to={'/users'}>
                                            <NavDropdown.Item>Users <PeopleFill className={'mb-1'} height={'18'} width={'18'}/></NavDropdown.Item>
                                        </LinkContainer>
                                    </>:<></>
                                }
                                <NavDropdown.Item onClick={logoutHandler} href="#">Logout <DoorOpen className={"mb-1"} height={'18'} width={'18'}/></NavDropdown.Item>
                            </NavDropdown>
                        }
                    </div>
                </Navbar.Collapse>

            </Navbar>
            <main>
                <Outlet/>
            </main>
        </>
    );
};

export default Layout;