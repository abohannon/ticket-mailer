const mongoose = require('mongoose');

const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const emailSchema = new Schema({
  tourName: String,
  showDate: String,
  vendor: String,
  bundleType: String,
  dateSent: Date,
  recipients: [RecipientSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('emails', emailSchema);
