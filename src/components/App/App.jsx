import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import NotFoundPage from "../../pages/NotFoundPage";
function App() {
  return (
    <div>
      <header>{/* <Navigation /> */}</header>

      <main>
        <Suspense fallback={<div>Loading ...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
