import { createContext, useContext } from 'react';
import { useProducts } from '../hooks/useProducts';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const productData = useProducts();
  return (
    <ProductContext.Provider value={productData}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}