import { useState } from "react";
import { Id, Task } from "../types";
import { TrashIcon } from "./icons/TrashIcon";

type Props = {
  task: Task;
  deleteTask: (id: Id) => void;
};

export const TaskCard = ({ task, deleteTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  return (
    <div
      className="relative bg-mainBackgroundColor h-24 min-h-24 p-2 ring-0 items-center flex text-left rounded-xl hover:ring-2 hover:ring-insert hover:ring-rose-500 curssor-grab"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {task.content}
      {mouseIsOver && (
        <button
          className="stroke-white absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-columnBackgroundColor rounded opacity-60 hover:opacity-100"
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};
