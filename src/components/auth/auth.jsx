import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {redirect, useLocation} from "react-router-dom";
import Login from "./login";
import Register from "./register";

function Auth(props) {
    const user = useSelector((state) => state.status)
    let location = useLocation()
    const action = location.state ? location.state.action : "login"
    let auth = action === "login" ? <Login/> : <Register/>;
    if (user)
        redirect("/")
    return (
        <div className="auth">
            {auth}
        </div>
    )
}

export default Auth;