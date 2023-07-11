import { useIdentity, useQuery, useSpaces } from "@dxos/react-client";
import React, { useEffect, useState } from "react";

import { Todo } from "./proto";

// Kanban Board:
// 1. Get all of the todos from the space
// 2. Draw the todos in columns: todo, done
// 3. Add a "doing" column / status to the todos data model ***

export const Kanban = () => {
  useIdentity({ login: true });
  const [space] = useSpaces();
  const todos = useQuery<Todo>(space, Todo.filter());
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [doingTodos, setDoingTodos] = useState<Todo[]>([]);
  const [editingTask, setEditingTask] = useState<number | null>(null);

  useEffect(() => {
    setCompletedTodos(todos?.filter((todo) => todo.completed));
    setActiveTodos(
      todos?.filter((todo) => !todo.completed && todo.status !== "doing")
    );
    setDoingTodos(
      todos?.filter((todo) => !todo.completed && todo.status === "doing")
    );
  }, [todos]);

  const handleNewTodo = (status: string) => {
    const todo = new Todo();
    todo.title = "";
    todo.status = status;
    todo.completed = status === "done" ? true : false;
    // setEditingTask();
    space.db.add(todo);
  };

  return (
    <div className="board flex flex-col-2">
      <div className="lane rounded bg-slate-100 py-1 px-2 mr-2 w-[272px]">
        <h1 className="font-semibold mb-2">Todo</h1>
        {activeTodos.map((task, index) => (
          <div
            className={`card text-sm bg-white rounded drop-shadow-sm py-1 px-2 mb-2 min-h-[30px] ${
              editingTask === index ? "border" : ""
            }`}
            onClick={() => setEditingTask(index)}
          >
            {editingTask === index ? (
              <input
                className="w-full outline-none bg-none"
                value={task.title}
                onChange={(e) => {
                  task.title = e.target.value;
                }}
                onBlur={() => {
                  setEditingTask(null);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setEditingTask(null);
                  }
                }}
                autoFocus={editingTask === index}
              />
            ) : (
              task.title
            )}
          </div>
        ))}
        <button
          className="btn btn-primary btn-sm text-sm rounded py-1 px-2 mb-2 hover:bg-white hover:shadow w-full text-left h-[30px]"
          onClick={() => handleNewTodo("todo")}
        >
          + Add Todo
        </button>
      </div>

      <div className="lane rounded bg-slate-100 py-1 px-2 mr-2 w-[272px]">
        <h1 className="font-semibold mb-2">Doing</h1>
        {doingTodos.map((task, index) => (
          <div
            className={`card text-sm bg-white rounded drop-shadow-sm py-1 px-2 mb-2 min-h-[30px] ${
              editingTask === index ? "border" : ""
            }`}
            onClick={() => setEditingTask(index)}
          >
            {editingTask === index ? (
              <input
                className="w-full outline-none bg-none"
                value={task.title}
                onChange={(e) => {
                  task.title = e.target.value;
                }}
                onBlur={() => {
                  setEditingTask(null);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setEditingTask(null);
                  }
                }}
                autoFocus={editingTask === index}
              />
            ) : (
              task.title
            )}
          </div>
        ))}
        <button
          className="btn btn-primary btn-sm text-sm rounded py-1 px-2 mb-2 hover:bg-white hover:shadow w-full text-left h-[30px]"
          onClick={() => handleNewTodo("doing")}
        >
          + Add Todo
        </button>
      </div>
      <div className="lane rounded bg-slate-100 py-1 px-2 w-[272px]">
        <h1 className="font-semibold mb-2">Done</h1>
        {completedTodos.map((task, index) => (
          <div
            className={`card text-sm bg-white rounded drop-shadow-sm py-1 px-2 mb-2 min-h-[30px] ${
              editingTask === index ? "border" : ""
            }`}
            onClick={() => setEditingTask(index)}
          >
            {editingTask === index ? (
              <input
                className="w-full outline-none bg-none"
                value={task.title}
                onChange={(e) => {
                  task.title = e.target.value;
                }}
                onBlur={() => {
                  setEditingTask(null);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setEditingTask(null);
                  }
                }}
                autoFocus={editingTask === index}
              />
            ) : (
              task.title
            )}
          </div>
        ))}
        <button
          className="btn btn-primary btn-sm text-sm rounded py-1 px-2 mb-2 hover:bg-white hover:shadow w-full text-left h-[30px]"
          onClick={() => handleNewTodo("done")}
        >
          + Add Todo
        </button>
      </div>
    </div>
  );
};
