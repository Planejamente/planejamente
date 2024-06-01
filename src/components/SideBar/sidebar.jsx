import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

function Componente({ mode, actualPage, setActualPage}) {
  switch (mode) {
    case "psi":
      switch (actualPage) {
        case "perfil" :
          return (
              <>

              </>
          )
        case "agenda" :
          return (<></>)
        case "configuracoes" :
          return (<></>)
      }
    case "pac":
        switch (actualPage) {
            case "perfil" :
              return (<></>)
            case "agenda" :
            return (<></>)

        }
}

export default Componente;
