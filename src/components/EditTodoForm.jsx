import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { updateTodo } from '../features/todos/todoSlice';

const EditTodoForm = ({ todo, onClose }) => {
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description,
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { todos } = useSelector(state => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.title.length > 100) {
      setError('Title must be less than 100 characters');
      return;
    }
    
    if (formData.description.length > 500) {
      setError('Description must be less than 500 characters');
      return;
    }
    
    const isDuplicate = todos.some(t => 
      t.id !== todo.id &&
      t.title.toLowerCase() === formData.title.toLowerCase() &&
      t.userId === user.email
    );
    
    if (isDuplicate) {
      setError('A todo with this title already exists');
      return;
    }
    
    const specialCharsRegex = /[^a-zA-Z0-9\s.,!?-]/;
    if (specialCharsRegex.test(formData.title)) {
      setError('Title contains invalid special characters');
      return;
    }

    dispatch(updateTodo({
      id: todo.id,
      ...formData,
    }));
    
    onClose();
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Edit Todo</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-50 text-red-700 p-4 rounded-lg mb-4 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            maxLength={100}
          />
          <div className="mt-1 flex justify-end">
            <span className={`text-sm ${
              formData.title.length > 90 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {formData.title.length}/100
            </span>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows="4"
            maxLength={500}
          />
          <div className="mt-1 flex justify-end">
            <span className={`text-sm ${
              formData.description.length > 450 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {formData.description.length}/500
            </span>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Save Changes
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default EditTodoForm;