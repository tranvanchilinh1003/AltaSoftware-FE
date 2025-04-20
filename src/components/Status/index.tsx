import React from 'react';
import './style.css';
import { StatusProps } from './type';

const statusConfig: Record<StatusProps['type'], { label: string; color: string; dotColor: string }> = {
  studying: {
    label: 'Đang theo học',
    color: 'green',
    dotColor: '#28a745',
  },
  dropped: {
    label: 'Đã thôi học',
    color: 'red',
    dotColor: '#dc3545',
  },
  graduated: {
    label: 'Đã tốt nghiệp',
    color: 'blue',
    dotColor: '#007bff',
  },
  classTransferred: {
    label: 'Đã chuyển lớp',
    color: 'orange',
    dotColor: '#fd7e14',
  },
  schoolTransferred: {
    label: 'Đã chuyển trường',
    color: 'black',
    dotColor: '#343a40',
  },
};

const Status: React.FC<StatusProps> = ({
  type,
  label,
  styles,
  className = '',
  height,
  width,
  margin,
  padding,
  fontSize,
  borderRadius,
  gap,
  border,
}) => {
  const { label: defaultLabel, color, dotColor } = statusConfig[type];

  const containerStyle: React.CSSProperties = {
    ...(styles?.container ?? {}),
    height,
    width,
    margin,
    padding,
    fontSize,
    borderRadius,
    gap,
    border,
    borderColor: color,
  };

  const dotStyle: React.CSSProperties = {
    backgroundColor: dotColor,
    ...(styles?.dot ?? {}),
  };

  const labelStyle: React.CSSProperties = {
    color, // Màu chữ theo màu nền
    ...(styles?.label ?? {}),
  };

  return (
    <div className={`status-container status-${type} ${className}`.trim()} style={containerStyle}>
      <span className={`status-dot ${type}`} style={dotStyle}></span>
      <span style={labelStyle}>{label || defaultLabel}</span>
    </div>
  );
};

export default Status;
