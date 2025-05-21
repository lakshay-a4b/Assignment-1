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
                "user_id": "john123",
                "password": "password123",
                "email": "test@email.com"
            }

            Response:

            { "message": "User registered successfully" }
            


        Login

            POST /api/users/login

            Request body:

            {
                "user_id": "john123",
                "password": "password123"
            }

            Response:

            { message: "Login successful", token }

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


        Get Cart

            GET /api/cart (token in header)

            Response:
            json
            {
                "cart": [
                    { "productId": 1, "quantity": 2 }
                ]
            }


        Remove from Cart

            DELETE /api/cart/:productId

            Response:
            json
            {
                "message": "Product removed from cart",
                "cart": []
            }

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