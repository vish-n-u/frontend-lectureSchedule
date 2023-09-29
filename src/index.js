import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
 import Login from './pages/login';
 import Register from './pages/register';
 import Instructor from './pages/instructor';
 import Admin from './pages/admin';
// import Student from './pages/student';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/login",
    element:<Login/>
  }
  ,{
    path:"/register",
    element :<Register/>
  },
  {
    path:"/instructor/:id",
    element:<Instructor/>
  }
  ,
  {
    path:"/admin/:id",
    element:<Admin/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);