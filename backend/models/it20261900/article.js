const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({ 
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("", ArticleSchema);
