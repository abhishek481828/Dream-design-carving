import React from 'react';
import { formatCurrency } from '../utils/currency';
import { useTranslation } from 'react-i18next';

const OrderList = ({ orders }) => {
    const { i18n } = useTranslation();

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        },
        orderCard: {
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(148, 163, 184, 0.1)',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
            color: '#cbd5e1',
        },
        itemRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
            color: '#e2e8f0',
        },
        total: {
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(148, 163, 184, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            color: '#34d399',
        },
        status: (isPaid, isDelivered) => ({
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            background: isDelivered ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
            color: isDelivered ? '#34d399' : '#fbbf24',
        })
    };

    if (!orders || orders.length === 0) {
        return (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                No orders found.
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {orders.map((order) => (
                <div key={order._id} style={styles.orderCard}>
                    <div style={styles.header}>
                        <div>
                            <span style={{ fontWeight: 'bold' }}>Order ID:</span> {order._id}
                        </div>
                        <div>
                            {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                    <div>
                        {order.orderItems.map((item, index) => (
                            <div key={index} style={styles.itemRow}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <span>{item.name} x {item.qty}</span>
                                </div>
                                <span>{formatCurrency(item.price, i18n.language)}</span>
                            </div>
                        ))}
                    </div>

                    <div style={styles.total}>
                        <span>Total</span>
                        <span>{formatCurrency(order.totalPrice, i18n.language)}</span>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                        <span style={styles.status(order.isPaid, false)}>
                            {order.isPaid ? "Paid" : "Not Paid"}
                        </span>
                        <span style={styles.status(false, order.isDelivered)}>
                            {order.isDelivered ? "Delivered" : "Processing"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
