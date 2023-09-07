import fastify from 'fastify'


export const app = fastify()


app.get('/hello', (req, res)=>{
    res.send('Hello World!')
})


app.listen({
    host:'0.0.0.0',
    port: 3333
}).then(()=>{
    console.log("Server initialized 🏃💨")
})