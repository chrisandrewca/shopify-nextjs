### Configuration
Create .\\.env with

BASE_URL=  
SHOPIFY_REDIRECT_URL=  
FOR_SERVER_CODE_COOKIE_DOMAIN=  
FOR_SERVER_CODE_SHOPIFY_API_KEY=  
FOR_SERVER_CODE_SHOPIFY_API_SECRET=  
FOR_SERVER_CODE_JWT_SECRET=  

Create .\\.env.local with

SRDBG=TRUE  

Create 1-click, no-login db at [www.easydb.io](https://www.easydb.io). Put API keys into .\\server\\db.js.

### Run
1. Setup your shopify app in the partner dashboard, you'll need a public facing https url
2. Fill out the configuration
3. `npm install`
4. `npm run dev`