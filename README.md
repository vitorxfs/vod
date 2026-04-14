# Video On Demand app - in construction...

This is a video on demand (VOD) implementation using Node.js and AWS

## Tools:

- Node.js
- Fastify
- PostgreSQL
- LocalStack (S3, MediaConvert, CloudFront)

## Architecture

App -uploads-> S3 (raw) -> MediaConvert -> S3 -> CloudFront -consumed by-> App

## Checklist

- [x] Create Dockerfile and docker-compose.yml
- [x] Create base project structure
- [x] Connect database
- [ ] Add User authentication flow
- [ ] Course structure
- [ ] Class structure
- [ ] Class Progress structure
- [ ] Video Upload Flow
- [ ] Watch class flow
