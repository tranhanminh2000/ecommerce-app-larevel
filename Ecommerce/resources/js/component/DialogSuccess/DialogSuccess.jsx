import React from "react";
import { Checkmark } from "react-checkmark";
import "./dialogSuccess.scss";

function DialogSuccess({ message, action }) {
    return (
        <div className="dialogSuccess">
            <Checkmark />
            <p className="message">{message}</p>
            <div className="buttonGroup">
                <button className="btn primary btn-order" onClick={action}>
                    Continue
                </button>
            </div>
        </div>
    );
}

export default DialogSuccess;
