import React from "react";
import {Link} from "react-router-dom";

function EquipmentElement(props) {
    let path = "/equipment/" + props.eq.id;
    console.log(props.eq)
    return (
        <tr>
            <Link to={path} state={{eq: props.eq}}>{props.eq.id}</Link>
            <td>{props.eq.name}</td>
            <td>{props.eq.descr}</td>
            <td>{props.eq.count}</td>
            <td>{props.eq.price}</td>
            <td><img src={props.eq.image}/></td>
        </tr>
    )
}

export default EquipmentElement;