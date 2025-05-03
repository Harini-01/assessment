import React from 'react';

const ResizeHandle = ({ onMouseDown }) => {
  return (
    <div
      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize 
        hover:bg-violet-300 dark:hover:bg-violet-600 
        active:bg-violet-400 dark:active:bg-violet-500
        transition-colors duration-150"
      onMouseDown={onMouseDown}
    />
  );
};

export default ResizeHandle;