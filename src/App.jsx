import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Rooms from './pages/Rooms.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import ImageOptimizer from './pages/ImageOptimizer.jsx';
import RoomDetail from './pages/RoomDetail.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/:id" element={<RoomDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="optimize" element={<ImageOptimizer />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
