# BVC Dashboard Docker Deployment

This document explains how to build and deploy the BVC Dashboard using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) installed (optional but recommended)

## Quick Start

The easiest way to run the BVC Dashboard is using Docker Compose:

```bash
# Build and start the services
docker-compose up -d

# The application will be available at http://localhost:80
```

## Manual Docker Build and Run

If you prefer to build and run the container manually:

```bash
# Build the Docker image
docker build -t bvc-dashboard .

# Run the container
docker run -p 80:80 --name bvc-dashboard -d bvc-dashboard
```

## Environment Configuration

To configure environment variables (like API endpoints):

1. Create a `.env` file in the root directory
2. Add your environment variables (e.g., `REACT_APP_API_URL=http://api.example.com`)
3. Uncomment and modify the environment section in `docker-compose.yml`

## Development Workflow

For development, you can mount your source code into the container:

```bash
docker run -p 80:80 -v $(pwd)/src:/app/src --name bvc-dashboard-dev -d bvc-dashboard
```

## Backend Integration

If you want to run the backend service:

1. Uncomment the backend and database services in `docker-compose.yml`
2. Configure the connection between frontend and backend
3. Run `docker-compose up -d`

## Troubleshooting

- **Container not starting**: Check logs with `docker logs bvc-dashboard`
- **API connection issues**: Verify network settings and environment variables
- **Performance issues**: Adjust Docker resource allocation

## Production Deployment

For production deployment:

1. Consider using environment-specific configurations
2. Set up proper SSL termination (e.g., with a reverse proxy)
3. Configure database backups if using a database
4. Set up proper monitoring

## Customizing Nginx Configuration

The `nginx.conf` file contains the web server configuration. Modify it if you need to:

- Change caching behavior
- Add SSL configuration
- Configure API proxying
- Set up custom headers

After modifying, rebuild the Docker image.

## Container Structure

- `/usr/share/nginx/html`: Contains the built React application
- `/etc/nginx/conf.d/default.conf`: Nginx configuration

## Security Considerations

- Do not expose the database port in production
- Use environment variables for sensitive information
- Consider using Docker secrets for credentials 