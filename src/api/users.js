const API_BASE = 'https://jsonplaceholder.typicode.com';

const api = {
  getUsers: () => fetch(`${API_BASE}/users`).then(res => res.json()),
  createUser: (user) => fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(res => res.json()),
  updateUser: (id, user) => fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(res => res.json()),
  deleteUser: (id) => fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
};

export const getUsers = api.getUsers;
export const createUser = api.createUser;
export const updateUser = api.updateUser;
export const deleteUser = api.deleteUser;