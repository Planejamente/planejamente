import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/notFound";
import Login from "./pages/login/Login";
import Agendamento from "./pages/agendamento/Agendamento";
import Cadastro from "./pages/cadastro/Cadastro";
import WelcomePac from "./pages/welcomePac/WelcomePac";
import PerfilPsic from "./pages/PerfilPsic/perfilPsic";
import PsiPanel from "./pages/psiPanel/psiPanel";
import PacPanel from "./pages/pacPanel/pacPanel"

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
                    <Route path="/PerfilPsic/:id" element={<PerfilPsic />} />
                    <Route path="/psipanel" element={<PsiPanel />} />
                    <Route path="/pacpanel" element={<PacPanel />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router;