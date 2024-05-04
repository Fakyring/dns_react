import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function Header(props) {
    const user = useSelector((state) => state.user.currentUser)
    const admin = user.role === "admin"
    let about = admin ? <Link to='/about'>About</Link> : ""
    return (
        <header>
            <Link to='/'><img src={""}/></Link>
            <Link to='/api'>Api</Link>
            {about}
            <Link to='/auth'>Auth</Link>
        </header>
    )
}

export default Header;