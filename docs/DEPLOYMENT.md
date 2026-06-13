# Deployment

## Render (Backend)
- Create a Web Service from `/backend`.
- Set environment variables from `.env.example`.
- Provision PostgreSQL and set `DATABASE_URL`.

## Vercel/Netlify (Frontend)
- Build command: `npm run build`
- Publish directory: `dist`
- Set `VITE_API_BASE_URL` and `VITE_SOCKET_URL`.
