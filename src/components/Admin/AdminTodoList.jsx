import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchTodos, toggleView } from '../../features/todos/todoSlice';
import TodoList from '../Todos/TodoList';
import TodoCard from '../Todos/TodoCard';
import TodoForm from '../Todos/TodoForm';
import { motion, AnimatePresence } from 'framer-motion';

const AdminTodoList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterUser, setFilterUser] = useState('');
  const { viewMode, filteredTodos } = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const filteredByUser = filterUser
    ? filteredTodos.filter(todo => todo.userId === filterUser)
    : filteredTodos;

  return (
    <div>
      <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full p-4 pr-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/90 backdrop-blur-sm"
            onChange={(e) => dispatch(searchTodos(e.target.value))}
          />
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
          >
            Add Todo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(toggleView())}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
          >
            {viewMode === 'list' ? 'Card View' : 'List View'}
          </motion.button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <TodoList todos={filteredByUser} isAdmin={true} />
      ) : (
        <TodoCard todos={filteredByUser} isAdmin={true} />
      )}

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
            >
              <TodoForm onClose={() => setShowAddForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTodoList