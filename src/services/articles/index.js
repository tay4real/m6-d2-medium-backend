express = require("express");
const ArticleModel = require("./schema");

const articlesRouter = express.Router();

articlesRouter.get("/", async (req, res, next) => {
  try {
    const articles = await ArticleModel.find();
    res.send(articles);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articlesRouter.get("/:id", async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    res.send(article);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articlesRouter.post("/", async (req, res, next) => {
  try {
    const newArticle = new ArticleModel(req.body);

    const { _id } = await newArticle.save();
    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

articlesRouter.put("/:id", async (req, res, next) => {
  try {
    const modifiedArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, new: true }
    );

    if (modifiedArticle) {
      res.send(modifiedArticle);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articlesRouter.delete("/:id", async (req, res, next) => {
  try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);

    if (article) {
      res.send(`Article ${article} deleted`);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = articlesRouter;
