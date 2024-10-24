const { Schema, model, ObjectId } = require('mongoose');

const User = new Schema({
  userName: { type: String, unique: false, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024**3*10},
  usedSpace: { type: Number, default: 0},
  avatar: { type: String },
  file: [{type: ObjectId, ref: 'File'}],
})

module.exports = model("User", User);