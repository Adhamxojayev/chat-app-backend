import fs from "fs";
import path from "path";
import jwt from "../lib/jwt.js";

const postTodo = (req,res) => {
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
          data = JSON.parse(data);
          let obj = {
              user_id: userId,
              todo_text: data.todo_text,
              todo_id: todos.length ? todos[todos.length-1].todo_id +1 : 1,
              todo_time: data.todo_time,
              username : data.username
             }
          todos.push(obj)
          fs.writeFileSync(
            path.join(process.cwd(), "src", "database", "todos.json"),
            JSON.stringify(todos, null, 4)
          );
        
          res.writeHead(201, { "Content-Type": "application/json" });
          res.write(
            JSON.stringify({
              status: 201,
              message: "data successfully",
              data: obj
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
    postTodo
}