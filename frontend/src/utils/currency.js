export const formatCurrency = (amount, language = 'en') => {
    const options = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };

    if (language === 'ne') {
        return new Intl.NumberFormat('ne-NP', {
            style: 'currency',
            currency: 'NPR',
            ...options
        }).format(amount);
    }

    // Default to NPR (Nepalese Rupee)
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NPR',
        ...options
    }).format(amount);
};
