const models = require("../api/model.js");
const users = models.users;
const books = models.books;
const bookAuthor = models.bookAuthor;
const orders = models.orders;
const bookDetails = models.bookDetails;

// GET requests

// all routes + description
// idk how to do that lol


// get all users
exports.findUsers = (req, res) => {
    const user = req.query.userName;

    users.getUsers(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving users."
            });
        } else res.send(data);
    });    
};

// get single user (by id)
exports.findUser = (req, res) => {
    users.getUserById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User with id: ${req.params.id} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id: " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// get all books
exports.findBooks = (req, res) => {
    const title = req.query.bookTitle;

    books.getBooks(title, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving books."
            });
        } else res.send(data)
    });
};

// get single book
exports.findBook = (req, res) => {
    books.getBookById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Book with id: ${req.params.id} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving book with id: " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// get book details
exports.findDetails = (req, res) => {
    const details = req.query.bookTitle;

    bookDetails.getAllDetails(details, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving details."
            });
        } else res.send(data);
    });
};

// get orders
exports.findOrders = (req, res) => {
    const order = req.query.orderID;

    orders.getOrders(order, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving orders."
            });
        } else res.send(data);
    });
};


// PUT / PATCH requests

// update user
exports.modifyUser = (req, res) => {
    // validate req
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    console.log(req.body);

    users.updateUser(
        req.params.id,
        new users(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `User with id ${req.params.id} not found.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updaating user with id: " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// update book
exports.modifyBook = (req, res) => {
    // validate req
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    books.updateBook(
        req.params.id,
        new books(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Book with id ${req.params.id} not found.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating book with id: " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// update author
exports.modifyAuthor = (req, res) => {
    // validate req
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    console.log(req.body);

    bookAuthor.updateAuthor(
        req.params.id,
        new bookAuthor(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Author with id ${req.params.id} not found.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating author with id: " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// update order
exports.modifyOrder = (req, res) => {
    // validate req
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    console.log(req.body);

    orders.updateOrder(
        req.params.id,
        new orders(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Order with id ${req.params.id} not found.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating order with id: " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};


// POST requests

// create user
exports.addUser = (req, res) => {
    // validate req
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    // create user
    const user = new user({
        userId: req.body.userID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        userDOB: req.body.userDOB,
        emailAdd: req.body.emailAdd,
        userPass: req.body.userPass,
        profileUrl: req.body.profileUrl
    });

    // save in db
    users.createUser(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred while adding user."
            });
        } else res.send(data);
    });
};

// create book
exports.addBook = (req, res) => {
    // validate req
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    // create book
    const book = new books({
        bookId: req.body.bookID,
        bookTitle: req.body.bookTitle,
        category: req.body.category,
        bookUrl: req.body.bookUrl
    });

    // save in db
    books.createBook(book, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred while adding book."
            });
        } else res.send(data);
    });
};

// create author
exports.addAuthor = (req, res) => {
    // validate req
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    // create author
    const author = new bookAuthor({
        id: req.body.id,
        authorName: req.body.authorName,
        authorSurname: req.body.authorSurname,
        bookID: req.body.bookID
    });

    // save in db
    bookAuthor.createAuthor(author, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred while adding author."
            });
        } else res.send(data);
    });
};

// create order
exports.addOrder = (req, res) => {
    // validate req
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
    }

    // create order
    const order = new orders({
        orderID: req.body.orderID,
        userID: req.body.userID,
        bookID: req.body.bookID,
        orderDate: req.body.orderDate
    });

    // save in db
    orders.createOrder(order, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred while adding author."
            });
        } else res.send(data);
    });
};


// DELETE requests

// delete user
exports.deleteUser = (req, res) => {
    users.removeUser(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User with id: ${req.params.id} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete user with id: " + req.params.id
                });
            }
        } else res.send({
            message: `User ${req.params.id} deleted successfully.`
        });
    });
};

// delete book
exports.deleteBook = (req, res) => {
    books.removeBook(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Book with id: ${req.params.id} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete book with id: " + req.params.id
                });
            }
        } else res.send({
            message: `Book ${req.params.id} deleted successfully.`
        });
    });
};

// delete author
exports.deleteAuthor = (req, res) => {
    bookAuthor.removeAuthor(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Author with id: ${req.params.id} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete author with id: " + req.params.id
                });
            }
        } else res.send({
            message: `Author ${req.params.id} deleted successfully.`
        });
    });
};

// delete order
exports.deleteOrder = (req, res) => {
    orders.removeOrder(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Order with id: ${req.params.id} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete order with id: " + req.params.id
                });
            }
        } else res.send(data);
    });
};