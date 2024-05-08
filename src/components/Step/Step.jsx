import React from "react";
import styles from "./Step.module.css";

const Step = ({ mode, text }) => {
    const stepStyle = {
        ran: {
          opacity: 0.5,
        },
        running : {
            opacity: 1,
        },
        run : {
            opacity: 0.5,
            color: "#aaa",
        }            
    };

    const dotStyle = {
        ran: {
        },
        running : {
        },
        run : {
            backgroundColor: "#aaa",
        }            
    };



  
  
  
    return (
    <div className={styles.step} style={stepStyle[mode]}>
      <span style={dotStyle[mode]} className={styles.dot}></span>
      <h4>{text}</h4>
    </div>
  );
};

export default Step;