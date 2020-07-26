const express = require("express");
const app = express();
const pool = require("./db");
const catMe = require("cat-me");

app.use(express.json());

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",
            [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;//where
        const { description } = req.body;//set
        const updateToDo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo id = $2",
            [description, id]
        );
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteToDo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo successfully deleted");
    } catch (err) {
        console.error(err.message);
    }
});



app.listen(3000, () => {
    console.log("listening...")
    console.log(catMe("nyan"));
})