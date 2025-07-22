import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NutritionClinic from './pages/NutritionClinic';
import Epigenetics from './pages/Epigenetics';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NutritionClinic />} />
          <Route path="/epigenetica" element={<Epigenetics />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
