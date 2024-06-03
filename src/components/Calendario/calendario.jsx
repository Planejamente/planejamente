import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./calendario.css";

const Calendario = ({selectedDate, onDateChange}) => {
    return (
        <div>
            <Calendar onChange={onDateChange} value={selectedDate} />
        </div>
    );
}

export default Calendario;
