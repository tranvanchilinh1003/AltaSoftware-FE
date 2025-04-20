import React, { useState, useEffect } from "react";
import { AlertProps } from "./type";
import styles from "./style.module.css";
import {
    IconCloseCircleFill,
    IconOutlineErrorOutline,
    IconSuccessFilled,
    IconWarningFill,
} from "../Icons";

const iconComponent = {
    info: <IconOutlineErrorOutline className="size-5 mr-3 text-blue-600" />,
    success: <IconSuccessFilled className="size-5 mr-3 text-green-600" />,
    warning: <IconWarningFill className="size-5 mr-3 text-yellow-600" />,
    error: <IconCloseCircleFill className="size-5 mr-3 text-red-600" />,
};

const AlertwithIcon: React.FC<AlertProps> = ({ message, type }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const handleClose = () => {
        setFadeOut(true);
        setTimeout(() => setIsVisible(false), 300); // Chờ 300ms để hoàn tất hiệu ứng
    };

    useEffect(() => {
        // Tự động đóng sau 5 giây
        const timer = setTimeout(handleClose, 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`${styles.alert} ${styles[type]} flex items-center justify-between ${fadeOut ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                } transition-all duration-300 ease-in-out`}
            role="alert"
        >
            <div className="flex items-center">
                {iconComponent[type]}
                <span className="font-semibold">{message}</span>
            </div>
            <button onClick={handleClose} className="text-gray-600 hover:text-gray-800">
                <IconCloseCircleFill className="size-5" />
            </button>
        </div>
    );

};

export default AlertwithIcon;
