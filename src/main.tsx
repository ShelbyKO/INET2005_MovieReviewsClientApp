import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'

import Home from './components/routes/Home'
import Details from './components/routes/MovieDetails/MovieDetails'
import Layout from './components/routes/Layout'
import Movies from './components/routes/Movies/Movies'
import Reviews from './components/routes/Reviews/Reviews'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
        <Route path ="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
