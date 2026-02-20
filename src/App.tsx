import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AssignmentDetail from "./pages/AssignmentDetail";
import Rubrics from "./pages/Rubrics";
import GradingWorkspace from "./pages/GradingWorkspace";
import Analytics from "./pages/Analytics";
import SegmentGrades from "./pages/SegmentGrades";
import Presentation from "./pages/Presentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/assignment/:assignmentId" element={<AssignmentDetail />} />
          <Route path="/rubrics" element={<Rubrics />} />
          <Route path="/grading/:assignmentId" element={<GradingWorkspace />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/segment-grades" element={<SegmentGrades />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
