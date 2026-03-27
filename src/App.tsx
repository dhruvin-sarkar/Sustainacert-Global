import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollToTop from "@/components/ScrollToTop";
import { PageSkeleton } from "@/components/ui/skeleton";

// Keep Index immediate (critical path - homepage)
import Index from "./pages/Index";

// Lazy load all other pages for better initial load performance
const AboutUs = lazy(() => import("./pages/AboutUs"));
const QualityPolicy = lazy(() => import("./pages/QualityPolicy"));
const Services = lazy(() => import("./pages/Services"));
const NewsBlogs = lazy(() => import("./pages/NewsBlogs"));
const InsightDetail = lazy(() => import("./pages/InsightDetail"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Apply = lazy(() => import("./pages/Apply"));
const Verify = lazy(() => import("./pages/Verify"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/quality-policy" element={<QualityPolicy />} />
              <Route path="/services" element={<Services />} />
              <Route path="/news-blogs" element={<NewsBlogs />} />
              <Route path="/insights/:slug" element={<InsightDetail />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
