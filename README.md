Mini-Compete — Frontend (Next.js)

Quick start
1. Copy the 'frontend' folder into apps/frontend (root of your monorepo).
2. Ensure backend is running at http://localhost:3001
3. In apps/frontend run:
   npm install
   npm run dev

Environment
Create .env.local at apps/frontend with:
NEXT_PUBLIC_API_BASE=http://localhost:3001/api
NEXT_PUBLIC_THEME=light

Build & production
npm run build
npm run start

Docker (optional)
- Build image:
  docker build -t mini-compete-frontend:latest .
- Run container (if backend is local, use host networking or proper API URL):
  docker run -p 3000:3000 -e NEXT_PUBLIC_API_BASE=http://host.docker.internal:3001 mini-compete-frontend:latest

Pages included
- / (Home)
- /competitions (list & detail)
- /dashboard (user)
- /auth/login
- /profile

Notes
- Token usage: set Authorization header to "Bearer <token>" for protected endpoints.
- Theme: Light/Dark toggle stored in localStorage as 'theme'.
