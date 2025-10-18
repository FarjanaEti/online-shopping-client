import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Rout/router'
import AuthProvider from './Provider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK)

const queryClient= new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
   <QueryClientProvider client={queryClient}>  
       <Elements stripe={stripePromise}>
          <div>
            <RouterProvider router={router} />
          </div>
        </Elements>   
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
