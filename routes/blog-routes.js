const express = require('express');
const router = express.Router();
const Controller = require('../controllers/blog-controller');

// Create 
router.post('/create', Controller.create);

// get
router.post('/get', Controller.get);

// update
router.post('/update', Controller.update);

// delete
router.post('/delete', Controller.delete);
// router.post('/delete', checkAuth, Controller.delete);

module.exports = router;
