import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
} from "./components";
import Footer from "./components/footer";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLoader from "./components/MainLoader";
import { LanguageProvider } from "./context/LanguageContext";
import Hobbies from "./components/hobbies";
import { isLite } from "./utils/device";
import { heroReady } from "./utils/heroReady";

// three.js is only needed for the stars, so it loads after the first screen.
const StarsCanvas = lazy(() => import("./components/canvas/stars"));

// Close the loader after at most this long, even if the hero image is slow.
const MAX_LOADER_MS = 4000;

const App = () => {
  const [hide] = useState(true);
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lite] = useState(isLite);

  useEffect(() => {
    let alive = true;
    const done = () => alive && setReady(true);
    heroReady.then(done);
    const timer = setTimeout(done, MAX_LOADER_MS);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter>
        {isLoading && (
          <MainLoader ready={ready} onLoadingComplete={() => setIsLoading(false)} />
        )}
        <div
          className={`relative z-0 bg-black transition-opacity duration-500 ${
            isLoading ? "opacity-0 h-screen overflow-hidden" : "opacity-100"
          }`}
        >
          <div>
            <Navbar hide={hide} />
            <ErrorBoundary>
              <Hero />
            </ErrorBoundary>
          </div>
          <div className="relative z-0">
            <About />
            <Hobbies />
            <Experience />
            <Tech />
            <Works />
            {!lite && !isLoading && (
              <ErrorBoundary>
                <Suspense fallback={null}>
                  <StarsCanvas />
                </Suspense>
              </ErrorBoundary>
            )}
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
