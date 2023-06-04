import React from 'react';
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


const Welcome = () => {
    const {isAuth, user} = useSelector(state => state.authReducer)
    document.title = "Головна сторінка"
    return (
        <Container>
            <div className={`mt-5 mb-5 bg-light pb-2 shadow rounded`}>
                <div className="row align-items-center p-5">
                    <div className="col">
                        <h5 className={"fw-lighter fs-5"}>"Вітаємо вас у нашому сучасному залі для тренувань! Незалежно
                            від вашого рівня підготовки, у нас ви
                            знайдете все необхідне для досягнення ваших фітнес-цілей. Наш зал обладнаний новітнім
                            тренажерним
                            обладнанням та просторими зонами для розтяжки та функціональних тренувань. Наші професійні
                            тренери
                            завжди готові надати вам підтримку та індивідуальний підхід. Приєднуйтесь до нас і змініть
                            своє
                            життя на краще прямо зараз!"</h5>
                    </div>
                    <div className="col">
                        <img width={650} className={"rounded shadow-lg d-block ms-4"}
                             src="https://s1.1zoom.ru/b5050/981/Fitness_Gym_Sitting_Kettlebell_Legs_Shoe_sole_600415_1920x1080.jpg"
                             alt=""/>
                    </div>
                </div>
                {isAuth ?
                    user.role === 0 ?
                        <Link className={"btn btn-outline-primary d-block mx-auto px-5 py-3 my-3 w-25"}
                              to={"/schedule"}>Розклад</Link>
                        :
                        user.role === 1 ?
                            <Link className={"btn btn-outline-primary d-block mx-auto px-5 py-3 my-3 w-25"}
                                  to={"/clients"}>Перейти до клієнтів</Link>
                            :
                            <Link className={"btn btn-outline-primary d-block mx-auto px-5 py-3 my-3 w-25"}
                                  to={"/users"}>Переглянути користувачів</Link>
                    : <Link className={"btn btn-outline-primary d-block mx-auto px-5 py-3 my-3 w-25"}
                            to={"login"}>Авторизуватися</Link>}
            </div>
        </Container>
    );
};

export default Welcome;