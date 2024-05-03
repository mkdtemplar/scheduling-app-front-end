import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Schedules from "./components/Schedules";
import AnnualLeaveRequest from "./components/AnnualLeaveRequest";
import ManageSchedules from "./components/ManageSchedules";
import Positions from "./components/Positions";
import AddPosition from "./components/AddPosition";
import AddEmployee from "./components/AddEmployee";
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import Position from "./components/Position";
import ManagePosition from "./components/ManagePosition";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <Home/>},
            {
                path: "/schedules",
                element: <Schedules />,
            },
            {
                path: "/schedule/:id",
                element: <Schedule />,
            },
            {
                path: "/annual-leave-request",
                element: <AnnualLeaveRequest />,
            },
            {
                path: "/admin",
                element: <ManageSchedules/>,
            },
            {
                path: "/admin/position/all-positions",
                element: <Positions/>
            },
            {
                path: "/positions/:id",
                element: <Position/>
            },
            {
                path: "/admin/add-position",
                element: <AddPosition />,
            },
            {
                path: "/admin/add-employees",
                element: <AddEmployee/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/admin/manage-position",
                element: <ManagePosition/>,
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

