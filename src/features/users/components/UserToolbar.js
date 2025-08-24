import { Toolbar, Button, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function UserToolbar({ onAddUser }) {
  return (
    <Toolbar sx={{ pl: 0, pr: 0 }}>
      <Box sx={{ flexGrow: 1 }} />
      
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddUser}
        sx={{ ml: 2 }}
      >
        Add User
      </Button>
    </Toolbar>
  );
}
