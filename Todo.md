- Furiono project, a E-commerce for furniture
# Preparing
- use Figma MCP for converting design into code (just some of it)
    - TODO: I need to provide my figma api to mcpm
- need to integrate MCPs in aider
- look for how to give aider a really only file to know what are the practices of the project
- using bun for  running react router with vs using it with ssr React router
- Prepare code for the express structure
- Add the brave search mcp or equivalent for the search support as we are using latest tech
# Tech stack

## Frontend
- React 19
- React router 7 with SSR
- contextApi
- react scan
- shadcn and taiwlind
- Fusion plugin for RR7 ?
- Knip Plugin statically typed routes
- Umi.js Plugin RR7 conventions?
- vite-plugin-next-react-router: Provides folder routes like next?
## Backend
- express 5 (with dto and good ts structure)
- sqlite
- stripe alternative :)
## Shared
- Gemini 2.0 flash for fast, not necessarily good code. 
- `zod` (how to share a schema between back and Frontend)
- Dependency Injection
- `biome` linter and `formatter`
- ts 7 with (go rewrite)
- Prisma
- vitest
- auth js
    - can i use it with in the Backend not just the Frontend
    - is it a good idea to just use it in  one of them
    - do i just use Auth in the back with minimal validation on the front
# Side
- compare solutions and ideas between gpt and gemini
- use aider for basic things, not for big chunks of code or huge rewrites
- compare bun vs node , as bun started supporting express, doest support remix though?

