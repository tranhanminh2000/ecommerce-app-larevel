import React from "react";
import "./dialog.scss";
import { useDispatch } from "react-redux";
import * as actions from "../../actions";

function Dialog({ message, action }) {
    const dispatch = useDispatch();

    const hideModal = () => {
        dispatch(actions.hideModal());
    };
    return (
        <div className="dialog">
            <p className="message">{message}</p>
            <div className="buttonGroup">
                <button className="btn primary btn-order" onClick={action}>
                    Yes
                </button>
                <button className="btn primary btn-cancel" onClick={hideModal}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default Dialog;
