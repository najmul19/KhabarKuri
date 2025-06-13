import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import AuthProviders from "./Providers/AuthProviders";

// tan stack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./Hooks/ThemeContext/ThemeContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <HelmetProvider>
            <div className="max-w-screen-xl mx-auto">
              <RouterProvider router={router} />
            </div>
          </HelmetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProviders>
  </StrictMode>
);
