const setWithExpiry = (key, value, ttl = 3600000) => {

    const now = new Date();

    const item = {
        value,
        expiry: now.getTime() + ttl, // Default: 1 hour expiry.
    };
    localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key) => {

    const itemStr = localStorage.getItem(key);

    if (!itemStr) return null;
    try {
        const now = new Date();
        const item = JSON.parse(itemStr);
        // Item is expired.
        if (now.getTime() > item.expiry) {
            // Remove item from localStorage,
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
};

// Clear only specific user's projects cache.

const clearSpecificItem = (cacheKey, id, data) => {

    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        const parsed = JSON.parse(cachedData);

        // Filter out the updated project data...
        const updatedData = {
            ...parsed,
            value: parsed.value.map((p) =>
                p.id === id ? { ...p, ...data } : p
            ),
        };
        localStorage.setItem(cacheKey, JSON.stringify(updatedData));
    }

};

export { setWithExpiry, getWithExpiry, clearSpecificItem }