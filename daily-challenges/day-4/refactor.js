const TAX_RATE = 0.16;

// Extract repeated tax and formatting logic into pure helper functions
function calculateTax(subtotal) {
    return subtotal * TAX_RATE;
}

function formatCurrency(amount) {
    return `KES ${amount.toFixed(2)}`;
}

// Refactored checkout processor with meaningful names and proper error handling
export function generateReceipt(cartItems) {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new Error("Cannot generate receipt for an empty cart.");
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;

    return {
        subtotal: formatCurrency(subtotal),
        tax: formatCurrency(tax),
        total: formatCurrency(total),
    };
}
