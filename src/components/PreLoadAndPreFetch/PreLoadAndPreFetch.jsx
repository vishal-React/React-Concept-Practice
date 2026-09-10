import { useEffect, useState } from "react";

const PreLoadAndPreFetch = () => {
  const [showImage, setShowImage] = useState(false);

  const imageUrl =
    "https://uatapi-ipbb.fynity.in/storage/logo-6997f9a180992.jpg";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");

    link.rel = "preload";
    link.as = "image";
    link.href = imageUrl;

    console.log("preload link:", link);

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div>
      PreLoadAndPreFetch
      {showImage ? <img src={imageUrl} alt="Hero" /> : null}
    </div>
  );
};
// Preload vs Prefetch
// Preload
// Used for resources needed soon on the current page.
// Tells the browser: “I definitely need this resource.”
// Browser gives it higher priority.
// Main purpose: start downloading the resource early.
// Commonly used for critical images, fonts, CSS, or JS.
// Should not be overused, because multiple preloads can compete for bandwidth.
// Prefetch
// Used for resources that may be needed later.
// Tells the browser: “I might need this resource in the future.”
// Usually treated as lower priority.
// Browser downloads it when it has spare capacity.
// Commonly used for resources of a likely next page.
// It is speculative — the user may never need the resource, so bandwidth can be wasted.
// Main Difference

// Preload → Current page → Need soon → Higher priority

// Prefetch → Future page → Might need later → Lower priority

// Easy Memory Trick

// Preload = Need it now
// Prefetch = Might need it later

// Important

// Preload and prefetch do not make the internet/network itself faster.

// They mainly tell the browser when and how important a resource is, so the browser can decide when to start fetching it.
export default PreLoadAndPreFetch;
