const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const cors = require('cors')
const axios = require('axios')

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

  axios.post("http://localhost:4005/event-bus/events",{
    type:'CommentCreated',
    data:{
       commentId,
       content,
       postId:req.params.postId
    }
  }).catch(e=>console.log(e.message))

  resp.status(201).send(comments)
});

app.post("/event-bus/events/handler",(req,resp)=>{
  const {type} = req.body
  console.log("Recievied event :",type)

  resp.send({})


})

app.listen(4001,()=>{
    console.log("listening on 4001")
})