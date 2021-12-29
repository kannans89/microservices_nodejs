const express = require('express')
const bodyParse = require('body-parser')
const uuid = require('uuid')
const app = express()
const cors = require('cors')

const posts= {}
app.use(bodyParse.json())
app.use(cors())
app.get('/posts',(req,resp)=>{

  resp.send(posts)
  
});


app.post('/posts',(req,resp)=>{

  const id = uuid.v4() 
  const {title} = req.body
  posts[id] = {id,title}

  resp.status(201).send(posts[id])
});

app.listen(4000,()=>{
    console.log("listening on 4000")
})