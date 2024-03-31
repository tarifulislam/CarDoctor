import {createBrowserRouter} from "react-router-dom";
import Layout from './../Layout/Layout';
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/Forms/SignIn";
import SignUp from "../Pages/Forms/SignUp";
import Blog from "../Pages/Blog/Blog";
import About from "../Pages/About/About";
import Cources from "../Pages/Cources/Cources";
import ServiceDetails from "../components/Services/ServiceDetails";
import PrivateRoutes from "./PrivateRoutes ";
import Bookings from "../Pages/Bookings/Bookings";
import CheckOut from "../components/Services/CheckOut";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
        {
            path: "/",
            element : <Home></Home>
        },
        {
            path: "/blog",
            element : <Blog></Blog>
        },
        {
            path: "/about",
            element : <About></About>
        },
        {
            path: "/cources",
            element : <Cources></Cources>
        },
        {
            path: 'checkout/:id',
            element: <CheckOut></CheckOut>,
            loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
            path: "/bookings",
            element : <Bookings></Bookings>
        },

        {
            path: "/servicedetails/:id",
            element : <PrivateRoutes><ServiceDetails></ServiceDetails></PrivateRoutes> ,
            loader: ({params})=> fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
            path: "/signin",
            element : <SignIn></SignIn>
        },
        {
            path: "/signup",
            element : <SignUp></SignUp>
        }
    ]
  },
]);
export default myRouter;