import { Column, Id } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

export const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props; //extract
  return (
    <div className="w-80 h-[500px] max-h-[500px] rounded-md flex flex-col bg-columnBackgroundColor">
      <div className="bg-mainBackgroundColor text-md h-14 cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
        </div>
        <button
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor px-1 py-2 rounded"
          onClick={() => deleteColumn(column.id)}
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
};
