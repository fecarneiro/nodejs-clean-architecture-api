import NodeCache from 'node-cache';

// Initialize NodeCache with a default TTL (time-to-live) of 60 seconds
const cache = new NodeCache({ stdTTL: 60 });


export function cacheMiddleware(keyPrefix) {
    return (req, res, next) => {
        const key = `${keyPrefix}:${req.originalUrl}`; // Use the URL as the cache key
        const cachedData = cache.get(key); // Attempt to retrieve data from the cache

        if (cachedData) {
            console.log(`[Cache] Hit for ${key}`);
            return res.status(200).json(cachedData); // Return cached data if it exists
        }

        console.log(`[Cache] Miss for ${key}`);

        // Intercept res.json to store the response in the cache
        const originalJson = res.json.bind(res);
        res.json = (data) => {
            cache.set(key, data); // Store response in cache
            originalJson(data); // Send response to client
        };

        next();
    };
}