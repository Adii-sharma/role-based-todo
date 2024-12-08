import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filteredTodos: [],
  viewMode: 'list', 
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);
      state.filteredTodos = state.todos;
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload };
        state.filteredTodos = state.todos;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.filteredTodos = state.todos;
    },
    searchTodos: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredTodos = state.todos.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm) ||
        todo.description.toLowerCase().includes(searchTerm)
      );
    },
    toggleView: (state) => {
      state.viewMode = state.viewMode === 'list' ? 'card' : 'list';
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, searchTodos, toggleView } = todoSlice.actions;
export default todoSlice.reducer;