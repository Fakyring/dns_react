import React from "react";
import EquipmentElement from "./equipment";

function EquipmentsList(eqs) {
    return (
        <table>
            <caption>Оборудование</caption>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Количество</th>
                <th>Цена</th>
                <th>Картинка</th>
            </tr>
            <tbody>
            {eqs.eqs.map(eq => {
                return (
                    <EquipmentElement eq={eq}/>
                )
            })}
            </tbody>
        </table>
    )
}

export default EquipmentsList;