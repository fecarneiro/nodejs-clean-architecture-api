export function responseTimeLogger(req, res, next) {
    const startHrTime = process.hrtime()

    res.on("finish", () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

        console.log(`[Performance] ${req.method} ${req.originalUrl} - Duration: ${elapsedTimeInMs.toFixed(2)}ms`);
    });

    next();
}