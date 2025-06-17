"use client";

import { useEffect, useReducer, useState } from "react";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

type Action =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: string }
  | { type: "REMOVE"; payload: string }
  | { type: "LOAD"; payload: Todo[] };

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "LOAD":
      return action.payload;

    case "ADD":
      return [
        ...state,
        { id: crypto.randomUUID(), title: action.payload, done: false },
      ];

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, done: !todo.done }
          : todo
      );

    case "REMOVE":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
};

export default function ListReducer() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");

  // Carrega tarefas do localStorage ao iniciar
  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      dispatch({ type: "LOAD", payload: JSON.parse(data) });
    }
  }, []);

  // Salva no localStorage quando a lista muda
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: "ADD", payload: input });
      setInput("");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "pending") return !todo.done;
    return true;
  });

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1>To-do List Avançada</h1>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button onClick={handleAdd}>Adicionar</button>
      </div>

      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("pending")}>Pendentes</button>
        <button onClick={() => setFilter("done")}>Concluídas</button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() =>
                dispatch({ type: "TOGGLE", payload: todo.id })
              }
            />
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                marginLeft: 8,
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "REMOVE", payload: todo.id })
              }
              style={{ marginLeft: 12 }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
