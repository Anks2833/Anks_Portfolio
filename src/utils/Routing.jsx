import { Routes, Route } from 'react-router-dom';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Page4 from '../pages/Page4';
import Page5 from '../pages/Page5';
import App from '../App';

const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<App />} />
    </Routes>
  );
}

export default Routing;