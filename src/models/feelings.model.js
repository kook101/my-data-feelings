// feelings-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const feelings = new Schema({
    pain: {
        type: String, // text
        required: true
    },
    pLevel: {
        type: Number, // scale from 0 to 10
        required: true
    },
    rage:{
        type: Number, // scale from 0 to 10
        required: true
    },
    anger:{
        type: Number, // scale from 0 to 10
        required: true
    },
    beAnnoyed:{
        type: Number, // scale from 0 to 10
        required: true
    },
    joy:{
        type: Number, // scale from 0 to 10
        required: true
    },
    harmonious:{
        type: Number, // scale from 0 to 10
        required: true
    },
    calm:{
        type: Number, // scale from 0 to 10
        required: true
    },
    fuzzyBrain:{
        type: Number, // scale from 0 to 10
        required: true
    },
    torpur:{
        type: Number, // scale from 0 to 10
        required: true
    },
    sleepForever:{
        type: Number, // scale from 0 to 10
        required: true
    },

  }, {
    timestamps: true
  });

  return mongooseClient.model('feelings', feelings);
};
