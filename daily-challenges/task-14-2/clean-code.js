// ==========================================
// Exercise 1: Meaningful Names
// ==========================================
const DISCOUNT_RATE = 0.1;
const MINIMUM_ADULT_AGE = 18;

export function getAdultUsers(users) {
    return users.filter((user) => user.age > MINIMUM_ADULT_AGE);
}

export function calculateDiscount(price, quantity) {
    return price * quantity * DISCOUNT_RATE;
}

// ==========================================
// Exercise 2: Single Responsibility
// ==========================================
export function validateUser(userData) {
    if (!userData.email || !userData.email.includes("@")) {
        throw new Error("Invalid email address");
    }
    if (userData.age < MINIMUM_ADULT_AGE) {
        throw new Error("User must be at least 18 years old");
    }
    return true;
}

export function normalizeUser(userData) {
    return {
        ...userData,
        email: userData.email.trim().toLowerCase(),
        name: userData.name.trim(),
    };
}

export function createUserRecord(userData) {
    validateUser(userData);
    const normalizedUser = normalizeUser(userData);
    return {
        ...normalizedUser,
        createdAt: new Date().toISOString(),
    };
}

// ==========================================
// Exercise 3: Avoid Magic Numbers
// ==========================================
const MIN_PASSWORD_LENGTH = 8;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const HTTP_NOT_FOUND = 404;

export function isValidPassword(password) {
    return typeof password === "string" && password.length >= MIN_PASSWORD_LENGTH;
}

export function isNotFoundResponse(statusCode) {
    return statusCode === HTTP_NOT_FOUND;
}

export function getExpirationTimestamp(nowMs = Date.now()) {
    return nowMs + ONE_DAY_MS;
}

// Quick verification output when run directly with Node
const sampleUsers = [
    { name: "  Amina  ", email: "AMINA@gmail.com", age: 21 },
    { name: "Brian", email: "brian@gmail.com", age: 16 },
];

console.log("Adult users:", getAdultUsers(sampleUsers));
console.log("Discount (500 x 2):", calculateDiscount(500, 2));
console.log("Normalized user:", createUserRecord(sampleUsers[0]));
console.log("Valid password check:", isValidPassword("secret123"));
console.log("404 check:", isNotFoundResponse(404));
console.log("24h expiry ms:", getExpirationTimestamp(0));
