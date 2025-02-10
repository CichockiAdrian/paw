import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostList from "./pages/PostList";
import PostDetails from "./pages/PostDetails";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  );
}

export default App;
