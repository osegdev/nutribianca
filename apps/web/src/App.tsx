import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NutritionClinic from './pages/NutritionClinic';
import Epigenetics from './pages/Epigenetics';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NutritionClinic />} />
          <Route path="/epigenetica" element={<Epigenetics />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
