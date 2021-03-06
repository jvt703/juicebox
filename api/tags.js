const express = require('express');
const { getAllTags, getPostsByTagName } = require('../db');

const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");


  next();
});

tagsRouter.get('/', async (req, res) => {
  const tags= await getAllTags()

  res.send({
    tags
  });
});


tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  // read the tagname from the params
  const {tagName} = req.params
  try {
    const allposts = await getPostsByTagName( tagName)
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
    console.log(allposts,"ALLL")
    console.log(req.user[0].id, 'herrrrr')
    const posts =  allposts.filter(
      (post) => {
        return post.active && (req.user && post.author.id === req.user[0].id); 
      }
    )
    console.log(posts,"filtered")
    res.send({posts: posts})
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({ name, message })
  }
});


module.exports = tagsRouter;