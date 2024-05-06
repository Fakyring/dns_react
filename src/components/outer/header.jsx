import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {changeStatus} from "../redux/userSlice";
import {Button} from "@mui/material";

function Header(props) {
    const user = useSelector((state) => state.status)
    const dispatch = useDispatch()
    useEffect(() => {
        axios.post(process.env.REACT_APP_URL + "/api/me", localStorage.getItem("token"), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            validateStatus: () => true
        }).then((user) => {
            if (user.status !== 401)
                if (user.data)
                    dispatch(changeStatus(user.data.role))
        })
    }, []);
    function exit(){
        axios.post(process.env.REACT_APP_URL + "/api/logout", localStorage.getItem("token"), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            validateStatus: () => true
        })
    }
    let adminPanel = user.role ? <Link to='/admin'>Панель администратора</Link> : ""
    let notUser = user.role === undefined ? <Link to='/auth' state={{action: "login"}}>Войти</Link> : <div className="rightHeader"><Link to='/cart'>Корзина</Link><Link to='/' onClick={exit}>Выйти</Link></div>
    return (
        <header>
            <Link to='/'><img src="/logo.png" alt="logo"/></Link>
            <div className="rightHeader">
                {adminPanel}
                {notUser}
            </div>
        </header>
    )
}

export default Header;