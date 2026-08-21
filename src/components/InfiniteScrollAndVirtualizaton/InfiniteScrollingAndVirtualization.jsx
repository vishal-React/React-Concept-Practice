import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 20;

function ImageCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="h-48 w-full animate-pulse bg-gray-200 sm:h-56 md:h-60" />
      <div className="p-3">
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function InfiniteScrollingAndVirtualization() {
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef(null);
  const pageRef = useRef(1);

  const fetchImages = useCallback(async (pageNumber) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=${PAGE_SIZE}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const newImages = await response.json();

      setImagesData((previousImages) => [...previousImages, ...newImages]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const lastElementRef = useCallback((node) => {
    // Because this is a callback ref, React calls this function whenever
    // the element is attached to the DOM or detached from the DOM.
    //
    // When the element is attached:
    //   node = the actual DOM element
    //
    // When the element is detached/unmounted:
    //   node = null

    // If an observer is already watching the previous element,
    // disconnect it first so we don't keep watching an old/detached element.
    // This is important because React may call this ref again when the
    // element is detached or when a different element becomes the last element.
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // If there is no node (for example, when React detaches the ref),
    // there is nothing to observe, so stop here.
    if (!node) {
      return;
    }

    // Create a new IntersectionObserver.
    // The observer is responsible for watching the element and telling us
    // when the element enters or leaves the visible area of the screen.
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // If the element is currently visible/intersecting with the viewport,
        // it means the user has reached the bottom/last element.
        if (entries[0].isIntersecting) {
          console.log("Reached bottom!");
          pageRef.current += 1;
          fetchImages(pageRef.current);
        }
      },
      { threshold: 1 },
    );

    // Start watching the current node with the IntersectionObserver.
    // Creating the observer above only sets it up;
    // observe(node) actually starts the watching.
    if (node) {
      observerRef.current.observe(node);
    }
  }, []);

  useEffect(() => {
    fetchImages(1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold">Infinite Image Gallery</h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {/* images */}
          {imagesData.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-xl bg-white shadow"
            >
              <img
                src={`https://picsum.photos/id/${image.id}/500/500`}
                alt={image.author}
                loading="lazy"
                className="h-48 w-full object-cover sm:h-56 md:h-60"
              />

              <div className="p-3">
                <p className="truncate text-sm font-medium">{image.author}</p>
              </div>
            </div>
          ))}

          {/* skeletons loading */}
          {loading &&
            Array.from({ length: imagesData.length ? 5 : PAGE_SIZE }).map(
              (_, index) => <ImageCardSkeleton key={`skeleton-${index}`} />,
            )}

          {/* Sentinel */}
          {imagesData.length > 0 && !loading && (
            <div
              ref={lastElementRef}
              className="col-span-full flex h-20 items-center justify-center"
            >
              Loading more...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
