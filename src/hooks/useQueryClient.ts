
import { QueryClient } from "@tanstack/react-query";

// Create a QueryClient instance outside React's rendering cycle
// This ensures it's a singleton without relying on React hooks
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Export the QueryClient instance directly
export function useQueryClient() {
  return queryClient;
}
