import './App.css';
import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import Header from "./components/outer/header";
import Footer from "./components/outer/footer";
import Home from "./components/main/home";
import Auth from "./components/auth/auth";
import EquipmentCard from "./components/equipment/equipmentCard";

function App() {
    return (
        <div className="container">
            <Header/>
            <div className="main">
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/auth' element={<Auth/>}></Route>
                    <Route path='/equipment/:id' element={<EquipmentCard/>}></Route>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
