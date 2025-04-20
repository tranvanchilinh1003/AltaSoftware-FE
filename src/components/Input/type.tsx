import React from 'react';

export interface inputProps {
  outline?: 'primary-outline';
  disabled?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
  className?: string;
  type?: 'text' | 'password' | 'date';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;

  // react hook form
  value?: string;
  name?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  leftIconHandle?: () => void;
}
