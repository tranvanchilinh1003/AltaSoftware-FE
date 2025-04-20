import React, { useMemo, useCallback } from 'react';
import './style.css';
import { ButtonProps } from './type';

const Button: React.FC<ButtonProps> = ({
    className = '',
    disabled = false,
    icon,
    children,
    onClick,
    width,
    height,
    size = 'big',
    type = 'button',
    style,
}) => {
    const buttonClass = useMemo(
        () => `button ${className} ${size} ${disabled ? 'disabled' : ''}`,
        [className, size, disabled]
    );


    const buttonStyle = useMemo(
        () => ({ ...style, width, height }),
        [style, width, height]
    );

    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        }
    }, [onClick]);

    return (
        <button
            className={buttonClass}
            onClick={handleClick}
            style={buttonStyle}
            type={type}
        >
            {icon && <span className="icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
