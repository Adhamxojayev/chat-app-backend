import http from 'http'
import fs from "fs";
import path from 'path'
import Express from './lib/express.js'
import { PORT, host } from './config.js'
import { REGISTER, LOGIN } from './modules/controller.js';
import { TODO } from './modules/todoController.js';
import { deleteCon } from './modules/deleteCon.js';
import { postTodo } from './modules/postTodo.js';
import { updateTodo } from './modules/updateTodo.js';


const server = http.createServer((req,res) => {
    res.setHeader('Access-Control-Allow-Origin','https://chat-client-ap.herokuapp.com');
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, token')
    if(req.method == 'OPTIONS') return res.end()
    const app = new Express(req,res)

    app.post('/register', REGISTER)
    app.post('/login', LOGIN)
    app.get('/todos', TODO)
    app.delete('/todos', deleteCon)
    app.post('/todos', postTodo)
    app.put('/todos', updateTodo)
})

 
server.listen(PORT, () => console.log('Server is running http://'+ host + ':' + PORT))






