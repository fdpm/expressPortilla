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

  const userExist = await userController.findOne({ username });

  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    /* const { _id, firstname, lastname, identification, photo, active } =
      userExist; */
    const token = jwt.sign({ user_id: userExist._id, username }, "tokensecret"/* process.env.TOKENSECRET */, { expiresIn: "2h" } );
    userExist.token = token;
    res.status(200).json(userExist/* {
      _id,
      username,
      firstname,
      lastname,
      identification,
      photo,
      active,
      token,
    } */);
  } 
  else {
    res.status(400).send("invalid credentials");
  }
};

/* exports.index = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
};

exports.update = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) {
      return next(err);
    }
    res.send("User updated successfully");
  });
};

exports.destroy = (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    res.send("User deleted successfully");
  });
};  */