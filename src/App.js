import './App.css';
import React from "react";
import {Route, Routes} from 'react-router-dom';
import Header from "./components/outer/header";
import Footer from "./components/outer/footer";
import Home from "./components/main/home";
import Auth from "./components/auth/auth";
import EquipmentCard from "./components/equipment/equipmentCard";
import Cart from "./components/cart/cart";
import {useSelector} from "react-redux";
import AdminPanel from "./components/adminpanel/adminpanel";

function App() {
    const user = useSelector((state) => state.status)
    return (
        <div className="container">
            <Header/>
            <div className="main">
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/auth' element={<Auth/>}></Route>
                    <Route path='/equipment/:id' element={<EquipmentCard/>}></Route>
                    <Route path='/cart' element={user.role !== undefined ? <Cart/> : <Home/>}></Route>
                    <Route path='/admin' element={user.role === 1 ? <AdminPanel/> : <Home/>}></Route>
                    <Route path='/admin/:id' element={user.role === 1 ? <AdminPanel/> : <Home/>}></Route>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
