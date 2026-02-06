import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-primary)' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>404</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Oops! The page you are looking for does not exist.</p>
            <Link to="/" style={{
                padding: '10px 20px',
                backgroundColor: 'var(--accent-color)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '5px'
            }}>
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
