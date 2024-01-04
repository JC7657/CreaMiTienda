import Button, { ButtonProps } from './Button';
import React from 'react';

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ className = '', ...args }) => {
    return (
        <Button
            className={`ttnc-ButtonPrimary disabled:bg-opacity-90 bg-primary-500 dark:bg-primary-100 hover:bg-primary-700 text-primary-50 dark:text-primary-800 shadow-xl ${className}`}
            {...args}
        />
    );
};

export default ButtonPrimary;
