import { createBrowserRouter } from "react-router-dom";
import Loginpage from '../pages/Loginpage'
import StaffListPage from '../pages/ListingPages/StaffListPage'
import InquiryListPage from '../pages/ListingPages/InquiryListPage'
import StudentListPage from '../pages/ListingPages/StudentListPage'
import CourseListPage from "../pages/ListingPages/CourseListPage";
import LandingPage from "../pages/LandingPage";
import CardOverView from '../pages/CardOverView'
import Layout from "../pages/Layout";
import BatchListPage from "../pages/ListingPages/BatchListPage";
import ErrorPage from "../components/ErrorPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../utils/ProtectedRoute";
import AssignmentPage from "../pages/ListingPages/AssignmentPage";
import QandAPage from "../pages/QandAPage";
import QuestionDetails from "../components/QandA/QuestionDetails"; 




export const router = createBrowserRouter([

    {
        element: <ProtectedRoute> <Layout /></ProtectedRoute>
        , children: [

            { path: '/', element: <ProtectedRoute><LandingPage /></ProtectedRoute> },

            { path: '/mentors', element: <ProtectedRoute><StaffListPage /></ProtectedRoute> },

            { path: '/mentors/:id', element: <ProtectedRoute><CardOverView /></ProtectedRoute> },

            { path: '/inquiries', element: <ProtectedRoute><InquiryListPage /></ProtectedRoute> },

            { path: '/inquiries/:id', element: <ProtectedRoute><CardOverView /></ProtectedRoute> },

            { path: '/students', element: <ProtectedRoute><StudentListPage /></ProtectedRoute> },

            { path: '/students/:id', element: <ProtectedRoute><CardOverView /></ProtectedRoute> },

            { path: '/courses', element: <ProtectedRoute><CourseListPage /></ProtectedRoute> },

            { path: '/courses/:id', element: <ProtectedRoute><CardOverView /></ProtectedRoute> },

            { path: '/batches', element: <ProtectedRoute><BatchListPage /></ProtectedRoute> },

            { path: '/batches/:id', element: <ProtectedRoute><CardOverView /></ProtectedRoute> },

            { path: '/assignments', element: <ProtectedRoute><AssignmentPage /></ProtectedRoute> },

            { path: '/assignments/:id', element: <ProtectedRoute><CardOverView /></ProtectedRoute> },

            { path: '/q&a', element: <ProtectedRoute><QandAPage /></ProtectedRoute> },

            { path: '/q&a/:id', element: <ProtectedRoute><QuestionDetails /></ProtectedRoute> },

            { path: '/profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },



        ]
    },

    { path: '/login', element: <Loginpage /> },
    { path: '*', element: <ErrorPage /> },


])