import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContextProvider.tsx";
import { ChatSessionProvider } from "./contexts/ChatSessionContext.tsx";
import { ChatWidgetProvider } from "./contexts/ChatWidgetContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChatSessionProvider>
          <ChatWidgetProvider>
            <App />
          </ChatWidgetProvider>
        </ChatSessionProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
