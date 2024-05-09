import React, {useEffect, useState} from "react";
import '@mui/material'
import {
    Box, Button,
    Card,
    CardHeader,
    CardMedia,
    Typography
} from "@mui/material";
import axios from "axios";
import {useParams} from "react-router-dom";
import "./EquipmentStyle.css"
import useGenerateRandomColor from "../useGenerateRandomColor";
import invert from 'invert-color';
import {useSelector} from "react-redux";

function EquipmentCard() {
    const r = document.documentElement
    const {color, generateColor} = useGenerateRandomColor()
    const [equipment, setEquipment] = useState()
    const params = useParams()
    const user = useSelector((state) => state.status)
    useEffect(() => {
        generateColor();
        axios.get(process.env.REACT_APP_URL + "/api/equipments/" + params.id).then((response) => {
            setEquipment(response.data.data)
        })
    }, []);
    if (!equipment) return null;
    const handleSubmit = (event) => {
        event.preventDefault();
        if (equipment.count <= 0) {
            alert("Товара больше нет")
            return
        }
        axios.post(process.env.REACT_APP_URL + "/api/carts", {
            "id_eq": equipment.id,
            "count": 1
        }, {
            validateStatus: () => true,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((response) => {
            if (response.status === 200 || response.status === 201)
                generateColor();
            else
                alert("Товара больше нет")
            axios.get(process.env.REACT_APP_URL + "/api/equipments/" + params.id).then((response) => {
                setEquipment(response.data.data)
            })
        })
    };

    r.style.setProperty('--bgcolor', "#" + color);
    r.style.setProperty('--color', invert(color));
    let addingToCart = user.role === undefined ? "" : <Button className="addToCart" onClick={handleSubmit}>Добавить в корзину</Button>
    return (
        <div className={"cardFlex"}>
            <Card className="eqCard">
                <CardHeader title={equipment.name} style={{textAlign: "center"}}/>
                <CardMedia component="img" draggable="false" image={equipment.image}/>
                <Typography className="descrCard">{equipment.descr}</Typography>
                <Typography>{equipment.type}</Typography>
                <Box display="flex" gap={2} justifyContent="space-between" alignItems="center">
                    <Typography className="typography">
                        Количество: {equipment.count}
                    </Typography>
                    <Typography className="typography">
                        Цена: {equipment.price}$
                    </Typography>
                </Box>
                {addingToCart}
            </Card>
        </div>
    )
}

export default EquipmentCard;