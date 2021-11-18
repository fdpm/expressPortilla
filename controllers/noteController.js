const debug = require('debug')('notescrud:controller')
const noteController = require('../models/noteModel')



//Aqui crea la nota pal POST
exports.create = (req, res, next) => {
    //res.send(req.body)
    let note = new noteController ({
        title: req.body.title,
        comment: req.body.comment
    })

        note.save(err =>{
            if(err){
                return next(err)     
            }  
            res.send("Note created successfully")
        });
}


//Aqui trae la info pal GET
exports.index = (req, res, next) => {
    console.log(req.user)
    noteController.find({}, (err, notes) =>{
        if (err) {
            return next(err);
          }
          res.send(notes/* .filter((note) => note.userId == req.user.user_id) */);
    })
}

//Aqui lo actualiza
exports.update = (req, res, next) => {
    noteController.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
      if (err) {
        return next(err);
      }
      res.send("Note updated successfully");
    });
  };

//Aqui lo manda a volar
  exports.destroy = (req, res, next) => {
    noteController.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return next(err);
      }
      res.send("Note deleted successfully");
    });
  };
  
//Aqui lo muestra
  exports.show = (req, res, next) => {
    noteController.findById(req.params.id)
      .then((note) => {
        if (note == null) {
          res.status(404).send({ error: "Note not found" });
        } else {
          res.json(note);
        }
      })
      .catch((error) => {
        debug(error);
        res.status(500).send({ error: error.message });
      });
  };