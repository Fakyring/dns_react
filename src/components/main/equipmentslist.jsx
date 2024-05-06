import React, {useState} from "react";
import EquipmentElement from "./equipment";
import {Grid, TextField} from "@mui/material";
import "./EquipmentsStyle.css";

function EquipmentsList(eqs) {
    const [eqName, setEqName] = useState();
    const handleSearch = (e) => {
        setEqName(e.target.value);
    };

    return (
        <div>
            <div className="searchPanel">
                <h1 style={{textAlign: "center", color: "white"}}>Оборудование</h1>
                <TextField style={{justifySelf: "center"}} onChange={handleSearch}
                           sx={{
                               "& .MuiOutlinedInput-root": {
                                   color: "#ffffff",
                                   fontFamily: "Arial",
                                   "&:hover .MuiOutlinedInput-notchedOutline": {
                                       borderColor: "white"
                                   },
                                   "& .MuiOutlinedInput-notchedOutline": {
                                       borderColor: "white",
                                       borderWidth: "2px",
                                   },
                                   "&.Mui-focused": {
                                       "& .MuiOutlinedInput-notchedOutline": {
                                           borderColor: "#8709ff",
                                           borderWidth: "3px",
                                       },
                                   },
                               },
                           }}
                />
            </div>
            <Grid className={"eqsList"} container gap={2} margin={2} direction="row" justify="flex-start" alignItems="flex-start">
                {eqs.eqs.map(eq => {
                    return (
                        <EquipmentElement eq={eq} filterName={eqName}/>
                    )
                })}
            </Grid>
        </div>
    )
}

export default EquipmentsList;