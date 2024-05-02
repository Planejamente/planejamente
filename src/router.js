import React from "react";
import Home from "./pages/home/Home";
import NotFound from "./pages/home/notFound/notFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router;