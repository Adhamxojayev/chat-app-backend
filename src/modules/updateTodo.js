import jwt from "../lib/jwt.js"
import fs from 'fs'
import path from 'path'

const updateTodo = (req,res) => {
    try {
        let data = "";
        if (!req.headers.token) throw "The token required";
        let payload = jwt.verify(req.headers.token);
        let { userId } = payload;
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => {
          let todos = fs.readFileSync(
            path.join(process.cwd(), "src", "database", "todos.json")
          );
          todos = todos ? JSON.parse(todos) : [];
          let datas = JSON.parse(data);
          let {todo_text, todo_time} = datas
          let uppTodo = todos.find(
            (val) => val.user_id == userId && val.todo_id == datas.todo_id
          ); 
          if(uppTodo){
              if(todo_text) uppTodo.todo_text = todo_text
              if(todo_time) uppTodo.todo_time = todo_time
          }
          fs.writeFileSync(
            path.join(process.cwd(), "src", "database", "todos.json"),
            JSON.stringify(todos, null, 4)
          );
    
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(
            JSON.stringify({
              status: 201,
              message: "resource updated successfully"
            })
          )
        res.end();
        });
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            status: 500,
            message: err
          })
        );
        return res.end();
      }
}

export {
    updateTodo
}






