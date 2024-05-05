import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {changeStatus} from "../redux/userSlice";

function Header(props) {
    const user = useSelector((state) => state.status)
    const dispatch = useDispatch()
    let adminPanel = user.role ? <Link to='/admin'>Панель администратора</Link> : ""
    useEffect(() => {
        axios.post("http://west-pulling.gl.at.ply.gg:9130/api/me", localStorage.getItem("token"), {
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
    let notUser = user.role === undefined ? <Link to='/auth' state={{action: "login"}}>Войти</Link> : ""
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