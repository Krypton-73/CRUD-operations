var express = require("express");
var app = express();
var connection = require('./database');

//insert new user
app.post('/user/', (req, res) => {
    let user = req.body;
    let sql = `SET @user_id = ?; SET @name = ?; SET @email = ?;
                CALL UserAddOrEdit(@user_id, @name, @email)`;
    connection.query(sql, [user.id, user.name, user.email], (err, rows) => {
        if (!err) {
            const user = rows.filter((elem) => {
                return elem.constructor == Array;
            });
            res.send('Insert Id : ' + user.id);
        }
        else 
            res.send(err);
    })

});

//insert new post
app.post('/post/', (req, res) => {
    let post = req.body;
    let sql = `SET @post_id = ?; SET @author_id = ?; SET @title = ?; SET @createdAt = ?; SET context = ?;
                CALL PostAddOrEdit(@post_id, @author_id, @title, @createdAt, @context)`;
    connection.query(sql, [post.id, post.author_id, post.title, post.createdAt, post.context], (err, rows) => {
        if (!err) {
            const post = rows.filter((elem) => {
                return elem.constructor == Array;
            });
            res.send('Insert Id : ' + post.id);
        }
        else 
            res.send(err);
    })

});

//get all users
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM USER', (err, rows) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//get employee by id
app.get('/user/:id', (req, res) => {
    connection.query(`select * from user where user_id = ` + req.params.id, (err, rows) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//update user
app.put('/user/', (req, res) => {
    let user = req.body;
    let sql = `SET @user_id = ?; SET @name = ?; SET @email = ?;
    CALL UserAddOrEdit(@user_id, @name, @email)`;
    connection.query(sql, [user.id, user.name, user.email], (err, rows) => {
        if (!err) {
            res.send('Updated Successfully');
        }
        else 
            res.send(err);
    })
});

//delete user
app.delete('user/:id', (req, res) => {
    connection.query('delete from user where user_id=?', [req.params.id], (err, rows) => {
        if (!err)
            res.send('Record deleted successfully.')
        else
            res.send(err);
    })
})


app.listen(3000, () => {
    console.log('App Listening on port 3000');
    connection.connect((err) => {
        if(err) throw err;
        console.log('Database connected!');
    })
});