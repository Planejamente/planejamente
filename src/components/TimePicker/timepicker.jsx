import React from "react";
import "./timepicker.css";

const TimePicker = () => {  
    return (
        <div className="content">
            <div className="formField">
                <h3>Início:</h3>
                <input aria-label="Time" type="time"/>
            </div>
            <div className="formField">
                <h3>Fim:</h3>
                <input aria-label="Time" type="time"/>
            </div>
        </div>
    );
};

export default TimePicker;