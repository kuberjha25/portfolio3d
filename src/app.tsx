import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import Footer from "./components/footer";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLoader from "./components/MainLoader";

const App = () => {
  const [hide, setHide] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let minTimerDone = false;
    let assetsLoaded = false;

    // Minimum 2 seconds loader display
    const minTimer = setTimeout(() => {
      if (isMounted) {
        minTimerDone = true;
        if (assetsLoaded) {
          setIsLoading(false);
        }
      }
    }, 2500);

    // Preload critical assets
    const preloadAssets = async () => {
      // Get all images on the page
      const images = document.querySelectorAll("img");
      const imagePromises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      // Wait for images or timeout after 5 seconds
      await Promise.race([
        Promise.all(imagePromises),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ]);

      if (isMounted) {
        assetsLoaded = true;
        if (minTimerDone) {
          setIsLoading(false);
        }
      }
    };

    preloadAssets();

    return () => {
      isMounted = false;
      clearTimeout(minTimer);
    };
  }, []);

  if (isLoading) {
    return <MainLoader onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-black">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar hide={hide} />
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>
        </div>
        <div className="relative z-0">
          <About />
          <Experience />
          <Tech />
          <Works />
          <StarsCanvas />
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;