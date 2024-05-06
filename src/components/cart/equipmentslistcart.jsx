import React from "react";
import EquipmentElement from "./equipmentcart";
import {Grid} from "@mui/material";
import "./CartStyle.css";

function EquipmentsListCart(props) {
    let totalPrice = 0
    let totalCount = 0
    return (
        <div>
            <h1 style={{textAlign: "center", color: "white"}}>Корзина</h1>
            <Grid container gap={2} margin={2} direction="row" justify="flex-start" alignItems="flex-start">
                {props.eqs.map(eq => {
                    totalCount += eq.count
                    totalPrice += eq.count * eq.price
                    return (
                        <EquipmentElement eq={eq}/>
                    )
                })}
            </Grid>
            <div className={"cartTotals"}>
                <div className={"cartTotalsBackground"}>
                    <div>
                        Итоговая сумма: {totalPrice}$
                    </div>
                    <div>
                        Итоговое количество: {totalCount}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EquipmentsListCart;