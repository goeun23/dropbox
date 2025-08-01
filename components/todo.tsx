"use client"

import { Checkbox, IconButton, Spinner } from "@material-tailwind/react"
import { updateTodo, deleteTodo } from "actions/todo-actions"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { queryClient } from "config/ReactQueryClientProvider"

export default function Todo({ todo }) {
  // 서버에서 받아온 값이 있다면, 기본 값을 서버에서 받아온 값으로 세팅
  const [isEditing, setIsEditing] = useState(false)
  const [completed, setCompleted] = useState(todo.completed)
  const [title, setTitle] = useState(todo.title)

  const updateTodoMutation = useMutation({
    mutationFn: () =>
      updateTodo({
        id: todo.id,
        title,
        completed,
      }),
    onSuccess: () => {
      setIsEditing(false)
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      })
    },
  })
  return (
    <div className="w-full flex items-center gap-1">
      <Checkbox
        checked={completed}
        onChange={async (e) => {
          await updateTodoMutation.mutate()
          await setCompleted(e.target.checked)
        }}
      />

      {isEditing ? (
        <input
          className="flex-1 border-b-black border-b pb-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <p className={`flex-1 ${completed && "line-through"}`}>{title}</p>
      )}

      {isEditing ? (
        <IconButton
          onClick={async () => {
            await updateTodoMutation.mutate()
          }}
        >
          {updateTodoMutation.isPending ? (
            <Spinner />
          ) : (
            <i className="fas fa-check" />
          )}
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen" />
        </IconButton>
      )}
      <IconButton
        onClick={async () => {
          await deleteTodoMutation.mutate()
        }}
      >
        {deleteTodoMutation.isPending ? (
          <Spinner />
        ) : (
          <i className="fas fa-trash" />
        )}
      </IconButton>
    </div>
  )
}
