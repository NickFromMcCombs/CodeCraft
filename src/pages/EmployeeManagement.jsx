import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Table, TableBody, TableCell, TableHead, TableRow, 
  Button, TextField, Container, Typography, Box, Paper, Divider, Snackbar, Alert
} from '@mui/material';

const headerCellSx = { backgroundColor: '#34495e', color: '#fff', fontWeight: 600, fontSize: 13, letterSpacing: '.5px' };

const EmployeeManagement = () => {
  const { employees, fetchEmployees, addEmployee, updateEmployee, deleteEmployee, loading, error } = useContext(AppContext);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', birthdate: '', salary: '' });
  const [editingId, setEditingId] = useState(null);
  const [touched, setTouched] = useState({});
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });

  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const errors = (() => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = 'Required';
    if (!form.last_name.trim()) e.last_name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Invalid email';
    if (form.salary && isNaN(Number(form.salary))) e.salary = 'Must be a number';
    if (form.birthdate) {
      const today = new Date().toISOString().slice(0,10);
      if (form.birthdate > today) e.birthdate = 'Cannot be future';
    }
    return e;
  })();
  const hasErrors = Object.keys(errors).length > 0;

  const resetForm = () => {
    setForm({ first_name: '', last_name: '', email: '', birthdate: '', salary: '' });
    setEditingId(null);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const markTouched = (e) => setTouched(t => ({ ...t, [e.target.name]: true }));

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setTouched({ first_name: true, last_name: true, email: true, birthdate: true, salary: true });
    if (hasErrors) return;
    const payload = { ...form, salary: Number(form.salary)||0 };
    try {
      if (editingId) { await updateEmployee(editingId, payload); setSnack({ open: true, type: 'success', msg: 'Employee updated' }); }
      else { await addEmployee(payload); setSnack({ open: true, type: 'success', msg: 'Employee added' }); }
      resetForm();
    } catch {
      setSnack({ open: true, type: 'error', msg: 'Operation failed' });
    }
  };

  const handleEdit = (emp) => {
  setEditingId(emp.id);
  setForm({ first_name: emp.first_name, last_name: emp.last_name, email: emp.email, birthdate: emp.birthdate?.slice(0,10) || '', salary: emp.salary });
  setTouched({});
  };

  const handleDelete = (id) => {
    if (!confirm('Delete employee?')) return;
  deleteEmployee(id); setSnack({ open: true, type: 'success', msg: 'Employee deleted'});
    if (editingId === id) resetForm();
  };

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Employee List</Typography>
      <Paper variant="outlined" sx={{ mb: 4 }}>
        {loading && <Typography sx={{ p:1, color: '#aaa' }}>Loading employees...</Typography>}
        {error && <Typography color="error" sx={{ p:1 }}>{error}</Typography>}
  <Table size="small" sx={{ '& td, & th': { borderBottom: '1px solid #e1e5ea' }, '& td': { color: '#1f1f1f' } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellSx}>First Name</TableCell>
              <TableCell sx={headerCellSx}>Last Name</TableCell>
              <TableCell sx={headerCellSx}>Email</TableCell>
              <TableCell sx={headerCellSx}>Birthdate</TableCell>
              <TableCell sx={headerCellSx}>Salary</TableCell>
              <TableCell sx={headerCellSx}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp, idx) => (
              <TableRow key={emp.id} sx={{ backgroundColor: idx % 2 ? '#f5f5f5' : '#ffffff', '&:last-child td': { borderBottom: 0 } }}>
                <TableCell>{emp.first_name}</TableCell>
                <TableCell>{emp.last_name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.birthdate ? new Date(emp.birthdate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric'}) : ''}</TableCell>
                <TableCell sx={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{ typeof emp.salary === 'number' ? currency.format(emp.salary) : '' }</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" variant="contained" sx={{ backgroundColor: '#000a78', '&:hover': { backgroundColor: '#0014b0' } }} onClick={()=>handleEdit(emp)}>Edit</Button>
                    <Button size="small" variant="contained" color="error" sx={{ backgroundColor: '#7b0000', '&:hover': { backgroundColor: '#a30000' } }} onClick={()=>handleDelete(emp.id)}>Delete</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

  <Paper variant="outlined" sx={{ maxWidth: 500, p: 2.5, pt: 2, borderRadius: 2, color: '#1f1f1f', border: '1px solid #2d3944', boxShadow: '0 3px 10px rgba(0,0,0,0.35)' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>{editingId ? 'Edit Employee' : 'Add New Employee'}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          component="form"
          onSubmit={handleAddOrUpdate}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.6,
            '& .MuiTextField-root': {
              backgroundColor: '#ffffff',
              borderRadius: 1,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#9e9e9e' },
              '&:hover fieldset': { borderColor: '#000a78' },
              '&.Mui-focused fieldset': { borderColor: '#a34700', borderWidth: 2 },
            },
            '& .MuiOutlinedInput-input': {
              color: '#1f1f1f',
            },
            '& input[type="date"]': {
              color: '#1f1f1f',
            },
            '& input[type="date"]::-webkit-calendar-picker-indicator': {
              filter: 'invert(15%) sepia(40%) saturate(600%) hue-rotate(190deg) brightness(90%)',
            },
            '& .MuiInputLabel-root': { color: '#555' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#a34700' }
          }}
        >
          <TextField size="small" name="first_name" label="First Name" value={form.first_name} onChange={handleChange} onBlur={markTouched} error={touched.first_name && !!errors.first_name} helperText={touched.first_name && errors.first_name} />
            <TextField size="small" name="last_name" label="Last Name" value={form.last_name} onChange={handleChange} onBlur={markTouched} error={touched.last_name && !!errors.last_name} helperText={touched.last_name && errors.last_name} />
            <TextField size="small" name="email" label="Email" value={form.email} onChange={handleChange} onBlur={markTouched} error={touched.email && !!errors.email} helperText={touched.email && errors.email} />
            <TextField size="small" name="birthdate" type="date" label="Birthdate" value={form.birthdate} onChange={handleChange} onBlur={markTouched} InputLabelProps={{ shrink: true }} error={touched.birthdate && !!errors.birthdate} helperText={touched.birthdate && errors.birthdate} />
            <TextField size="small" name="salary" label="Salary" value={form.salary} onChange={handleChange} onBlur={markTouched} error={touched.salary && !!errors.salary} helperText={touched.salary && errors.salary} />
            <Box sx={{ display: 'flex', gap: 1.5, mt: 0.5 }}>
              <Button disabled={hasErrors && Object.keys(touched).length>0} type="submit" size="small" variant="contained" sx={{ px: 3 }}>{editingId ? 'Update' : 'Add Employee'}</Button>
              {editingId && <Button size="small" variant="outlined" onClick={resetForm}>Cancel</Button>}
            </Box>
        </Box>
      </Paper>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={()=>setSnack(s=>({...s, open:false}))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snack.type} onClose={()=>setSnack(s=>({...s, open:false}))} variant="filled">{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default EmployeeManagement;
