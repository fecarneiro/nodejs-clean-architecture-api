# Use the official Bun image
FROM oven/bun:latest
WORKDIR /usr/src/app
COPY . .
RUN bun install --frozen-lockfile
EXPOSE 3000/tcp
CMD ["bun", "run", "start"]