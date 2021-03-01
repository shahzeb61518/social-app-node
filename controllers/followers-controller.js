const Followers = require('../models/followers-model');

exports.create = (req, res, next) => {
  const followers = new Followers({
    followerId: req.body.followerId,
    followerName: req.body.followerName,
    followingId: req.body.followingId,
    followingName: req.body.followingName,
  });

  followers.save().then(createdObject => {
    console.log(createdObject);
    res.status(200).json({
      message: "Created successfully",
      followers: createdObject
    });

  }).catch(error => {
    console.log(error)
    res.status(500).json({
      message: "Creation failed!"
    })
  });
}




// Get  
exports.get = (req, res, next) => {
  Followers.find().then(documents => {
    res.status(200).json({
      message: 'Data fetched!!!',
      followersList: documents
    });
  }).catch(error => {
    res.status(500).json({
      message: "Getting data failed!"
    })
  });
}

// Get  By FollowingID
exports.getByFollowingId = (req, res, next) => {
  console.log("req.body.followingId", req.body.followingId)
  Followers.find({ "followingId": req.body.followingId }).then(result => {
    if (!result)
      return res.status(404).json({ status: false, message: 'result  not found.' });
    else
      // console.log(user);
      return res.status(200).json(result);
  });
}

// Get  By FollowerID
exports.getByFollowerId = (req, res, next) => {
  console.log("req.body.followerId", req.body.followerId)
  Followers.find({ "followerId": req.body.followerId }).then(result => {
    if (!result)
      return res.status(404).json({ status: false, message: 'result  not found.' });
    else
      // console.log(user);
      return res.status(200).json(result);
  });
}

// // Delete 
exports.delete = (req, res, next) => {
  Followers.deleteOne({ _id: req.body.id }).then(
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


exports.update = (req, res, next) => {
  // console.log(req.body)
  const followers = new Followers({
    _id: req.body.id,
    followerId: req.body.followerId,
    followerName: req.body.followerName,
    followingId: req.body.followingId,
    followingName: req.body.followingName,
  });
  Followers.updateOne({ _id: req.body.id }, followers)
    .then(result => {
      console.log(result)
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
}
