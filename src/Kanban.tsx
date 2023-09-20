import React, { useState } from "react";

import { Task } from "./proto";

// Kanban Board:
// 1. Get all of the todos from the space
// 2. Draw the todos in columns: todo, done
// 3. Add a "doing" column / status to the todos data model ***

export type KanbanProps = {
  activeTasks?: Task[];
  doingTasks?: Task[];
  completedTasks?: Task[];
  // onInviteClick?: () => any;
  onTaskCreate?: (text: string) => any;
  // onTaskRemove?: (task: Task) => any;
  onTaskTitleChange?: (task: Task, newTitle: string) => any;
  // onTaskCheck?: (task: Task, checked: boolean) => any;
};

export const Kanban = (props: KanbanProps) => {
  const {
    activeTasks,
    doingTasks,
    completedTasks,
    onTaskCreate,
    onTaskTitleChange,
    // onTaskCheck,
  } = props;

  // const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  // const [showDeleteTask, setShowDeleteTask] = useState<number | null>(null);

  return (
    <div className="board flex flex-col-2">
      <div className="lane rounded bg-slate-100 py-1 px-2 mr-2 w-[272px]">
        <h1 className="font-semibold mb-2">Todo</h1>
        {activeTasks.map((task, index) => (
          <div
            className={`card text-sm bg-white rounded drop-shadow-sm py-1 px-2 mb-2 min-h-[30px] ${
              editingTask === task.id ? "border" : ""
            }`}
            onClick={() => setEditingTask(task.id)}
            key={task.id}
          >
            {editingTask === task.id ? (
              <input
                className="w-full outline-none bg-none"
                value={task.title}
                onChange={(e) => {
                  onTaskTitleChange(task, e.target.value);
                }}
                onBlur={() => {
                  setEditingTask(null);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setEditingTask(null);
                  }
                }}
                autoFocus={editingTask === task.id}
              />
            ) : (
              task.title
            )}
          </div>
        ))}
        <button
          className="btn btn-primary btn-sm text-sm rounded py-1 px-2 mb-2 hover:bg-white hover:shadow w-full text-left h-[30px]"
          onClick={() => onTaskCreate("todo")}
        >
          + Add Todo
        </button>
      </div>

      <div className="lane rounded bg-slate-100 py-1 px-2 mr-2 w-[272px]">
        <h1 className="font-semibold mb-2">Doing</h1>
        {doingTasks.map((task, index) => (
          <div
            className={`card text-sm bg-white rounded drop-shadow-sm py-1 px-2 mb-2 min-h-[30px] ${
              editingTask === task.id ? "border" : ""
            }`}
            onClick={() => setEditingTask(task.id)}
            key={task.id}
          >
            {editingTask === task.id ? (
              <input
                className="w-full outline-none bg-none"
                value={task.title}
                onChange={(e) => {
                  onTaskTitleChange(task, e.target.value);
                }}
                onBlur={() => {
                  setEditingTask(null);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setEditingTask(null);
                  }
                }}
                autoFocus={editingTask === task.id}
              />
            ) : (
              task.title
            )}
          </div>
        ))}
        <button
          className="btn btn-primary btn-sm text-sm rounded py-1 px-2 mb-2 hover:bg-white hover:shadow w-full text-left h-[30px]"
          onClick={() => onTaskCreate("doing")}
        >
          + Add Todo
        </button>
      </div>
      <div className="lane rounded bg-slate-100 py-1 px-2 w-[272px]">
        <h1 className="font-semibold mb-2">Done</h1>
        {completedTasks.map((task, index) => (
          <div
            className={`card text-sm bg-white rounded drop-shadow-sm py-1 px-2 mb-2 min-h-[30px] ${
              editingTask === task.id ? "border" : ""
            }`}
            onClick={() => setEditingTask(task.id)}
            key={task.id}
          >
            {editingTask === task.id ? (
              <input
                className="w-full outline-none bg-none"
                value={task.title}
                onChange={(e) => {
                  onTaskTitleChange(task, e.target.value);
                }}
                onBlur={() => {
                  setEditingTask(null);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setEditingTask(null);
                  }
                }}
                autoFocus={editingTask === task.id}
              />
            ) : (
              task.title
            )}
          </div>
        ))}
        <button
          className="btn btn-primary btn-sm text-sm rounded py-1 px-2 mb-2 hover:bg-white hover:shadow w-full text-left h-[30px]"
          onClick={() => onTaskCreate("done")}
        >
          + Add Todo
        </button>
      </div>
    </div>
  );
};
