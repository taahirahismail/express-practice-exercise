const sql = require('./static/db.js');

const users = function(users) {
    this.userID = users.userID,
    this.firstName = users.firstName,
    this.lastName = users.lastName,
    this.gender = users.gender,
    this.userDOB = users.userDOB,
    this.emailAdd = users.emailAdd,
    this.userPass = users.userPass,
    this.profileUrl = users.profileUrl
}

const books = function(books) {
    this.bookID = books.bookID,
    this.bookTitle = books.bookTitle,
    this.category = books.category,
    this.bookUrl = books.bookUrl
}

const bookAuthor = function(bookAuthor) {
    this.id = bookAuthor.id,
    this.authorName = bookAuthor.authorName,
    this.authorSurname = bookAuthor.authorSurname,
    this.bookID = bookAuthor.bookID
}

const orders = function(orders) {
    this.orderID = orders.orderID,
    this.userID = orders.userID,
    this.bookID = orders.bookID,
    this.orderDate = orders.orderDate
}

// GET requests - fetching the users, books and orders

// get all users
users.getUsers = (user, result) => {
    let query = "SELECT * FROM users";

    if (user) {
        query += ` WHERE firstName LIKE '%${user}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('Users: ', res);
        result(null, res);
    });
};

// get user by id
users.getUserById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE userID = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("user found: ", res[0]);
            result(null, res[0]);
            return;
        }

        // user with specified id not found
        result({kind: "not_found"}, null);
    });
};

// get all books
books.getBooks = (book, result) => {
    let query = "SELECT * FROM books";

    if (book) {
        query += ` WHERE bookTitle LIKE '%${book}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Books: ", res);
        result(null, res);
    });
};

// get single book (by id)
books.getBookById = (id, result) => {
    sql.query(`SELECT * FROM books WHERE bookID = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Book found: ", res[0]);
            result(null, res[0]);
            return;
        }

        // book with specified id not found
        result({kind: "not_found"}, null);
    });
};

// get all books with details (author names - no duplications)
const bookDetails = sql.query('SELECT b.bookID, b.bookTitle, a.authorName, a.authorSurname FROM books b INNER JOIN bookAuthor a ON b.bookID = a.bookID');

bookDetails.getAllDetails = (book, author, result) => {
    let query = "SELECT * FROM bookDetails";

    if (book) {
        query += ` WHERE bookTitle LIKE '%${book}%'`
    }
    
    if (author) {
        query += ` WHERE authorName LIKE '%${author}%'`
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Book Details: ", res);
        result(null, res);
    });
};

// users and products they want to buy
orders.getOrders = (order, result) => {
    let query = "SELECT * FROM orders";

    if (order) {
        query += ` WHERE orderID '%${order}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Orders: ", res);
        result(null, res);
    });
}


// PUT and PATCH requests - update and modify users, books, authors

// update user details
users.updateUser = (id, user, result) => {
    sql.query("UPDATE users SET firstName = ?, lastName = ?, gender = ?, userDOB = ?, emailAdd = ?, userPass = ?, profileUrl = ? WHERE userID = ?", [user.firstName, user.lastName, user.gender, user.userDOB, user.profileUrl, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // user with specified id not found
            result({kind: "not_found"}, null);
            return;
        }

        console.log("User updated: ", {id: id, ...user});
        result(null, {id: id, ...user});
    });
};

// update book details
books.updateBook = (id, book, result) => {
    sql.query("UPDATE books SET bookTitle = ?, category = ?, bookUrl = ? WHERE bookID = ?", [book.bookTitle, book.category, book.bookUrl, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // book with specified id not found
            result({kind: "not_found"}, null);
            return;
        }

        console.log("Book updated: ", {id: id, ...book});
        result(null, {id: id, ...book});
    });
}

// update author details
bookAuthor.updateAuthor = (id, author, result) => {
    sql.query("UPDATE bookAuthor SET authorName = ?, authorSurname = ? WHERE id = ?", [author.authorName, author.authorSurname, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // author with specified id not found
            result({kind: "not_found"}, null);
            return;
        }

        console.log("Author updated: ", {id: id, ...author});
        result({id: id, ...author});
    });
}

// update order details
orders.updateOrder = (id, order, result) => {
    sql.query("UPDATE orders SET bookID = ?, orderDate = ? where orderID = ?", [order.bookID, order.orderDate, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // order with specified id not found
            result({kind: "not_found"}, null);
            return;
        }

        console.log("Order updated: ", {id: id, ...order});
        result(null, {id: id, ...order});
    });
};


// POST requests - add user, add book, add to cart **CHECK THIS KAK BECAUSE I THINK IT'S WRONG!!!!!!!!!!

// register a new user
users.createUser = (newUser, result) => {
    sql.query("INSERT INTO users VALUES ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("User created: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
}

// add new book
books.createBook = (newBook, result) => {
    sql.query("INSERT INTO books VALUES ?", newBook, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Book added: ", {id: res.insertId, ...newBook});
        result(null, {id: res.insertId, ...newBook});
    });
}

// add new author
bookAuthor.createAuthor = (newAuthor, result) => {
    sql.query("INSERT INTO bookAuthor VALUES ?", newAuthor, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Author added: ", {id: res.insertId, ...newAuthor});
        result(null, {id: res.insertId, ...newAuthor});
    });
}

// add to cart
orders.createOrder = (newOrder, result) => {
    sql.query("INSERT INTO orders VALUES ?", newOrder, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Order logged: ", {id: res.insertId, ...newOrder});
        result(null, {id: res.insertId, ...newOrder});
    });
};


// DELETE requests - single user, book, author, delete from cart

// delete user from users list
users.removeUser = (id, result) => {
    sql.query("DELETE FROM users WHERE userID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // user with specified id not found
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`User with id ${id} deleted.`);
        result(null, res);
    });
}

// remove book from books list
books.removeBook = (id, result) => {
    sql.query("DELETE FROM books WHERE bookID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // user with specified id not found
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`Book with id ${id} deleted.`);
        result(null, res);
    });
}

// delete author from authors list
bookAuthor.removeAuthor = (id, result) => {
    sql.query("DELETE FROM bookAuthor WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // user with specified id not found
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`Author with id ${id} deleted.`);
        result(null, res);
    });
}

// delete from order (update order details)
orders.removeOrder = (id, result) => {
    sql.query("DELETE FROM orders WHERE orderID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // order with specified id not found
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`Order with id: ${id} deleted.`);
        result(null, res);
    });
};

module.exports = {
    users,
    books,
    bookAuthor,
    bookDetails,
    orders
};