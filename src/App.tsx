import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import QualityPolicy from "./pages/QualityPolicy";
import Services from "./pages/Services";
import NewsBlogs from "./pages/NewsBlogs";
import InsightDetail from "./pages/InsightDetail";
import ContactUs from "./pages/ContactUs";
import Apply from "./pages/Apply";
import Verify from "./pages/Verify";
import NotFound from "./pages/NotFound";
import { ConfettiDemo } from "./pages/ConfettiDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/quality-policy" element={<QualityPolicy />} />
            <Route path="/services" element={<Services />} />
            <Route path="/news-blogs" element={<NewsBlogs />} />
            <Route path="/news" element={<NewsBlogs />} />
            <Route path="/blogs" element={<NewsBlogs />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/confetti-demo" element={<ConfettiDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
