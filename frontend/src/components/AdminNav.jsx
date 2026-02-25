import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API_BASE_URL from "../config";

const AdminNav = () => {
    const location = useLocation();
    const [counts, setCounts] = useState({ unreadOrders: 0, unreadMessages: 0 });
    const token = localStorage.getItem("adminToken");

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
    };

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/admin/unread-counts`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setCounts(data);
                }
            } catch (error) {
                console.error("Failed to fetch unread counts", error);
            }
        };

        fetchCounts();
        // Poll every 30 seconds
        const interval = setInterval(fetchCounts, 30000);
        return () => clearInterval(interval);
    }, [token]);

    const navItemStyle = {
        marginRight: '15px',
        textDecoration: 'none',
        color: '#64748b',
        fontWeight: '500',
        padding: '5px 10px',
        borderRadius: '5px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px'
    };

    const activeStyle = {
        ...navItemStyle,
        background: '#3b82f6',
        color: 'white'
    };

    const badgeStyle = {
        background: '#ef4444',
        color: 'white',
        fontSize: '0.75rem',
        padding: '2px 6px',
        borderRadius: '10px',
        minWidth: '18px',
        textAlign: 'center'
    };

    return (
        <div className="admin-nav" style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
            <Link
                to="/admin/products"
                style={location.pathname === "/admin/products" ? activeStyle : navItemStyle}
            >
                Products
            </Link>
            <Link
                to="/admin/orders"
                style={location.pathname === "/admin/orders" ? activeStyle : navItemStyle}
            >
                Orders {counts.unreadOrders > 0 && <span style={badgeStyle}>{counts.unreadOrders}</span>}
            </Link>
            <Link
                to="/admin/messages"
                style={location.pathname === "/admin/messages" ? activeStyle : navItemStyle}
            >
                Messages {counts.unreadMessages > 0 && <span style={badgeStyle}>{counts.unreadMessages}</span>}
            </Link>
            <button
                onClick={handleLogout}
                style={{ marginLeft: '10px', padding: '5px 14px', borderRadius: '5px', border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', fontWeight: '500', cursor: 'pointer', fontSize: '0.9rem' }}
            >
                Logout
            </button>
        </div>
    );
};

export default AdminNav;
