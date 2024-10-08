const { Schema, model, ObjectId} = require('mongoose');

const File = new Schema({
  name: { type: String, unique: true, required: true },
  type: { type: String, required: true},
  accessLink: { type: String},
  size: { type: Number, default: 0},
  path: { type: String, default: ''},
  user: { type: ObjectId, ref: 'User' },
  parent: { type: ObjectId, ref: 'File' },
  children: [{ type: ObjectId, ref: 'File' }],
})

export default model("File", File);