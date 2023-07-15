import fastify from "fastify";
const PORT = 3333

const app = fastify()

app.get('/hello',(req, res)=>{

    return res.send({message: 'Hello world'})
})

app.listen({
    port: PORT,

}, ()=>console.log('😎 Server running in PORT ' + PORT + ' 😎'))