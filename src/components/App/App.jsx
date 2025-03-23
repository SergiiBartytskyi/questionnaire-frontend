import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import BuilderPage from "../../pages/BuilderPage/BuilderPage";
import QuizDetailsPage from "../../pages/QuizDetailsPage/QuizDetailsPage";
import InteractivePage from "../../pages/InteractivePage/InteractivePage";
function App() {
  return (
    <>
      <header>{/* <Navigation /> */}</header>

      <main>
        <Suspense fallback={<div>Loading ...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/create" element={<BuilderPage />} />
            <Route path="/edit/:id" element={<QuizDetailsPage />} />
            <Route path="/take/:id" element={<InteractivePage />} />
            {/* <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
