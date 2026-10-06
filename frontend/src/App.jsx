import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/Landing";
import Navbar from "./components/layout/Navbar";
import ArtistPage from "./pages/Artist";
import CorporatePage from "./pages/Corporate";
import ArtistGallery from "./pages/ArtistGallery";
import CorporateGallery from "./pages/CorporateGallery";
import NotFound from "./pages/NotFound";
import Footer from "./components/layout/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  /*
   * Disable browser's automatic scroll restoration.
   */
  window.history.scrollRestoration = "manual";

  /*
   * Scroll immediately when the route changes.
   */
  window.scrollTo(0, 0);

  return null;
};
const App = () => {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <Toaster />

      <Routes>
        {/* =================================================
            PUBLIC WEBSITE
            ================================================= */}

        <Route path="/" element={<HomePage />} />

        <Route path="/artist" element={<ArtistPage />} />

        <Route path="/artist-gallery" element={<ArtistGallery />} />

        <Route path="/corporate" element={<CorporatePage />} />

        <Route path="/corporate-gallery" element={<CorporateGallery />} />

        {/* =================================================
            PUBLIC FALLBACK
            ================================================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};
export default App;
