import axios from 'axios'
import {useEffect, useState} from "react";
import EquipmentsList from "./equipmentslist";

function Home() {
    const [eqs, setEqs] = useState();
    useEffect(() => {
        axios.get(process.env.REACT_APP_URL + "/api/equipments").then((equipments) => {
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