import React from 'react';
import {Link} from "react-router-dom";

const PageNotFound = () => {
    return (
        <div>
            <div className={"d-flex justify-content-center mt-4"}>
                <img className={""} width={300} src="https://cdnl.iconscout.com/lottie/premium/thumb/404-error-5650800-4713103.gif" alt=""/>
            </div>
            <Link className={"d-block text-center mt-4"} to={'/'}>На головну сторінку</Link>
        </div>
    );
};

export default PageNotFound;