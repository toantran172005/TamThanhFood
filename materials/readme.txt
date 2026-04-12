URI: mongodb+srv://sa:sapassword@tonicluster.clcg9ff.mongodb.net/TamThanhFood?retryWrites=true&w=majority
------------Database Schema-------------
users
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "role": "USER | SELLER | ADMIN",
  "address": "string"
}

restaurants
{
  "_id": "ObjectId",
  "name": "string",
  "address": "string",
  "phone": "string",
  "image": "string",
  "rating": "number",
  "openTime": "string",
  "closeTime": "string"
}

foods
{
  "_id": "ObjectId",
  "restaurantId": "ObjectId",
  "name": "string",
  "description": "string",
  "price": "number",
  "image": "string",
  "category": "string",
  "isAvailable": "boolean"
}

carts
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "items": [
    {
      "foodId": "ObjectId",
      "quantity": "number",
      "price": "number"
    }
  ],
  "updatedAt": "date"
}

orders
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "restaurantId": "ObjectId",
  "items": [
    {
      "foodId": "ObjectId",
      "quantity": "number",
      "price": "number"
    }
  ],
  "subtotal": "number",
  "discount": "number",
  "totalPrice": "number",
  "voucherId": "ObjectId",
  "status": "PENDING | CONFIRMED | DELIVERING | DONE | CANCELED",
  "createdAt": "date"
}

vouchers
{
  "_id": "ObjectId",
  "code": "string",
  "description": "string",
  "discountType": "PERCENT | FIXED",
  "value": "number",
  "minOrder": "number",
  "maxDiscount": "number",
  "expiredAt": "date",
  "isActive": "boolean"
}

reviews
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "restaurantId": "ObjectId",
  "rating": "number",
  "comment": "string",
  "createdAt": "date"
}