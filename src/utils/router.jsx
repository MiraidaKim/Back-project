import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { MainPage } from "../pages/MainPage";
import SignIn from "../features/auth/sign-in/ui/SignIn";
import { ProductsPage } from "../pages/ProductsPage/ui/ProductsPage";
import { ProductDetails } from "../pages/ProductsPage/ui/ProductDetails";
import { ProductForm } from "../pages/ProductsPage/ui/ProductForm";
import SignUp from "../features/auth/sign-up/ui/SignUp";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            { index: true, element: <MainPage /> },
            { path: 'profile', element: <></>},
            { path: '/shop', element: <ProductsPage />},
            { path: '/shop/:id', element: <ProductDetails />},
            { path: '/admin/products/new', element: <ProductForm />},
            { path: '/admin/products/:id/edit', element: <ProductForm />}
        ]
    },
    { path: 'signin', element: <SignIn />},
    { path: 'signup', element: <SignUp /> }
])