Tech Stack

- Node.js + Express.js
- JWT for authentication
- In-memory data structures (mock DB)

---

Authentication

Use HTTP header: `Authorization: Bearer <token>` for protected routes.

---

API Documentation

    User APIs
        Register
            POST /api/users/signup
            Request body:
            {
                "userID": "john123",
                "password": "password123",
                "email": "test@email.com"
            }

            Response:
            { "message": "User registered successfully" }
<img width="1061" alt="Screenshot 2025-05-21 at 5 38 49 PM" src="https://github.com/user-attachments/assets/3c0a78bf-e0bd-418c-8464-8945e83cf8a5" />


            
            


        Login

            POST /api/users/login

            Request body:

            {
                "userID": "john123",
                "password": "password123"
            }

            Response:

            { message: "Login successful", token }

<img width="827" alt="Screenshot 2025-05-21 at 5 42 11 PM" src="https://github.com/user-attachments/assets/e9677f96-d531-47e4-a3f2-b75b2b7ebd59" />


---

    Product APIs

        Get all products (paginated)

            GET /api/products?page=1&limit=2

            Response:

            {
                "products": [
                    {
                        "id": 1,
                        "name": "iPhone 14",
                        "imageURL": "https://iplanet.one/cdn/shop/files/iPhone_14_Purple_PDP_Image_Position-1A__WWEN.jpg?v=1691142418&width=823",
                        "description": "Apple smartphone",
                        "price": 999.99
                    },
                    {
                        "id": 2,
                        "name": "Samsung Galaxy S23",
                        "imageURL": "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s921bzvbins/gallery/in-galaxy-s24-492654-492654-sm-s921bzvbins-541169493?imbypass=true",
                        "description": "Samsung flagship",
                        "price": 899.99
                    }
                ],
                "total": 3,
                "page": 1,
                "limit": 2
            }

<img width="815" alt="Screenshot 2025-05-21 at 5 43 40 PM" src="https://github.com/user-attachments/assets/eb05f66d-0c92-41a9-bdff-a25a15cdb12d" />



        Get product by ID

            GET /api/products/:id

            Response:
            
            {
                "id": 3,
                "name": "OnePlus 11",
                "imageURL": "https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg",
                "idescription": "OnePlus flagship",
                "price": 749.99
            }
<img width="831" alt="Screenshot 2025-05-21 at 5 46 13 PM" src="https://github.com/user-attachments/assets/10a19dcf-ea3e-4a6b-b787-73c526692705" />



---

    Cart APIs

        Add to Cart

            POST /api/cart/add (token in header)

            Request body:

            {
                "productId": 1,
                "quantity": 2
            }

            Response:

            {
                "message": "Product added to cart",
                "cart": [
                    { "productId": 1, "quantity": 2 }
                ]
            }

<img width="827" alt="Screenshot 2025-05-21 at 5 46 54 PM" src="https://github.com/user-attachments/assets/5d4dd90c-aa12-488a-ac45-3f022bc38f32" />





        Get Cart

            GET /api/cart (token in header)

            Response:
            json
            {
                "cart": [
                    { "productId": 1, "quantity": 2 }
                ]
            }

<img width="823" alt="Screenshot 2025-05-21 at 5 47 49 PM" src="https://github.com/user-attachments/assets/caf73377-5dc6-4609-aa01-0d8c927be1a5" />


            


        Remove from Cart

            DELETE /api/cart/:productId

            Response:
            json
            {
                "message": "Product removed from cart",
                "cart": []
            }
<img width="827" alt="Screenshot 2025-05-21 at 5 48 45 PM" src="https://github.com/user-attachments/assets/0464103c-5bc3-4938-9e0c-a8d0633b9974" />





---

    Order APIs

        Create Order (mock payment function always return success)

            POST /api/orders/create

            Response:
            
            {
                "message": "Order created successfully",
                "order": {
                    "id": 2,
                    "userId": "john123",
                    "items": [
                        {
                            "productId": 1,
                            "name": "iPhone 14",
                            "image": "https://iplanet.one/cdn/shop/files/iPhone_14_Purple_PDP_Image_Position-1A__WWEN.jpg?v=1691142418&width=823",
                            "price": 999.99,
                            "quantity": 1
                        }
                    ],
                    "totalAmount": 999.99,
                    "status": "Payment Success",
                    "transactionId": "txn_1747829949348",
                    "createdAt": "2025-05-21T12:19:09.349Z"
                }
            }
<img width="829" alt="Screenshot 2025-05-21 at 5 49 16 PM" src="https://github.com/user-attachments/assets/c42bd616-b427-4fad-9efb-7b44a835d94c" />




            


            Get User Orders (paginated)

                GET /api/orders?page=1&limit=2

                Response:
                
                {
                    "orders": [
                        {
                            "id": 1,
                            "userId": "john123",
                            "items": [
                                {
                                    "productId": 1,
                                    "name": "iPhone 14",
                                    "image": "https://iplanet.one/cdn/shop/files/iPhone_14_Purple_PDP_Image_Position-1A__WWEN.jpg?v=1691142418&width=823",
                                    "price": 999.99,
                                    "quantity": 6
                                }
                            ],
                            "totalAmount": 5999.9400000000005,
                            "status": "Payment Success",
                            "transactionId": "txn_1747828682565",
                            "createdAt": "2025-05-21T11:58:02.565Z"
                        },
                        {
                            "id": 2,
                            "userId": "john123",
                            "items": [
                                {
                                    "productId": 1,
                                    "name": "iPhone 14",
                                    "image": "https://iplanet.one/cdn/shop/files/iPhone_14_Purple_PDP_Image_Position-1A__WWEN.jpg?v=1691142418&width=823",
                                    "price": 999.99,
                                    "quantity": 1
                                }
                            ],
                            "totalAmount": 999.99,
                            "status": "Payment Success",
                            "transactionId": "txn_1747829949348",
                            "createdAt": "2025-05-21T12:19:09.349Z"
                        }
                    ],
                    "total": 2,
                    "page": 1,
                    "limit": 2
                }
<img width="1057" alt="Screenshot 2025-05-21 at 5 50 10 PM" src="https://github.com/user-attachments/assets/7030124c-89b8-4c20-85a9-f4e6131443ed" />
