import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/home/notFound/notFound";
import Login from "./pages/login/Login";
import Agendamento from "./pages/agendamento/Agendamento";
import Cadastro from "./pages/cadastro/Cadastro";
import WelcomePac from "./pages/welcomePac/WelcomePac";

function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/agendamento" element={<Agendamento />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/BemVindoPaciente" element={<WelcomePac />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router;