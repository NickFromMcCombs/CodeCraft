import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

// eslint-disable-next-line
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [welcomeName, setWelcomeName] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

  const fetchEmployees = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await axios.get(`${baseUrl}/employees`);
      setEmployees(res.data);
  } catch {
      setError('Failed to load employees');
    } finally { setLoading(false); }
  }, [baseUrl]);

  const addEmployee = async (payload) => {
    try {
      const res = await axios.post(`${baseUrl}/employees`, payload);
      setEmployees(prev => [res.data, ...prev]);
    } catch { setError('Add failed'); }
  };
  const updateEmployee = async (id, payload) => {
    try {
      const res = await axios.put(`${baseUrl}/employees/${id}`, payload);
      setEmployees(prev => prev.map(e => e.id === id ? res.data : e));
    } catch { setError('Update failed'); }
  };
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${baseUrl}/employees/${id}`);
      setEmployees(prev => prev.filter(e => e.id !== id));
    } catch { setError('Delete failed'); }
  };

  return (
    <AppContext.Provider value={{
      welcomeName, setWelcomeName,
      employees, loading, error,
      fetchEmployees, addEmployee, updateEmployee, deleteEmployee
    }}>
      {children}
    </AppContext.Provider>
  );
};
