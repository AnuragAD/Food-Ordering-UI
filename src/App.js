/***
 *
 * HMR----> Hot Module Replacement----->Parcel will reload once to save the file.
 * File Watcher Algorithm ----> pacel uses this to keep track of files that we change.
 * BUNDLING
 * MINIFY
 * Cleaning our code (Removing console.logs etc)
 * Dev and Production Build
 * Super Fast Build algorithm
 * Image Optimization
 * Caching while development
 * Compression
 * Compatible with all versions of browsers
 * HTTPS on dev
 * Port Number
 * Consistent Hashing Algorithm
 * Zero Config Bundler
 * Tree Shaking - Removing Unwanted code
 *
 */

import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
//import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import RestaurantDetail from "./components/RestaurantDetail";


const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const Body = lazy(() => import('./components/Body') );

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/restaurantsat/:place_id",
        element: <Suspense><Body/></Suspense>,
      },
      {
        path: "/restaurantdetail",
        element:<RestaurantDetail />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
