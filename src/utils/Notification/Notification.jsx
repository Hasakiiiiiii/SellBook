import React from "react";

import "./Notification.css";
import "../FormVisible/FormVisibleAll.css";

const Notification = ({ title, content, onClose, onApply }) => {
    return (
        <div className="bg_black">
            <div className="modal-box" id="box">
                <div className="modal-content">
                    <h4>{title}</h4>
                    <p>{content}</p>
                    <div className="modal-btn">
                        <button onClick={onClose}>Hủy</button>
                        <button onClick={onApply}>Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
