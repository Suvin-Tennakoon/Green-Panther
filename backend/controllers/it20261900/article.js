const ArticleModel = require("../../models/it20261900/article");

const createArticle = async (req, res, next) => {
  console.log(req.body);
  try {
    const { title, image, description, category, } = req.body;

    const newArticle = new ArticleModel({
        title, image, description, category,
    });

    await newArticle.save();

    res.status(201).json({
      message: "Article Created Successfully",
      article: newArticle,
    });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err });
  }
};

const getAllArticles = async (req, res, next) => {
  try {
    const allArticle = await ArticleModel.find();
    res.status(200).json({
      message: "All Articles",
      article: allArticle,
    });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err });
  }
};

const getSingleArticle = async (req, res, next) => {
  try {
    const singleArticle = await ArticleModel.findById(
      req.params.id
    );
    res.status(200).json({
      message: "Single Article",
      article: singleArticle,
    });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err });
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const { title, image, description, category, } = req.body;

    const updatedArticle =
      await ArticleModel.findByIdAndUpdate(
        req.params.id,
        {
            title, image, description, category,
        },
        { new: true }
      );
    res.status(200).json({
      message: "Article Updated Successfully",
      article: updatedArticle,
    });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err });
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const deletedArticle =
      await ArticleModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Article Deleted Successfully",
      article: deletedArticle,
    });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err });
  }
};

const getArticleByCategory = (req, res) => {
  ArticleModel
    .find({ category: req.params.category })
    .then((ArticleModel) => {
      res.json(ArticleModel);
    })
    .catch((err) => {
      res.json(err);
    });
};


module.exports = {
    createArticle,
    getAllArticles,
    getSingleArticle,
    updateArticle,
    deleteArticle,
    getArticleByCategory,
};
