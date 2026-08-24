import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery } from "@tanstack/react-query";
import { showError } from "../../toast/toast";

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

function getColumnCount(width) {
  if (width >= 1024) return 5; // lg
  if (width >= 768) return 4; // md
  if (width >= 640) return 3; // sm
  return 2; // base
}

function GridWrapper({ children, className = "" }) {
  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ${className}`}
    >
      {children}
    </div>
  );
}

export default function InfiniteScrollingAndVirtualization() {
  const [columnCount, setColumnCount] = useState(
    () => getColumnCount(window.innerWidth) || 5,
  );
  const observerRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["images"],
      initialPageParam: 1,

      queryFn: async ({ pageParam }) => {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${pageParam}&limit=${PAGE_SIZE}`,
        );

        if (!response.ok) {
          showError("Failed to fetch images");
          throw new Error("Failed to fetch images");
        }

        return response.json();
      },

      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,
    });

  const imagesData = data?.pages.flat() ?? [];

  const lastElementRef = useCallback(
    (node) => {
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
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            console.log("Reached bottom!");
            fetchNextPage();
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
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  // --- Virtualization setup ---
  // Instead of rendering every image div at once (which gets heavy once
  // you've loaded hundreds of images via infinite scroll), we chunk
  // imagesData into "rows" of `columnCount` items each, and only mount
  // the DOM for rows that are near the viewport. The page itself keeps
  // scrolling normally (min-h-screen / body scroll), so we use
  // useWindowVirtualizer instead of a fixed-height scroll container.
  const rowCount = Math.ceil(imagesData.length / columnCount);
  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 280, // rough starting guess for a row's height in px
    overscan: 3, // render a few extra rows above/below the viewport
    // measureElement lets the virtualizer correct itself using each row's
    // real rendered height (image heights differ slightly per breakpoint).
    measureElement: (el) => el.getBoundingClientRect().height,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const handleResize = () =>
      setColumnCount(getColumnCount(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold">Infinite Image Gallery</h1>
        {/* Virtualized rows container. Its height is set to the virtualizer's
            total estimated size so the page scrollbar/scroll length stays
            correct even though only a subset of rows is actually mounted. */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualRows.map((virtualRow) => {
            const startIndex = virtualRow.index * columnCount;
            const rowImages = imagesData.slice(
              startIndex,
              startIndex + columnCount,
            );
            // console.log("rowImages", rowImages);
            return (
              <div
                key={virtualRow.key}
                ref={rowVirtualizer.measureElement}
                // data-index can be useful for identifying which virtual item a DOM element represents,
                // especially for debugging or when working with measurement/DOM logic.
                data-index={virtualRow.index}
                // Absolutely position each row at its calculated offset so
                // rows stack correctly even though unmounted rows leave gaps.
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <GridWrapper className="pb-4">
                  {/* images */}
                  {rowImages.map((image) => (
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
                </GridWrapper>
              </div>
            );
          })}
        </div>
        <GridWrapper>
          {/* skeletons loading */}
          {(isLoading || isFetchingNextPage) &&
            Array.from({ length: imagesData.length ? 5 : PAGE_SIZE }).map(
              (_, index) => <ImageCardSkeleton key={`skeleton-${index}`} />,
            )}

          {/* Sentinel */}
          {!isFetchingNextPage && (
            <div
              ref={lastElementRef}
              className="col-span-full flex h-20 items-center justify-center"
            >
              Loading more...
            </div>
          )}
        </GridWrapper>
      </div>
    </div>
  );
}
