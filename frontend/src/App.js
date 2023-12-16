import './App.css';
import Home from './screen/home/home';
import { Navbar } from './component/navbar/navbar';
import Signin from './screen/signin/signin';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Signup from './screen/signup/signup';

function App() {

  // Configure nested routes with JSX
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
    <Route index element={<Home />} />
    <Route path='signup' element={<Signup />} />
    <Route path='signin' element={<Signin />} />
  </Route>
  )
);


  return (
    <div className="App">
        <RouterProvider router={router} />

      
    </div>
  );
}

export default App;
