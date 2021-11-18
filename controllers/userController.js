const debug = require("debug")("userscrud:user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = require("../models/userModel");

exports.create = async (req, res, next) => {
  const userExist = await userController.findOne({identification: req.body.identification})

  if (userExist) {
    return res.status("409").send("User already exist")  }

  let encryptedPassword = await bcrypt.hash(req.body.password, 10)

  let user = new userController({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    identification: req.body.identification,
    password: encryptedPassword,
    photo: req.body.photo,
    active: req.body.active,
  })

  user.save((err) => {
    if (err) {
      return next(err)
    }
    res.send("User registered successfully")
  })
}

 exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Username and password are required");
  }

  const theUser = await userController.findOne({ username });

  if (theUser && (await bcrypt.compare(password, theUser.password))) {
    
    const token = jwt.sign({ user_id: theUser._id, username }, process.env.TOKENSECRET, { expiresIn: "2h" } );
    theUser.token = token;
    res.status(200).json({"token":token});
  } 
  else {
    res.status(400).send("invalid credentials");
  }
};

exports.index = (req, res, next) => {
  userController.find({}, (err, users) => {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
};

exports.update = (req, res, next) => {
  userController.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) {
      return next(err);
    }
    res.send("User updated successfully");
  });
};

exports.destroy = (req, res, next) => {
  userController.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    res.send("User deleted successfully");
  });
}; 