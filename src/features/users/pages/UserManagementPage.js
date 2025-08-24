import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Fab,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import UserToolbar from "../components/UserToolbar";
import UserDialog from "../components/UserDialog";
import UserTable from "../components/UserTable";
import * as api from "../../../api/users";


export default function UserManagementApp() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const queryClient = useQueryClient();

  const {
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: api.getUsers,
    staleTime: 5 * 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: api.createUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (oldUsers) => [
        ...(oldUsers || []),
        { ...newUser, id: Date.now() },
      ]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, user }) => api.updateUser(id, user),
    onSuccess: (updatedUser, { id }) => {
      queryClient.setQueryData(["users"], (oldUsers) =>
        (oldUsers || []).map((user) =>
          user.id === id ? { ...updatedUser, id } : user
        )
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteUser,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["users"], (oldUsers) =>
        (oldUsers || []).filter((user) => user.id !== deletedId)
      );
    },
  });

  const handleCreateUser = (userData) => {
    createMutation.mutate(userData);
  };

  const handleUpdateUser = (userData) => {
    updateMutation.mutate({ id: editingUser.id, user: userData });
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          Failed to load users. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          User Management
        </Typography>

        <UserToolbar onAddUser={() => setIsDialogOpen(true)}/>
      </Paper>

      <Paper elevation={1}>
        <UserTable onEditUser={handleEditUser} onDeleteUser={handleDeleteUser} />
      </Paper>

      <UserDialog
        user={editingUser}
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={editingUser ? handleUpdateUser : handleCreateUser}
      />

      <Fab
        color="primary"
        aria-label="add user"
        onClick={() => setIsDialogOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: { xs: "flex", sm: "none" },
        }}
      >
        <AddIcon />
      </Fab>

      {(createMutation.isPending ||
        updateMutation.isPending ||
        deleteMutation.isPending) && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CircularProgress size={24} />
              <Typography>
                {createMutation.isPending && "Creating user..."}
                {updateMutation.isPending && "Updating user..."}
                {deleteMutation.isPending && "Deleting user..."}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </Container>
  );
}