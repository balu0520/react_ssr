import React, { Suspense } from "react";

import SkeletonLoader from "./components/SkeletonLoader";

const HomeModule = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 3000)).then(() =>
    import("./components/HomeModule")
  );
});

const Home = () => {
  return (
    <div>
      <h1>🏠 Welcome to the Home Page</h1>
      <p>
        This content should appear immediately if SSR streaming works correctly.
      </p>
      <Suspense fallback={<SkeletonLoader />}>
        <HomeModule />
      </Suspense>
      <footer style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#888" }}>
        The footer will appear immediately with the rest of the non-lazy
        content.
      </footer>
    </div>
  );
};
export default Home;
