import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Articles from "./pages/Articles";
import Destinations from "./pages/Destinations";
import Home from "./pages/Home";
import News from "./pages/News";
import Visas from "./pages/Visas";
import Services from "./pages/Services";
import VisaTypePage from "./pages/VisaTypePage";
import ArticleContent from "./pages/ArticleContent";
import ContentProvider from "./data/DataContext";
import "./index.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/visas',
    element: <Visas />
  },
  {
    path: '/visas/:visatitle',
    element: <VisaTypePage />
  },
  {
    path: '/destinations/:region',
    element: <Destinations />
  },
  {
    path: '/articles',
    element: <Articles />
  },
  {
    path: '/article-content/:content',
    element: <ArticleContent />
  },
  {
    path: '/news',
    element: <News />
  },
  {
    path: '/services',
    element: <Services />
  }

])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContentProvider>
    <RouterProvider router={router} />
    </ContentProvider>
  </StrictMode>,
)

