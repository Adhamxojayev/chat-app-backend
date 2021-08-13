import fs from "fs";
import path from "path";
import jwt from "../lib/jwt.js";
const deleteCon = (req, res) => {
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
      let index = todos.findIndex(
        (val) => val.user_id == userId && val.todo_id == datas.todo_id
      );
      if (index > -1) {
        todos.splice(index, 1);
      } 
      
      fs.writeFileSync(
        path.join(process.cwd(), "src", "database", "todos.json"),
        JSON.stringify(todos, null, 4)
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          status: 204,
          message: "resource deleted successfully"
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
};

export { deleteCon };
