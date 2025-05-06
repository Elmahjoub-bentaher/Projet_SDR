// // import './App.css';
// // import React from 'react';
// // import ProductList from './components/ProductList';

// // function App() {
// //   // Example API URL - replace with your actual API endpoint
// //   const apiUrl = 'http://localhost:8080/api/products';
  
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <h1>API Data: {apiUrl}</h1>
// //       </header>
// //       <main>
// //         <ProductList apiUrl={apiUrl} />
// //       </main>
// //     </div>
// //   );
// // }

// // export default App;



// import { Outlet } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import { Routes, Route, Router } from 'react-router-dom';
// import ProductList from './components/ProductList';
// import NewProduct from './components/NewProduct';
// import ProductDetails from './components/ProductDetails';
// import './App.css';

// function App() {
//   return (
//     <div className="app">
//       <Router>
//       <Navbar />
//       <main>
//         <Routes>
//           <Route path="/" element={<ProductList />} />
//           <Route path="/products" element={<ProductList />} />
//           <Route path="/products/new" element={<NewProduct />} />
//           <Route path="/products/:id" element={<ProductDetails />} />
//         </Routes>
//       </main>
//       </Router>
//       <footer>
//         <p>© 2025 Your Store</p>
//       </footer>
//     </div>
//   );
// }

// export default App;
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />  
       <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2025 Your Storerr</p>
      </footer>
    </div>
  );
}
export default App;