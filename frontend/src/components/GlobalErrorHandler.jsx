
import React from 'react';

class GlobalErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Global Catch:", error);

        // This specific error is usually caused by corrupted Base64 strings in localStorage (e.g. from atob)
        if (error.message && (
            error.message.includes("The string did not match the expected pattern") ||
            error.message.includes("DOMException") ||
            error.name === "InvalidCharacterError"
        )) {
            console.log("Corrupted data detected. Clearing localStorage and reloading...");
            localStorage.clear();
            sessionStorage.clear();
            // Force reload to clear state
            window.location.reload();
        }
    }

    render() {
        if (this.state.hasError) {
            // If it wasn't auto-fixed above, show a fallback UI
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0f172a',
                    color: '#f1f5f9',
                    fontFamily: 'sans-serif'
                }}>
                    <h2>Something went wrong</h2>
                    <p>We encountered a temporary issue.</p>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        style={{
                            padding: '10px 20px',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            marginTop: '20px',
                            fontWeight: 'bold'
                        }}
                    >
                        Click to Fix & Reload
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorHandler;
