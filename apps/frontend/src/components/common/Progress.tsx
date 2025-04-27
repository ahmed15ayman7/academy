import React from 'react';
import {
    LinearProgress,
    CircularProgress,
    useTheme,
} from '@mui/material';

interface ProgressProps {
    value?: number;
    variant?: 'determinate' | 'indeterminate';
    type?: 'linear' | 'circular';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    size?: 'small' | 'medium' | 'large';
    thickness?: number;
    className?: string;
}

const Progress: React.FC<ProgressProps> = ({
    value = 0,
    variant = 'indeterminate',
    type = 'linear',
    color = 'primary',
    size = 'medium',
    thickness = 4,
    className = '',
}) => {
    const theme = useTheme();

    const getColorClass = () => {
        switch (color) {
            case 'primary':
                return 'text-primary-main';
            case 'secondary':
                return 'text-secondary-main';
            case 'success':
                return 'text-success-main';
            case 'error':
                return 'text-error-main';
            case 'warning':
                return 'text-warning-main';
            case 'info':
                return 'text-info-main';
            default:
                return '';
        }
    };

    const getSizeClass = () => {
        switch (size) {
            case 'small':
                return type === 'linear' ? 'h-1' : 'w-4 h-4';
            case 'medium':
                return type === 'linear' ? 'h-2' : 'w-8 h-8';
            case 'large':
                return type === 'linear' ? 'h-3' : 'w-12 h-12';
            default:
                return '';
        }
    };

    if (type === 'linear') {
        return (
            <LinearProgress
                variant={variant}
                value={value}
                className={`
          ${className}
          ${getColorClass()}
          ${getSizeClass()}
          rounded-full
          bg-gray-200
          dark:bg-gray-700
        `}
            />
        );
    }

    return (
        <CircularProgress
            variant={variant}
            value={value}
            thickness={thickness}
            className={`
        ${className}
        ${getColorClass()}
        ${getSizeClass()}
      `}
        />
    );
};

export default Progress; 