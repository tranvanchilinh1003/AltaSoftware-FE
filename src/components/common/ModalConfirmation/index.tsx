import React from 'react';
import { ModalProps } from './type';
import TitleComponent from '../../Title';
import './style.css';
import { IconCloseCircleFill } from '../../Icons';

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = '',
    position = 'center',
    footerContent,
    titleAlign = 'center',
    showCloseButton = true,
}) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className={`modalWrapper size-${size} position-${position}`} onClick={(e) => e.stopPropagation()}>
                <div className="modalContent">
                    {/* HEADER */}
                    <div className="modalHeader flex items-center relative">
                        <div className={`flex-1 flex  text-${titleAlign}`}>
                            <TitleComponent text={title || ''} size={28} weight="extrabold" />
                        </div>

                        {showCloseButton && (
                            <button className="absolute right-4  block cursor-pointer" onClick={onClose}>
                                <IconCloseCircleFill className='size-5 text-red-300'/>
                            </button>
                        )}
                    </div>

                    {/* BODY */}
                    <div className='modalBody'>{children}</div>

                    {/* FOOTER */}
                    {footerContent && <div className="modalFooter">{footerContent}</div>}
                </div>
            </div>
        </div>
    );
};

export default Modal;
