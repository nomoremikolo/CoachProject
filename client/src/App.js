import React, {useEffect, useRef} from 'react';
import {Route, Routes} from "react-router-dom";
import Welcome from "./pages/Other/Welcome";
import Login from "./pages/Guest/Login";
import Layout from "./components/Layout";
import {useDispatch, useSelector} from "react-redux";
import Profile from "./pages/Other/Profile/Profile";
import {checkAuth, login} from "./redux/action_creators/auth-action-creator";
import PageNotFound from "./pages/Other/PageNotFound";
import ProfileLoginDataEditForm from "./pages/Other/Profile/ProfileLoginDataEditForm";
import ProfileDataEditForm from "./pages/Other/Profile/ProfileDataEditForm";
import Users from "./pages/Admin/Users/Users";
import CreateUserForm from "./pages/Admin/Users/CreateUserForm";
import EditUser from "./pages/Admin/Users/EditUser";
import Schedule from "./pages/Client/Schedule";
import Clients from "./pages/Coach/Clients";
import ClientSchedule from "./pages/Coach/ClientSchedule";
import CreateSchedule from "./pages/Coach/CreateSchedule";
import ClientScheduleExercises from "./pages/Coach/ClientScheduleExercises";
import ClientNewExercise from "./pages/Coach/ClientNewExercise";
import Exercises from "./pages/Client/Exercises";

function App() {
    const dispatch = useDispatch()
    const {isAuth, user} = useSelector(state => state.authReducer)
    useEffect(() => {
        if(localStorage.getItem('token')){
            dispatch(checkAuth())
        }
    }, [ ])
  return (
    <div>
        <Routes>
            <Route element={<Layout />}>
                {isAuth ?
                    <>
                        <Route path={'/'} element={<Welcome/>}/>
                        <Route path={'/login'} element={isAuth ? <Profile/> : <Login/>}/>
                        <Route path={'/profile'} element={<Profile/>}/>
                        <Route path={'/profile/edit/loginData'} element={<ProfileLoginDataEditForm/>}/>
                        <Route path={'/profile/edit/profileData'} element={<ProfileDataEditForm/>}/>
                        <Route path={"*"} element={<PageNotFound/>}/>
                        {user.role === 2 ?
                            <>
                                <Route path={'/users'} element={<Users/>}/>
                                <Route path={'/users/New/'} element={<CreateUserForm/>}/>
                                <Route path={'/users/Edit/:id'} element={<EditUser/>}/>
                            </>
                            :
                            <></>
                        }
                        {user.role === 0 ?
                        <>
                            <Route path={"/schedule"} element={<Schedule/>}/>
                            <Route path={"/schedule/exercises/:scheduleId"} element={<Exercises/>}/>
                        </> : <></>
                        }
                        {user.role === 1 ?
                        <>
                            <Route path={"/clients"} element={<Clients/>}/>
                            <Route path={"/client/schedules/:userId"} element={<ClientSchedule/>}/>
                            <Route path={"/schedule/new/:userId"} element={<CreateSchedule/>}/>
                            <Route path={"/schedule/exercises/:scheduleId"} element={<ClientScheduleExercises/>}/>
                            <Route path={"/schedule/exercises/new/:scheduleId"} element={<ClientNewExercise/>}/>
                        </> : <></>
                        }
                    </>
                    :
                    <Route path={"*"} element={<Login/>}/>
                }
            </Route>
        </Routes>
    </div>
  );
}

export default App;
