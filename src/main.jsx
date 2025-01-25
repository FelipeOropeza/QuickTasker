import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import AppRoutes from "./routes/routes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </StrictMode>
  </QueryClientProvider>
);
