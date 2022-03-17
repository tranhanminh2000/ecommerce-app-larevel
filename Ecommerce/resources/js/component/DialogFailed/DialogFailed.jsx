import React from "react";
import "./dialogFailed.scss";

function DialogFailed({ message, action }) {
    return (
        <div className="dialogFailed">
            <img src="/error.png" alt="" />
            <p className="message">{message}</p>
            <div className="buttonGroup">
                <button className="btn primary btn-order" onClick={action}>
                    Continue
                </button>
            </div>
        </div>
    );
}

export default DialogFailed;
