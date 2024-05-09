import React from "react";
import '@mui/material'
import {
    Box, Button,
    Card,
    CardActionArea,
    CardHeader,
    CardMedia,
    Typography
} from "@mui/material";
import "./CartStyle.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function EquipmentElementCart(props) {
    const history = useNavigate()
    function buyCart(action) {
        axios.delete(process.env.REACT_APP_URL + "/api/carts/" + props.eq.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                action: action
            }
        }).then((equipments) => {
            history("/cart")
        })
    }

    let path = "/equipment/" + props.eq.id_eq;
    return (
        <Card className="cartCard">
            <CardActionArea href={path} draggable="false">
                <CardHeader title={props.eq.name} style={{textAlign: "center"}}/>
                <CardMedia component="img" height='210' draggable="false" image={props.eq.image}/>
                <Typography className="descr">{props.eq.descr}</Typography>
                <Typography>{props.eq.type}</Typography>
                <Box display="flex" gap={2} justifyContent="space-between" alignItems="center">
                    <Typography>
                        Количество: {props.eq.count}
                    </Typography>
                    <Typography>
                        Цена: {props.eq.price * props.eq.count}$
                    </Typography>
                </Box>
            </CardActionArea>
            <Box className={"centeredCart"} display="flex" justifyContent="center" gap="100px" alignItems="center">
                <Button className={"buy"} onClick={() => buyCart(1)}>Купить</Button>
                <Button className={"delete"} onClick={() => buyCart(0)}>Удалить</Button>
            </Box>

        </Card>
    )
}

export default EquipmentElementCart;