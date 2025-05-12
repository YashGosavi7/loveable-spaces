
import { QueryClient } from "@tanstack/react-query";

// Create a QueryClient instance outside React's rendering cycle
// This avoids the useState issue while still maintaining a singleton instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Export the QueryClient instance directly, no need for a hook
export function useQueryClient() {
  return queryClient;
}
