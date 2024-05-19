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
import EditPosition from "./components/EditPosition";
import AllUsers from "./components/AllUsers";
import EditUser from "./components/EditUser";
import User from "./components/User";
import ManageEmplyees from "./components/ManageEmployees";
import AddAdmin from "./components/AddAdmin";

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
                path: "/positions",
                element: <Positions/>
            },
            {
              path: "/all-employees",
              element: <AllUsers/>
            },
            {
                path: "/position/:id",
                element: <Position/>
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
            },
            {
                path: "/admin/positions/0",
                element: <EditPosition/>,
            },
            {
                path: "/admin/positions/:id",
                element: <EditPosition/>,
            },
            {
                path: "/admin/edit-employees",
                element: <ManageEmplyees/>,
            },
            {
              path: "/admin/edit-employees/:id",
              element: <EditUser/>,
            },
            {
                path: "/user/:id",
                element: <User/>,
            },
            {
                path: "/admin/add-admin",
                element: <AddAdmin/>,
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

