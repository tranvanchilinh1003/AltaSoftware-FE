import React from "react";
import { ModalProps } from "./type";
import TitleComponent from "../../Title";
import "./style.css";
import { IconCloseCircleFill } from "../../Icons";

interface ModalFormProps extends ModalProps {
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const FormModal: React.FC<ModalFormProps> = ({
    isOpen,
    onClose,
    title = "Form Title",
    size = "4x-large",
    position = "center",
    titleAlign = "center",
    showCloseButton = true,
    children,
    footer
}) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div
                className={`modalWrapper ${size ? `size-${size}` : ''} ${position ? `position-${position}` : ''}`}
            >
                <div className="modalContent">
                    {/* HEADER */}
                    <div className="modalHeader flex items-center relative m-4">
                        <div className={`flex-1 flex  text-${titleAlign}`}>
                            <TitleComponent text={title || ''} size={28} weight="extrabold" />
                        </div>
                        {showCloseButton && (
                            <button className="absolute right-4 cursor-pointer" onClick={onClose}>
                                <IconCloseCircleFill className="size-5 text-red-300" />
                            </button>
                        )}
                    </div>

                    {/* BODY */}
                    <div className="modalBody">{children}</div>

                    {/* FOOTER */}
                    {footer && <div className="modalFooter">{footer}</div>}
                </div>
            </div>
        </div>
    );
};



export default FormModal;
