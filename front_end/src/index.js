import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import ProductList from './components/ProductList'
import NewProduct from './components/NewProduct'
import ProductDetails from './components/ProductDetails'
import ErrorPage from './components/ErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true,
        element: <ProductList />,
        loader: async () => {
          const response = await fetch('http://localhost:8080/api/products');
          if (!response.ok) throw new Error('Failed to fetch products');
          return response.json();
        }
      },
      { path: "",
        element: <ProductList /> , 
        loader: async () => {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
        }
      },
      { path: "products/new", element: <NewProduct /> },
      { 
        path: "products/:id", 
        element: <ProductDetails />,
        loader: ({ params }) => 
          fetch(`http://localhost:8080/api/products/${params.id}`).then(res => res.json())
      }
    ],
  },
  {
    path: "products",
    element: <ProductList /> , 
    loader: async () => {
      const response = await fetch('http://localhost:8080/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
      }
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
