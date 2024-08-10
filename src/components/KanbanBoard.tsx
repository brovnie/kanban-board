import { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { Column } from '../types';
import { v4 } from 'uuid';
export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  console.log(columns);
  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: v4(),
      title: `Columns ${columns.length + 1} `,
    };
    setColumns([...columns, columnToAdd]);
  };
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-9">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <div>{col.title}</div>
          ))}
        </div>
        <button
          className="h-14 w-80 cursor-pointer leading-none rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor px-4 ring-rose-500 hover:ring-2 flex gap-2 items-center text-base"
          onClick={() => createNewColumn()}
        >
          <PlusIcon />
          Add Column
        </button>
      </div>
    </div>
  );
};
