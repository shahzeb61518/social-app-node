const Users = require('../models/users-model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create User Account
exports.create = (req, res, next) => {
  let date = new Date();
  date.toString;
  // bcrypt.hash(req.body.userPassword, 10).then(hash => {
  // console.log("dataaaa", req.body)
  let email = req.body.userEmail
  email = email.toLowerCase();
  const users = new Users({
    userRole: req.body.userRole,
    userEmail: email,
    userName: req.body.userName,
    userPassword: req.body.userPassword,
    joinDate: date,
  });
  users.save()
    .then(result => {
      res.status(201).json({
        message: "User created successfully!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Invalid authentication credentials!"
      });
      console.log("error", err)
    });
  // });
}

// User login
exports.login = (req, res, next) => {
  let fetchedUser;
  let email = req.body.userEmail
  email = email.toLowerCase();
  Users.findOne({ userEmail: email })
    .then(user => {
      if (!user) {
        return res.status(200).json({
          message: "Invalid email or password"
        });
      }
      fetchedUser = user;
      // return bcrypt.compare(req.body.userPassword, user.userPassword);
      return req.body.userPassword === user.userPassword
    })
    .then(result => {
      if (!result) {
        return res.status(200).json({
          message: "Invalid email or password"
        });
      }
      console.log("fetchedUser>>>>", fetchedUser)
      const token = jwt.sign(
        {
          userEmail: fetchedUser.userEmail,
          userId: fetchedUser._id,
          namef: fetchedUser.userName,
          role: fetchedUser.userRole,
        },
        "secret_this_should_be_longer",
        { expiresIn: "10h" }
      );
      res.status(200).json({
        token: token,
        role: fetchedUser.userRole,
        expiresIn: 360000,
        userId: fetchedUser._id,
        userName: fetchedUser.userName,
        userEmail: fetchedUser.userEmail,
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}


// Get user 
exports.get = (req, res, next) => {
  Users.find().then(documents => {
    // console.log(documents);
    res.status(200).json({
      message: 'Data fetched!!!',
      usersList: documents
    });
  }).catch(error => {
    res.status(500).json({
      message: "Getting data failed!"
    })
  });
}

// // Delete user
exports.delete = (req, res, next) => {
  Users.deleteOne({ _id: req.body.id }).then(
    result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not deleted!" });
      }
    }
  ).catch(error => {
    res.status(500).json({
      message: "Deletion failed!"
    })
  });
}

//   // Update User
exports.update = (req, res, next) => {
  // console.log(req.body)
  // bcrypt.hash(req.body.userPassword, 10).then(hash => {
  const users = new Users({
    _id: req.body.id,
    userRole: req.body.userRole,
    userEmail: req.body.userEmail,
    userName: req.body.userName,
    userPassword: req.body.userPassword,
  });
  Users.updateOne({ _id: req.body.id }, users)
    .then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({
        message: "No updated!"
      });
    });
  // });
}


// Get User By Id
exports.getById = (req, res, next) => {
  Users.findById(req.body.id).then(user => {
    if (!user)
      return res.status(404).json({ status: false, message: 'User record not found.' });
    else
      // console.log(user);
      return res.status(200).json(user);
  });
}