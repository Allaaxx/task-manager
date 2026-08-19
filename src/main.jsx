import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"
import { Toaster } from "sonner"

import App from "./pages/App.jsx"
import TaskDetailsPage from "./pages/task-details.jsx"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tasks/:taskId",
    element: <TaskDetailsPage />,
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />,
      <Toaster
        toastOptions={{
          style: {
            color: "text-brand-text-gray",
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
)
