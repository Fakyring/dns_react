import React from "react";
import '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {
    Box, Button,
    Card,
    CardActionArea,
    CardHeader,
    CardMedia,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function EquipmentElement(props) {
    const history = useNavigate()
    const user = useSelector((state) => state.status)

    function deleteEq(id) {
        axios.delete(process.env.REACT_APP_URL + "/api/equipments/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then(() => {
            props.setEqs(props.eqs.filter((item) => item.id !== id))
        })
    }

    if (props.filterName && !props.eq.name.toLowerCase().includes(props.filterName.toLowerCase())) {
        return ""
    }
    let path = "/equipment/" + props.eq.id;
    let deleteBut = ""
    let updateBut = ""
    if (user.role === 1) {
        deleteBut =
            <Button className={"deleteButton"} onClick={() => deleteEq(props.eq.id)}><ClearIcon></ClearIcon></Button>
        updateBut =
            <Button className={"updateButton"} onClick={() => history("/admin/" + props.eq.id)}><AutorenewIcon></AutorenewIcon></Button>
    }
    return (
        <Card className="card" id={"idEq_" + props.eq.id}>
            {updateBut}
            {deleteBut}
            <CardActionArea href={path} draggable="false">
                <CardHeader title={props.eq.name} style={{textAlign: "center"}}/>
                <CardMedia component="img" height='210' draggable="false" image={props.eq.image}/>
                <Typography className="descrMain">{props.eq.descr}</Typography>
                <Typography>{props.eq.type}</Typography>
                <Box display="flex" gap={2} justifyContent="space-between" alignItems="center">
                    <Typography>
                        Количество: {props.eq.count}
                    </Typography>
                    <Typography>
                        Цена: {props.eq.price}$
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    )
}

export default EquipmentElement;