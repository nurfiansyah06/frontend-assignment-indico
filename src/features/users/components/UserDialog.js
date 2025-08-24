import { useState,useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import validateUserForm from '../../../utils/Validation';

export default function UserDialog({ user, open, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: { name: user?.company?.name || '' }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        company: { name: user.company?.name || '' }
      });
    } else {
      setFormData({
        name: '',
        email: '',
        company: { name: '' }
      });
    }
    setErrors({});
  }, [user, open]);

  const handleSubmit = () => {
    if (validateUserForm(formData, setErrors)) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (field, value) => {
    if (field === 'companyName') {
      setFormData(prev => ({
        ...prev,
        company: { name: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field] || (field === 'companyName' && errors.company)) {
      setErrors(prev => ({ ...prev, [field]: '', company: '' }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {user ? 'Edit User' : 'Add New User'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            variant="outlined"
          />
          
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            variant="outlined"
          />
          
          <TextField
            label="Company"
            value={formData.company.name}
            onChange={(e) => handleChange('companyName', e.target.value)}
            error={!!errors.company}
            helperText={errors.company}
            fullWidth
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {user ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}