const mongoose = require('mongoose')

const Schema = mongoose.Schema

let noteSchema = Schema({
    title: { type: String, required: true, max: 100 },
    comment: { type: String, required: true }
    /* userId: { type: String }, */
  });
  
module.exports = mongoose.model("noteModel", noteSchema);