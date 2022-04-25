import express, {json} from 'express'
import cors from 'cors'
let usuarios=[]
let tweets=[]



const app=express()
app.use(cors())
app.use(json())

app.post('/sign-up',(req,res)=>{
    const body=req.body
    const novoUsuario={
        username:body.username,
        avatar:body.avatar
    }
    usuarios=[...usuarios,novoUsuario]
    res.send('OK')
})

app.get('/tweets',(req,res)=>{
    let listaUltimos10=[]
    for(let k=tweets.length-1;k>tweets.length-11&&k>=0;k--){
        const avatarDoUsuario =usuarios.find((usuario)=>tweets[k].username==usuario.username).avatar
        listaUltimos10=[...listaUltimos10,{
            username:tweets[k].username,
            avatar:avatarDoUsuario,
            tweet:tweets[k].tweet
        }]
    }
    res.send(listaUltimos10)
})

app.post('/tweets',(req,res)=>{
    const body=req.body
    const novoTweet={
        username:body.username,
        tweet:body.tweet
    }
    tweets=[...tweets,novoTweet]
    res.send('OK')
})


app.listen(5000)
