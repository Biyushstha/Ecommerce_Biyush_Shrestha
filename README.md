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
  - `imageUrl`: String  
- `orderDate`: Date
- `name`: String
- `address`: String
- `email`: String
- `cardNumber`: String
- `coupon`: String


### Deployment

Clone Repo:
````
git clone https://github.com/Biyushstha/Ecommerce_Biyush_Shrestha.git
````

Install Client:
````
npm run install-client
````
Install Server:
````
npm run install-server
````
Run Server:
````
npm run start-server
````
Run Client:
````
npm run start-client
````


**Shop URL**: http://localhost:3000/

**Admin URL**: http://localhost:3000/admin/login

Admin Login Credintails
- `username`: admin 
- `password`: admin 

## Functional Testing

### Admin Dashboard

**Log in to the Admin Dashboard**
1. Go to the admin page: [http://localhost:3000/admin](http://localhost:3000/admin)
2. Enter correct email and password.
3. Press the login button.
   - **Expected:** The user is redirected to the Admin Dashboard page.
   - **Result:** The user is redirected to the Admin Dashboard page.

**Add Product**
1. Go to the Admin Dashboard.
2. Press the "Add Product" button.
3. Fill in the form with product details.
4. Press the "Save" button.
   - **Expected:** The product should be added to the database and displayed in the dashboard table.
   - **Result:** The product is added to the database and shown in the dashboard table.

**Edit Product**
1. Press the "Edit" button in the product table on the Admin Dashboard.
2. Change the values in the form.
3. Press the "Save" button.
   - **Expected:** The edited values should be stored in the database and shown in the table.
   - **Result:** The edited values are stored in the database and displayed in the table.

**Delete Product**
1. Press the "Delete" button in the product table on the Admin Dashboard.
   - **Expected:** The product should be deleted from the database and the table.
   - **Result:** The product is deleted from the database and the table.

**Logout from the Admin Dashboard**
1. Press the "Logout" button.
   - **Expected:** The user should be redirected to the login page.
   - **Result:** The user is redirected to the login page.

### Product Pages

**View Detail Button**
1. Go to the product page.
2. Press the "View Detail" button.
   - **Expected:** The user should be redirected to the Product Detail page.
   - **Result:** The user is redirected to the Product Detail page.

**Add to Cart**
1. Go to the Detail Page.
2. Press the "Add to Cart" button.
   - **Expected:** The product should be displayed in the cart table.
   - **Result:** The product is displayed in the cart table.

**Place Order**
1. Go to the Cart page.
2. Click "Place Order."
3. Fill in the form.
4. Press the "Checkout" button.
   - **Expected:** The products should be saved in the database and shown in the My Orders page.
   - **Result:** The products are saved in the database and shown in the My Orders page.

### Category Display

**Display of Products When a Category is Clicked**
1. Go to the homepage.
2. Click on any category on the homepage.
   - **Expected:** The products based on that category should be shown.
   - **Result:** The products based on that category are shown.

### Invalid Scenarios

**Invalid Admin Login Attempt**
1. Go to the admin login page.
2. Enter incorrect credentials.
3. Press the login button.
   - **Expected:** The application should display an error message indicating that the login failed.
   - **Result:** The application displays an error message indicating that the login failed.
