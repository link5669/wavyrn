import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router";

function scrollToTop() {
  const el = document.scrollingElement || document.documentElement;
  if (el) {
    el.scrollTop = 0;
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

const ScrollToTop = (props) => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.history.scrollRestoration === "string") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  useEffect(() => {
    scrollToTop();
    const rafId = requestAnimationFrame(scrollToTop);
    const t1 = setTimeout(scrollToTop, 50);
    const t2 = setTimeout(scrollToTop, 150);
    const t3 = setTimeout(scrollToTop, 400);
    const isBlog = location.pathname === "/blog";
    let intervalId = null;
    let timeoutId = null;
    if (isBlog) {
      intervalId = setInterval(scrollToTop, 40);
      timeoutId = setTimeout(() => {
        if (intervalId) clearInterval(intervalId);
      }, 1200);
    }
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  return <>{props.children}</>;
};

export default ScrollToTop;