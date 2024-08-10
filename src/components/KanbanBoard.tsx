import { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { Column, Id } from '../types';
import { v4 } from 'uuid';
import { ColumnContainer } from './ColumnContainer';
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

  const deleteColumn = (id: Id) => {
    const filteredColumn = columns.filter((col) => col.id !== id);
    setColumns(filteredColumn);
  };
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-9">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer column={col} deleteColumn={deleteColumn} />
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
