import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Agendamento from "./pages/agendamento/Agendamento";
import Cadastro from "./pages/cadastro/Cadastro";

function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/agendamento" element={<Agendamento />} />
                    <Route path="/cadastro" element={<Cadastro />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router;