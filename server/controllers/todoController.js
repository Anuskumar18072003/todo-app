import Todo from "../models/Todo.js";

// find todos for logged in user with newest todo first
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

//create new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });
    const todo = await Todo.create({ title, description, status, owner: req.user.id });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error creating todo" });
  }
};

//update todo by id
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, owner: req.user.id });
    if (!todo) return res.status(404).json({ message: "Not found" });

    Object.assign(todo, req.body);
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

//delete todo by id
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, owner: req.user.id });
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};
