const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//Get /Home
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "nodejs blog",
      description: "simple blog",
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([
      {
        $sort: { createdAt: -1 },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

/**Get Post
 * Post:id
 */

router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "simple blog",
    };

    res.render("post", {
      locals,
      data,
      currentRoute: `/post/${slug}`,
    });
  } catch (error) {
    console.log(error);
  }
});

/*Post 
searchedTerm
*/
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "search",
      description: "simple blog",
    };

    let searchedTerm = req.body.searchTerm;
    const noSpecialChars = searchedTerm.replace(/[^a-zA-Z0-9]/g, "");
    console.log(searchedTerm);

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(noSpecialChars, "i") } },
        { body: { $regex: new RegExp(noSpecialChars, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals,
      currentRoute: "/search",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about", { currentRoute: "/about" });
});
router.get("/contact", (req, res) => {
  res.render("contact", { currentRoute: "/contact" });
});

module.exports = router;

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Introduction to MongoDB",
//       body: "Body of the post",
//     },
//     {
//       title: "Creating RESTful APIs with Node.js and MongoDB",
//       body: "Body of the post",
//     },
//   ]);
// }

// insertPostData();
