export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen?: () => void;
    size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | '2x-large' | '3x-large' | '4x-large' | '5x-large' | 'full-screen';
    position?: 'top' | 'bottom' | 'center' | 'top-center' | 'bottom-center';
    title?: string;
    children: React.ReactNode;
    footerContent?: React.ReactNode;
    titleAlign?: 'left' | 'center' | 'right';
    showCloseButton?: boolean; // Thêm prop kiểm soát nút đóng
}
