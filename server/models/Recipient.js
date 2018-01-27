const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  first: String,
  fullName: String,
  orderNum: String,
  quantity: Number,
  opened: { type: Boolean, default: false },
});

module.exports = recipientSchema;
