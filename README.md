# With Wings And Roots - Homepage

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

All needed data comes from Wordpress CMS via the WP Rest API.

## Development

First, run the development server:

```bash
yarn dev
```

## Deployment

The GitHub Action will create an image. You can use it via Docker on any server.
```bash
docker run -p 3000:3000 ghcr.io/withwingsandroots/withwingsandroots/withwingsandroots:latest
```

## Environment Variables

The application requires certain environment variables to be set for proper configuration. These variables are managed through GitHub Secrets and Variables. The key environment variables include:  
- `NEXT_PUBLIC_CMS_URL`: The URL of the CMS providing the data.
- `PUBLIC_URL`: The public URL where the application is hosted.


## Technologies Used
- Next.js: A React framework for server-side rendering and static site generation.
- React: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- WordPress CMS: A content management system providing data via the WP Rest API.
- Docker: A platform for developing, shipping, and running applications in containers.
- GitHub Actions: A CI/CD service for automating the build and deployment process.

