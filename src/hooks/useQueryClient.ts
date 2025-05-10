
import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useQueryClient() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }));
  
  return queryClient;
}
