import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NutritionClinic from './pages/NutritionClinic';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NutritionClinic />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
