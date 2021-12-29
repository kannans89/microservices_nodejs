const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const postsIdAndComments = {} 
app.get('/posts/:postId/comments',(req,resp)=>{
   resp.send(postsIdAndComments[req.params.postId]||[])

});

app.post('/posts/:postId/comments',(req,resp)=>{
  const commentId = uuid.v4()
  const {content} = req.body
  const comments = postsIdAndComments[req.params.postId]||[]
  comments.push({commentId,content})
  postsIdAndComments[req.params.postId] = comments
  resp.status(201).send(comments)
});

app.listen(4001,()=>{
    console.log("listening on 4001")
})