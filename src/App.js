import {
  CssBaseline,
} from "@mui/material";

import {
  QueryClient,
  QueryClientProvider,

} from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import theme from "./utils/Theme";
import UserManagementApp from "./features/users/pages/UserManagementPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <UserManagementApp />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
