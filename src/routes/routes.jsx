import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  AppPage,
  BoxBacktrackingPage,
  ErrorPage,
  NotFoundPage,
  VirtualizationPage,
  JSPracPage,
} from "../lazy/pages";
import { Suspense } from "react";

const RootLayout = () => (
  <Suspense fallback={<h2>loading...</h2>}>
    <Outlet />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: (
      <Suspense fallback={<h2>Loading...</h2>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      { index: true, element: <AppPage /> },
      { path: "virtualization", element: <VirtualizationPage /> },
      { path: "boxBacktracking", element: <BoxBacktrackingPage /> },
      { path: "jsPrac", element: <JSPracPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
