import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails'; 
import SearchComponent from './SearchComponent';


const App = () => (
  <Router>   
    <div className="App">
            <SearchComponent />
        </div>  
        <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} /> 
        </Routes>
    </Router>  
);

export default App;


