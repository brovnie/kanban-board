import { useMemo, useState } from "react";
import { PlusIcon } from "./icons/PlusIcon";
import { Column, Id } from "../types";
import { v4 } from "uuid";
import { ColumnContainer } from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const columnsId = useMemo(() => {
    return columns.map((col) => col.id);
  }, [columns]);
  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: v4(),
      title: `Columns ${columns.length + 1} `,
    };
    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  };
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);
      const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-9">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} />
              ))}
            </SortableContext>
          </div>

          <button
            className="h-14 w-80 cursor-pointer leading-none rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor px-4 ring-rose-500 hover:ring-2 flex gap-2 items-center text-base"
            onClick={() => createNewColumn()}
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
