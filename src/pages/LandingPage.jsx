import Svg from "../components/Svg";
import { useToast } from "d9-toast";
import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const AuthModel = lazy(() => import("../pages/Login"));

const donationMsg = (
  <div className="p-2 ">
    <h3 className=" font-semibold text-base border-b pb-3 mb-4 border-gray-400/40">
      ❤️ Support Platform Improvements
    </h3>
    <div className=" space-y-2 mb-4">
      <p>Your contribution helps us:</p>
      <ul className=" text-green-400 space-y-2 mt-2">
        <li>* Upgrade server performance and reliability</li>
        <li>* Purchase a custom domain</li>
      </ul>
      <p className="text-xs/7">
        <strong>Note :</strong> Our backend is currently hosted on a free Render
        plan. When inactive for about 10 minutes, the server goes into sleep
        mode. The first request after this may take 20–30 seconds while the
        server wakes up. Upgrading will help eliminate this delay and improve
        overall performance.
      </p>
    </div>
  </div>
);

const LandingPage = () => {
  const [showAuthModel, setShowAuthModel] = useState(false);
  const [showDonate, setShowDonate] = useState(
    () => localStorage.getItem("donatePopup") || "show"
  );

  const { showToast, removeToast } = useToast();
  const authModelRef = useRef(null);
  const startBtnRef = useRef(null);
  const authBtnRef = useRef(null);

  const handleOutsideClick = useCallback((e) => {
    if (
      authModelRef.current &&
      !authModelRef.current.contains(e.target) &&
      startBtnRef.current &&
      !startBtnRef.current.contains(e.target) &&
      authBtnRef.current &&
      !authBtnRef.current.contains(e.target)
    ) {
      setShowAuthModel(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [handleOutsideClick]);

  useEffect(() => {
    if (showDonate === "show") {
      showToast({
        type: "info",
        title: false,
        message: donationMsg,
        position: "bottom-right",
        autoClose: false,
        className:
          "!bg-gray-950 border !border-gray-600/40 !text-indigo-50 dark:!border-gray-800",
        actions: [
          {
            text: "Hide",
            callback: ({ id }) => {
              setShowDonate("hide");
              localStorage.setItem("donatePopup", "hide");
              removeToast(id);
            },
          },
          {
            text: "Donate",
            callback: () => {
              window.open("https://rzp.io/rzp/9hRKYDRY", "_self");
            },
          },
        ],
      });
    }
  }, [showDonate, showToast, removeToast]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-grid-pattern bg-black">
      <div className="relative z-10 w-6xl h-screen flex flex-col items-center justify-between p-3">
        {/* Header */}

        <header className="w-full inline-flex items-center justify-between">
          <div className="inline-flex items-center gap-4">
            <Svg
              name="computer"
              className="p-1 rounded-lg bg-gradient-to-tl from-yellow-500 via-yellow-300 to-yellow-100 text-gray-900 "
              aria-hidden="true"
            />
            <h1 className="text-2xl font-poppins font-bold bg-gradient-to-tr from-slate-800 via-indigo-500 to-zinc-400 bg-clip-text text-transparent tracking-wide antialiased">
              Dev Profile
            </h1>
          </div>
          <button
            ref={authBtnRef}
            onClick={() => setShowAuthModel(!showAuthModel)}
            className="px-4 py-1 rounded-full bg-gradient-to-br from-slate-800 via-indigo-500 to-zinc-400 text-indigo-950 font-medium hover:via-indigo-700 transition-colors cursor-pointer"
            aria-label="Log in to Dev Profile"
          >
            Log In
          </button>
        </header>

        {/* Main Content */}
        <main className="h-full w-full flex flex-row items-center justify-evenly max-sm:flex-col gap-2 p-2 overflow-y-auto text-indigo-100">
          <div className="my-6">
            <h2 className="font-semibold max-sm:text-lg text-2xl mb-4 ">
              Your Developer Portfolio, Simplified.
            </h2>
            <p className="text-base/7 font-poppins max-w-xl mb-6">
              Dev Profile is a full-stack portfolio management app built for
              developers. It allows authenticated users to log in, add and
              manage their projects, and share a single public portfolio page
              similar to Linktree, but designed specifically for developers.
            </p>
            <button
              ref={startBtnRef}
              onClick={() => setShowAuthModel(!showAuthModel)}
              className="bg-indigo-500 px-4 py-2.5 mt-2 rounded-full font-semibold max-sm:text-base text-base hover:bg-indigo-600 transition-colors cursor-pointer"
              aria-label="Get started with Dev Profile"
            >
              Let's Start
            </button>
          </div>
          <div className="my-2">
            <img
              src="/hero.webp"
              alt="Developer showcasing portfolio projects on multiple devices"
              width={700}
              height={700}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="max-w-full h-auto drop-shadow-2xl drop-shadow-indigo-800/80"
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="z-10 text-indigo-100 w-full inline-flex justify-between items-center p-2">
          <p className="text-base">Made with ❤️ by d9.coder</p>
          <a
            href="https://rzp.io/rzp/9hRKYDRY"
            aria-label="Support the developer on GitHub Sponsors"
            className="bg-gradient-to-tl from-yellow-500 via-yellow-300 to-yellow-100 p-1 rounded-full text-2xl text-indigo-950 animate-bounce hover:animate-none"
          >
            <Svg name="donate" aria-hidden="true" />
          </a>
        </footer>
      </div>
      {/* Auth model */}
      {showAuthModel && (
        <Suspense fallback={null}>
          <AuthModel ref={authModelRef} />
        </Suspense>
      )}
    </div>
  );
};

export default memo(LandingPage);
