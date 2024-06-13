import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, defer, RouterProvider} from "react-router-dom";
import {Cart} from "./pages/cart/cart.tsx";
import {Layout} from "./layout/Menu/Layout.tsx";
import {Product} from "./pages/Product/Product.tsx";
import {Error as ErrorPage}  from "./pages/error/error.tsx";
import axios from "axios";
import {PREFIX} from "./helpers/API.ts";
import {AuthLayout} from "./layout/Auth/AuthLayout.tsx";
import {Register} from "./pages/register/Register.tsx";
import {Login} from "./pages/login/Login.tsx";
import {RequireAuth} from "./helpers/RequireAuth.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {Success} from "./pages/Success/Success.tsx";

const Menu = lazy(() => import('./pages/menu/Menu'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth> <Layout/> </RequireAuth> ,
        children: [
            {
                path: '/',
                element: <Suspense fallback={<>Загрузка...</>}><Menu/></Suspense>
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/success',
                element: <Success/>
            },
            {
                path: '/product/:id',
                element: <Product/>,
                errorElement: <>ERROR</>,
                loader: async ({params}) => {
                    return defer({
                        data: new Promise((resolve, reject) => {
                            setTimeout(() => {
                                axios.get(`${PREFIX}/products/${params.id}`)
                                    .then(data => resolve(data))
                                    .catch(e => reject(e))
                            }, 2000)
                        })
                    })
                }
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage/>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>

  </React.StrictMode>,
)
