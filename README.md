# ECommerce_Biyush

**Student Name**: Biyush Lal Shrestha
**Student Number**: 8966938
**Date**: 19/07/2024

### Technology Stack

**Frontend**: ReactJS  
**Backend**: Node.js with Express  
**Database**: MongoDB (Atlas)


### Database Schema Design

**Products Schema (MongoDB)**

- `name`: String
- `description`: String
- `price`: Number
- `category`: String
- `stock`: Number
- `imageUrl`: String

**Order Schema (MongoDB)**
- `user_id`: UUID
- `status`: String
- `items`: Array of objects containing:
  - `product_id`: String
  - `quantity`: Number
- `totalAmount`: Number
- `orderDate`: Date


### Deployment

Clone Repo:
````
git clone https://github.com/Biyushstha/Ecommerce_Biyush_Shrestha.git
````





