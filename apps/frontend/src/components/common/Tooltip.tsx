import React from 'react';
import {
    Tooltip as MuiTooltip,
    TooltipProps as MuiTooltipProps,
    useTheme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';

interface TooltipProps extends Omit<MuiTooltipProps, 'title'> {
    title: string;
    children: React.ReactElement;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    arrow?: boolean;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    title,
    children,
    placement = 'top',
    arrow = true,
    className = '',
    ...props
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <MuiTooltip
            title={t(title)}
            placement={placement}
            arrow={arrow}
            className={`
        ${className}
        [&_.MuiTooltip-tooltip]:bg-gray-800
        [&_.MuiTooltip-tooltip]:text-white
        [&_.MuiTooltip-tooltip]:text-sm
        [&_.MuiTooltip-tooltip]:px-3
        [&_.MuiTooltip-tooltip]:py-2
        [&_.MuiTooltip-tooltip]:rounded-lg
        [&_.MuiTooltip-tooltip]:shadow-lg
        [&_.MuiTooltip-arrow]:text-gray-800
        dark:[&_.MuiTooltip-tooltip]:bg-gray-700
        dark:[&_.MuiTooltip-arrow]:text-gray-700
      `}
            {...props}
        >
            {children}
        </MuiTooltip>
    );
};

export default Tooltip; 