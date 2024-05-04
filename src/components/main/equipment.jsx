import React from "react";
import '@mui/material'
import {
    Box,
    Card,
    CardActionArea,
    CardHeader,
    CardMedia, ListItem, Stack,
    Typography
} from "@mui/material";

function EquipmentElement(props) {
    if (props.filterName && !props.eq.name.toLowerCase().includes(props.filterName.toLowerCase()))
        return ""
    let path = "/equipment/" + props.eq.id;
    return (
        <Card>
            <CardActionArea href={path}>
                <CardHeader title={props.eq.name} style={{textAlign: "center"}}/>
                <CardMedia component="img" height='210' image={props.eq.image}/>
                <Typography>{props.eq.descr}</Typography>
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