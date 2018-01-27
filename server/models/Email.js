const mongoose = require('mongoose');

const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const EmailSchema = new Schema({
  tourName: String,
  showDate: String,
  vendor: String,
  bundleType: String,
  dateSent: Date,
  recipients: [RecipientSchema],
  _user: { type: Schema.types.ObjectId, ref: 'User' },
});

mongoose.model('emails', EmailSchema);
