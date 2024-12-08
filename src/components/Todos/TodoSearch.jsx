import React from 'react';
import { useDispatch } from 'react-redux';
import { searchTodos } from '../../features/todos/todoSlice';

const TodoSearch = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(searchTodos(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search todos..."
      onChange={handleSearch}
      className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
};

export default TodoSearch;