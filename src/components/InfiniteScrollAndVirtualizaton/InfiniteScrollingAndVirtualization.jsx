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

  // Attaches to the bottom sentinel div and just logs when it's reached
  const lastElementRef = useCallback((node) => {
    console.log("node", node);
    console.log("observerRef.current", observerRef.current);
    if (observerRef.current) {
      console.log("in");
      observerRef.current.disconnect();
    }

    if (!node) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        console.log("entries", entries);
        if (entries[0].isIntersecting) {
          console.log("Reached bottom!");
        }
      },
      // {
      //   root: null,
      //   rootMargin: "300px",
      //   threshold: 1,
      // },
    );

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
          {loading ? (
            // First load: no images yet, show skeleton placeholders
            Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <ImageCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            <>
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
                    <p className="truncate text-sm font-medium">
                      {image.author}
                    </p>
                  </div>
                </div>
              ))}
              <div
                ref={lastElementRef}
                className="flex h-32 items-center justify-center"
              >
                intersection Observer
                {imagesData.length > 0 && loading && (
                  <p className="text-gray-500">Loading more images...</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
