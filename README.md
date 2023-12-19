# SmallBizSafari Vendor Business App
## CURRENT PROGRESS
## ----------IMPORTANT -------------
- Vendor can create, update and delete products.
- Vendor can see notifications from users after they order
- User can order and notification sends to vendor
- User can view orders on cart page, update and delete orders; all this will be reflected on vendor notification page

## ---TODO---
- Connect sidebar to the various businesses
- Add user orders to cart

## Backend
- Endpoints are all protected and ready to test

## Frontend
- Added user components; only left with geolocation components.
- Finished vendor components.
- To start on connecting frontend and backend; user authentication first. 

### HOW TO RUN FRONTEND: 
- cd main_frontend && npm run dev

## Available frontend routes
- Login; path="/dashboard"
- Logout; path="/"
- Sidebar: Health and Beauty; path="/dashboard/health-and-beauty"
- Top Businesses in Health and Beauty Page; path="/dashboard/top-in-health-and-beauty"
- Business Profile Page; path="/dashboard/biz_profile"
- Account Page; path="/dashboard/account"
- Cart Page (click on cart icon); path="/dashboard/cart-page"

NB: Check App.jsx for other routes
