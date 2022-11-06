const express=require('express')
const fs=require('fs')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser())
var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch');

app.use('/login',(req,res,next)=>{
     res.send(
     `<form  onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action='user-name' method='post'>
     <h3>user name<h3>
     <input type='text' id='username 'name='userName'/>
     <button type='submit'>submit</button>
     </form>`
     )
})
let count=0

app.post('/user-name',(req,res,next)=>{
     count+=1
     let username=`username${count}`
     const a=req.body
     localStorage.setItem(`${username}`,a["userName"])
     console.log(count)
     res.redirect('/show')
     console.log(count)
})
let txt;
app.use('/show',(req,res,next)=>{
     txt=fs.readFileSync("message.txt","utf8")
     res.send(`
     <form action='save-message' method='post'>
     <p>${txt}<p>
     <input type='text' name='message'>
     <button type='submit'>send</button>
     </form>`)
})

app.post('/save-message',(req,res,next)=>{
     let name=localStorage.getItem('username')
     console.log(name)
     const b=req.body
     console.log(b['message'])
     let ans=`${name}:${b['message']}`
     ans+=txt
      fs.writeFileSync('message.txt',ans)
      res.redirect('/show')
})


app.use((req,res,next)=>{
     res.status(404).send('<h1>page not found</h1>')
})

app.listen(3000)