import React from 'react';
import Button from '../../../../../components/Button';
import Modal from '../../../../../components/common/ModalConfirmation';
import TextComponent from '../../../../../components/Text';


interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm,}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Xóa"
            size="medium"
            position="center"
            titleAlign="center"
            showCloseButton={false}
            footerContent={
                <div className="flex justify-center items-center gap-4">
                    <Button
                        size="big"
                        type="button"
                        style={{
                            backgroundColor: 'var(--background-gray)',
                            border: 'none',
                            color: 'black',
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-Mulish)',
                        }}
                        onClick={onClose}
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={onConfirm}
                        type="button"
                        size="big"
                        style={{
                            backgroundColor: 'var(--background-4)',
                            border: 'none',
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-Mulish)',
                        }}
                    >
                        Xác nhận
                    </Button>
                </div>
            }
        >
            <TextComponent
                text="Xác nhận muốn xóa nhưng thông tin đã chọn? sau khi xóa sẽ không thể hoàn tác"
                size={16}
            />
        </Modal>
    );
};

export default ConfirmDeleteModal;
