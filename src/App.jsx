import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Components/Layout/Layout";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Cart from "./Pages/Cart/Cart";
import Brands from "./Pages/Brands/Brands";
import Signup from "./Pages/Signup/Signup";
import Categories from "./Pages/Categories/Categories";
import Checkout from "./Pages/Checkout/Checkout";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import SearchProduct from "./Pages/SearchProduct/SearchProduct";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import Wishlist from "./Pages/WishList/WishList";
import { ToastContainer } from "react-toastify";
import { ProductsProvider } from "./context/Product.context";
import { CategoriesProvider } from "./context/Categories.context";
import { AuthProvider } from "./context/Auth.context";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { CartProvider } from "./context/Cart.context";
import OfflineScreen from "./Components/OfflineScreen/OfflineScreen";
import { BrandsProvider } from "./context/Brands.context";
import VerifyResetCode from "./Pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { SubCategoriesProvider } from "./context/subCategories.contex";
import { WishlistProvider } from "./context/Wishlist.context";
import CategoryProducts from "./Pages/CategoryProducts/CategoryProducts";
import ProductSearch from "./Components/ProductSearch/ProductSearch";
export default function App() {
  //nesting router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "brands",
          element: <Brands />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "category/:id",
          element: <CategoryProducts />,
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },

        {
          path: "forgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "verify-code",
          element: <VerifyResetCode />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "home",
          element: <Home />,
        },

        {
          path: "product/:id",
          element: <ProductDetails />,
        },
        {
          path: "search-product",
          element: <SearchProduct />,
        },
        {
          path: "/search",
          element: <ProductSearch />,
        },
        {
          path: "verifyEmail",
          element: <VerifyEmail />,
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <OfflineScreen>
        <AuthProvider>
          <CartProvider>
            <ProductsProvider>
              <WishlistProvider>
                <CategoriesProvider>
                  <SubCategoriesProvider>
                    <BrandsProvider>
                      <RouterProvider router={router} />
                      <ToastContainer
                        position="top-center"
                        autoClose={1000}
                        closeButton={false}
                        closeOnClick={true}
                      />
                    </BrandsProvider>
                  </SubCategoriesProvider>
                </CategoriesProvider>
              </WishlistProvider>
            </ProductsProvider>
          </CartProvider>
        </AuthProvider>
      </OfflineScreen>
    </>
  );
}
