const commentServices = require('../services/service.db');
const { ObjectId } = require('mongodb');

async function getComments(req, res) {
  let allComments = await commentServices.findComments()
  res.json(allComments)
}

async function getComment(req, res) {
  if (ObjectId.isValid(req.params.id)) {
    let comment = await commentServices.findComment(req.params.id)
    res.json(comment)
  } else {
    res.status(404).send("Not Found")
  }
}


async function postComments(req, res) {
  const { name, text } = req.body;
  if (!name || !text) {
    res.status(401).send('Bad Request: Missing id or name');
  }
  else{
  const data = new Date();
  commentServices.insertComment({ name, text, data });
  let allComments = await commentServices.findComments()
  res.json(allComments)
  //res.json();
}
}

module.exports = {
  getComments,
  postComments,
  getComment
}