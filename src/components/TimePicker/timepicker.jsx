import React from "react";
import "./timepicker.css";

const TimePicker = ({ startTime, endTime, onStartTimeChange, onEndTimeChange}) => {

    return (
        <div className="content">
            <div className="formField">
                <h3>Início:</h3>
                <input
                    aria-label="Time"
                    type="time"
                    value={startTime}
                    onChange={(event) => onStartTimeChange(event.target.value)}
                />
            </div>
            <div className="formField">
                <h3>Fim:</h3>
                <input
                    aria-label="Time"
                    type="time"
                    value={endTime}
                    onChange={(event) => onEndTimeChange(event.target.value)}
                />
            </div>
        </div>
    );
};

export default TimePicker;
