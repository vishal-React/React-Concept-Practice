import { StrictMode } from "react";
import { Toaster } from "sonner";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes/routes.jsx";
import { queryClient } from "./apiServices/configs/tanstackQueryConfig.js";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import "./main.css";
import setupLocatorUI from "@locator/runtime";

if (import.meta.env.DEV) {
  setupLocatorUI();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors closeButton theme="dark" duration={3000} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
