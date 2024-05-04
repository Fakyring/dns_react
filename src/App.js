import './App.css';
import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import Header from "./components/outer/header";
import Footer from "./components/outer/footer";
import Home from "./components/main/home";

function App() {
    return (
        <div className="container">
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
