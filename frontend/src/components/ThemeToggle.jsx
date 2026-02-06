import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
    );
};

export default ThemeToggle;
