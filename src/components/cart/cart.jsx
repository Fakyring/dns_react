import React, {useEffect, useState} from "react";
import axios from "axios";
import "./CartStyle.css"
import EquipmentsListCart from "./equipmentslistcart";
import invert from "invert-color";
import useGenerateRandomColor from "../useGenerateRandomColor";
import {Button} from "@mui/material";

function Cart() {
    const r = document.documentElement;
    const [eqs, setEqs] = useState();
    const {color, generateColor} = useGenerateRandomColor();
    useEffect(() => {
        generateColor()
        axios.get(process.env.REACT_APP_URL + "/api/carts/my", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((equipments) => {
            setEqs(equipments.data.data)
        })
    }, []);
    if (!eqs) return null;
    r.style.setProperty('--bgcolor', "#" + color);
    r.style.setProperty('--color', invert(color));

    return (
        <div className="equipmentscart">
            <EquipmentsListCart eqs={eqs}/>
            {/*<div className={"centeredCart"}>*/}
            {/*    <Button>Купить всё</Button>*/}
            {/*    <Button>Удалить всё</Button>*/}
            {/*</div>*/}
        </div>
    )
}

export default Cart;