const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const  axios  = require('axios')

const app = express()
app.use(bodyparser.json())
app.use(cors())

const posts = {}
/*
    1:{
         id :1,
         title:
         comments:[{id:,cotent:}]
    }
*/
app.get('/posts',(req,resp)=>{
      resp.send(posts)

});

const handleEvent = (type,data)=>{
     if(type== "PostCreated"){
          const {id,title}=data;
          posts[id] = {id,title,comments:[]};
  
        }
  
        if(type=="CommentCreated"){
             const {commentId,content,postId} = data;
           //  console.log(data)
             const post = posts[postId];
             post.comments.push({commentId,content})
        }
  
}
app.post("/event-bus/events/handler",(req,resp)=>{

      const {type,data} = req.body;
      handleEvent(type,data)
    // console.log(posts)
     resp.status(200).send({})
});

app.listen(4002,async ()=>{
    console.log("listing in port 4002")
    const resp = await axios.get("http://localhost:4005/events")
     const events = resp.data; 
     for(let event of events){
          console.log("processing event ",event.type)
          handleEvent(event.type,event.data)
     }
});