import React from "react";
import '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
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

function EquipmentElement(props) {
    const user = useSelector((state) => state.status)
    function deleteEq(id) {
        console.log(id)
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
    let deleteBut = user.role === 1 ?
        <Button className={"deleteButton"} onClick={() => deleteEq(props.eq.id)}><ClearIcon></ClearIcon></Button> : ""
    return (
        <Card className="card" id={"idEq_" + props.eq.id}>
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