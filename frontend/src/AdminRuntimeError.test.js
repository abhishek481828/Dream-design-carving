
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminOrders from './pages/AdminOrders';
import { act } from 'react-dom/test-utils';

// Mock matchMedia
window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

test('renders AdminLogin without crashing', () => {
    render(
        <BrowserRouter>
            <AdminLogin onLogin={() => { }} />
        </BrowserRouter>
    );
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
});

test('renders AdminOrders without crashing', async () => {
    // Mock fetch
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
        })
    );

    await act(async () => {
        render(
            <BrowserRouter>
                <AdminOrders />
            </BrowserRouter>
        );
    });
});
