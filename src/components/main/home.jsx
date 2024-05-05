import axios from 'axios'
import {useEffect, useState} from "react";
import EquipmentsList from "./equipmentslist";
import {TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {changeStatus} from "../redux/userSlice";

function Home() {
    const [eqs, setEqs] = useState();
    useEffect(() => {
        axios.get("http://west-pulling.gl.at.ply.gg:9130/api/equipments").then((equipments) => {
            setEqs(equipments.data.data)
        })
    }, []);
    if (!eqs) return null;
    return (
        <div className="equipments">
            <EquipmentsList eqs={eqs}/>
        </div>
    )
}

export default Home;