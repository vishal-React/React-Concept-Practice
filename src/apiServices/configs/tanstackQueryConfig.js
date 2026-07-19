import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // Keep data fresh for 2 minutes
      refetchOnWindowFocus: false, // Don't refetch the API when the browser window gains focus
      retry: false, // Don't retry the API request if it fails
    },
  },
});
