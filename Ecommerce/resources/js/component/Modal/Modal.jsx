import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import "./modal.scss";

const Modal = () => {
    const modal = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    const handleHideModal = () => {
        dispatch(actions.hideModal());
    };

    return (
        <div className={classNames("bwm-modal", { show: modal.showModal })}>
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        {modal.title}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleHideModal}
                    ></button>
                </div>
                <div class="modal-body">{modal.content}</div>
            </div>
            <div className={"overlay"} onClick={handleHideModal}></div>
        </div>
    );
};

export default Modal;
