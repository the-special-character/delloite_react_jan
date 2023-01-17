import React, { memo } from 'react';
import { FilterType } from '../../types/types';

type Props = {
  setFilterType: (filterType: FilterType) => void;
};

const TodoFilter = ({ setFilterType }: Props) => {
  console.log('TodoFilter render');

  return (
    <div className="flex w-full">
      <button
        onClick={() => setFilterType(FilterType.all)}
        type="button"
        className="btn flex-1"
      >
        All
      </button>
      <button
        onClick={() => setFilterType(FilterType.pending)}
        type="button"
        className="btn flex-1"
      >
        Pending
      </button>
      <button
        onClick={() => setFilterType(FilterType.completed)}
        type="button"
        className="btn flex-1"
      >
        Completed
      </button>
    </div>
  );
};

export default memo(TodoFilter);
