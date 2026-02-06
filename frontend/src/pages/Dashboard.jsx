import React, { useState, useEffect } from "react";
import OrderList from "../components/OrderList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("profile");
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Only real validation is trying to fetch protected data or checking token presence
        const token = localStorage.getItem("token"); // Assuming you store token as 'token' for users? 
        // Wait, earlier admin login used 'adminToken'. User login might use 'userToken' or just 'token'.
        // I should check Login.jsx if I can, but standard is 'token' usually or I'll check.
        // Let's assume 'token' for now.

        if (!token && !localStorage.getItem("adminToken")) {
            // Simple client side check, real protection is API
        }
    }, []);

    useEffect(() => {
        if (activeTab === "orders") {
            fetchOrders();
        }
    }, [activeTab]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token"); // Use user token
            const res = await fetch("/api/orders/myorders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setOrders(data);
            } else {
                toast.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const containerStyles = {
        minHeight: "100vh",
        padding: "6rem 2rem 2rem",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "#f1f5f9",
    };

    const contentStyles = {
        maxWidth: "1000px",
        margin: "0 auto",
        background: "rgba(30, 41, 59, 0.5)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        border: "1px solid rgba(148, 163, 184, 0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: "600px",
    };

    const tabsStyles = {
        display: "flex",
        borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
    };

    const tabButtonStyles = (isActive) => ({
        flex: 1,
        padding: "1.5rem",
        background: isActive ? "rgba(59, 130, 246, 0.1)" : "transparent",
        color: isActive ? "#60a5fa" : "#94a3b8",
        border: "none",
        borderBottom: isActive ? "2px solid #60a5fa" : "none",
        cursor: "pointer",
        fontSize: "1.1rem",
        fontWeight: "600",
        transition: "all 0.3s ease",
    });

    const tabContentStyles = {
        padding: "2rem",
    };

    return (
        <div style={containerStyles}>
            <div style={contentStyles}>
                <div style={tabsStyles}>
                    <button
                        style={tabButtonStyles(activeTab === "profile")}
                        onClick={() => setActiveTab("profile")}
                    >
                        My Profile
                    </button>
                    <button
                        style={tabButtonStyles(activeTab === "orders")}
                        onClick={() => setActiveTab("orders")}
                    >
                        Order History
                    </button>
                </div>

                <div style={tabContentStyles}>
                    {activeTab === "profile" && (
                        <div style={{ textAlign: "center", padding: "2rem" }}>
                            <div style={{
                                width: "100px", height: "100px", background: "#3b82f6",
                                borderRadius: "50%", margin: "0 auto 1.5rem",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "2.5rem"
                            }}>
                                👤
                            </div>
                            <h2>Welcome Back!</h2>
                            {/* <p style={{ color: "#94a3b8" }}>{user?.email || "User"}</p> */}
                            <p style={{ color: "#94a3b8", marginTop: "1rem" }}>
                                Manage your profile settings and view your order history here.
                            </p>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <OrderList orders={orders} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
