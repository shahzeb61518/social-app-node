var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const Users = require('./routes/users-routes');
const Followers = require('./routes/followers-routes');
const Following = require('./routes/following-routes');
const Blog = require('./routes/blog-routes');
const Comments = require('./routes/comments-routes');


const app = express();


const url ="mongodb+srv://shahzeb:shahzeb123@cluster0.eggx4.mongodb.net/<dbname>?retryWrites=true&w=majority"
//  "mongodb+srv://bcpplatform:timbcpplatform@cluster0.rfhb0.mongodb.net/bcpplatform?retryWrites=true&w=majority"

mongoose.connect(url, (err, db) => {
    if (err) throw console.log('err>>>', err);
    console.log("DB is Connected");
  });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Content-Length,Host,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/users', Users);
app.use('/api/followers', Followers);
app.use('/api/following', Following);
app.use('/api/blog', Blog);
app.use('/api/comments', Comments);


app.use('*',(req,res,next)=>{
    res.status(404).json({ status:404,
        message: 'Page Not Found',
        data: null
    });
})

var port = process.env.PORT || 3000;
var server = app.listen(port, () => console.log(`Node API listening on port ${port}`));
server.setTimeout(500000);