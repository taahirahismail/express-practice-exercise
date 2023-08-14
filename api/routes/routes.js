const express = require('express');
const router = express.Router();
const controller = require("../controller.js");

// define routes

module.exports = app => {
    // GET / - home page displaying all routes
    router.get('/', );
    
    // GET /users - display list of users
    router.get('/users', controller.findUsers);
    
    // GET /user/:id - display a single user
    router.get('/user/:id', controller.findUser);
    
    // PUT /user/:id - update user's record
    router.put('/user/:id', controller.modifyUser);
    
    // PATCH /user/:id - modify a user's record - same as PUT ?
    // router.patch('/user/:id', );
    
    // POST /register - register a new user
    router.post('/register', controller.addUser);
    
    // DELETE /user/:id - delete a single user
    router.delete('/user/:id', controller.deleteUser);
    
    // POST /book - add a new book
    router.post('/book', controller.addBook);
    
    // GET /books - display list of books
    router.get('/books', controller.findBooks);
    
    // GET /book/:id - display a single book
    router.get('/book/:id', controller.findBook);
    
    // PUT /book/:id - update a book
    router.put('/book/:id', controller.modifyBook);
    
    // PATCH /book/:id - modify a book
    // router.patch('/book/:id', ); - same as PUT ?
    
    // DELETE /book/:id - delete a single book
    router.delete('/book/:id', controller.deleteBook);
    
    // POST /bookAuthor - add a book author's details
    router.post('/bookAuthor', controller.addAuthor);
    
    // GET /bookDetails - display a list of books and authors (avoid duplicates)
    router.get('/bookDetails', controller.findDetails);
    
    // PUT /bookAuthor/:id - update book author details
    router.put('/bookAuthor/:id', controller.modifyAuthor);
    
    // PATCH /bookAuthor/:id - modify book author details
    // router.patch('/bookAuthor/:id', ); - same as PUT ?
    
    // DELETE /bookAuthor/:id - remove book author details
    router.delete('/bookAuthor/:id', controller.deleteAuthor);
    
    // POST /order/:userID/:bookID - add to cart
    router.post('/order/:userID/:bookID', controller.addOrder);
    
    // PUT /order/:userID/:bookID - update order details
    router.put('/order/:userID/:bookID', controller.modifyOrder);
    
    // PATCH /order/:userID/:bookID - modify order details
    // router.patch('/order/:userID/:bookID', ); - same as PUT ?
    
    // DELETE /order/:userID/:bookID - delete a user's order details
    router.delete('/order/:userID/:bookID', controller.deleteOrder);
    
    // GET /checkout/:userID/:bookID - display a list of users with the products they want to buy
    router.get('/checkout/:userID/:bookID', controller.findOrders);

    app.use('/api/stuff', router);
}

// module.exports = router;