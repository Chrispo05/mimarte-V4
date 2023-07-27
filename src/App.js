import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import './GlobalStyles.scss';
import Header from './Components/js/Header';
import HeaderBanner from './Components/js/HeaderBanner';
import CategoryHomeSlider from './Components/js/categorýHomeSlider';
import ExtraServicesHomeSection from './Components/js/ExtraServicesHomeSection';
import Footer from './Components/js/Footer';
import ProductSectionCategoryCards from './Components/js/ProductSectionCategoryCards';
import ProductsSection from './Components/js/ProductMainSection';


import reorganizeByCategory from './Components/js/ContextFilteringHelpers';
import PopupProductModal from './Components/js/PopupProductModalContent';





// Creamos un contexto global
export const ProductsContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api-mimarte.azurewebsites.net/api/Product/Lista');
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const jsonData = await response.json();

      // antes de poner el array en el contexto, tenemos que crear el filtro y el orden, ya que vienen enlistados sin orden
      const categorizedProductArray = reorganizeByCategory(jsonData.list);

      // una vez tenemos el array, lo podemos pasar al contexto global
      setProducts(categorizedProductArray);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para modificar los productos en el contexto
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  return (
    <ProductsContext.Provider value={{ products, updateProducts }}>
     
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </nav>

          <Routes>
            {/* Asegúrate de importar y definir correctamente el componente HomePage */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsSection />} />
          </Routes>
          
        </div>
      
       
      </Router>
      
    </ProductsContext.Provider>
  );
}

export default App;



function HomePage() {








  return (
    <div>
      <Header/>
      <HeaderBanner connectorType="homeConnector" />
      <CategoryHomeSlider categoryType={1} categoryTitle="Productos Top." />
      <ExtraServicesHomeSection />
      <CategoryHomeSlider categoryType={2} categoryTitle="Nueva Colección." specialClass="home-category-slider__pre-footer-styles" />
      <Footer/>
    </div>
  );
}
