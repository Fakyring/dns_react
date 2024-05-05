import React, {useEffect, useState} from "react";
import '@mui/material'
import {
    Box,
    Card,
    CardHeader,
    CardMedia,
    Typography
} from "@mui/material";
import axios from "axios";
import {useParams} from "react-router-dom";

function EquipmentCard() {
    const [equipment, setEquipment] = useState();
    const params = useParams()
    useEffect(() => {
        axios.get("http://west-pulling.gl.at.ply.gg:9130/api/equipments/" + params.id).then((response) => {
            setEquipment(response.data.data)
        })
    }, []);
    if (!equipment) return null;
    return (
        <Card className="card">
            <CardHeader title={equipment.name} style={{textAlign: "center"}}/>
            <CardMedia component="img" height='210' draggable="false" image={equipment.image}/>
            <Typography>{equipment.descr}</Typography>
            <Box display="flex" gap={2} justifyContent="space-between" alignItems="center">
                <Typography>
                    Количество: {equipment.count}
                </Typography>
                <Typography>
                    Цена: {equipment.price}$
                </Typography>
            </Box>
        </Card>
    )
}

export default EquipmentCard;