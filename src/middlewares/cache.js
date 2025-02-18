import NodeCache from 'node-cache';

// Cache instance initialization with 100s default TTL
const cache = new NodeCache({ stdTTL: 100 });

// Middleware
export const cacheMiddleware = (keyPrefix) => {
    return async (req, res, next) => {
        try {
            // Cache key construction
            const cacheKey = `${keyPrefix}_${JSON.stringfy(req.params)}`;
            // Cache validation
            if (cache.has(cacheKey)) {
                console.log(`[${keyPrefix}] Serving from cache`);
                return res.json(cache.get(cacheKey));
            }

            // Storaging the cache key
            res.locals.cacheKey = cacheKey;
            console.log('Cached with success.')
            next();
        } catch (error){
            next(error);
        };

    };
};

// Data storage in cache
export const storeInCache = (data, cacheKey) => {
    // Saving data with used key
    cache.set(cacheKey, data);
    console.log('Stored')
}