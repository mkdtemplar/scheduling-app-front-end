import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Schedules from "./components/Schedules";
import AnnualLeaveRequest from "./components/AnnualLeaveRequest";
import Positions from "./components/Positions";
import AddPosition from "./components/AddPosition";
import AddEmployee from "./components/AddEmployee";
import Login from "./components/Login";
import DailyAssignments from "./components/DailyAssignments";
import Position from "./components/Position";
import ManagePosition from "./components/ManagePosition";
import EditPosition from "./components/EditPosition";
import AllUsers from "./components/AllUsers";
import EditUser from "./components/EditUser";
import User from "./components/User";
import ManageEmplyees from "./components/ManageEmployees";
import AddAdmin from "./components/AddAdmin";
import ManageAdmins from "./components/ManageAdmins";
import EditAdmin from "./components/EditAdmin";
import Admin from "./components/Admin";
import AllAdmins from "./components/AllAdmins";
import AddShift from "./components/AddShift";
import Shift from "./components/Shift";
import AllShifts from "./components/AllShifts";
import AddDailySchedule from './components/AddDailySchedule';
import DailySchedule from "./components/DailySchedule";
import AllDailySchedules from "./components/AllDailySchedules";

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
                element: <DailyAssignments />,
            },
            {
                path: "/annual-leave-request",
                element: <AnnualLeaveRequest />,
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
                path: "/admin/add-position",
                element: <AddPosition/>,
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
            },
            {
                path: "/admin/edit-admin",
                element: <ManageAdmins/>,
            },
            {
                path: "/admin/edit-admin/:id",
                element: <EditAdmin/>,
            },
            {
                path: "/admin/:id",
                element: <Admin/>,
            },
            {
                path: "/admin/all-admins",
                element: <AllAdmins/>,
            },
            {
                path: "/admin/add-shift",
                element: <AddShift/>,
            },
            {
                path: "/shift/:id",
                element: <Shift/>
            },
            {
                path: "/all-shifts",
                element: <AllShifts/>
            },
            {
                path: "/admin/add-daily-schedule",
                element: <AddDailySchedule/>
            },
            {
                path: "/admin/daily-schedule/:id",
                element: <DailySchedule/>
            },
            {
                path: "/admin/all-daily-schedules",
                element: <AllDailySchedules/>
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

