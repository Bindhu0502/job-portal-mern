import React from "react";

import ReactDOM from "react-dom/client";


import {
  BrowserRouter
} from "react-router-dom";


import {
  Toaster
} from "react-hot-toast";



import App from "./App.jsx";



import {
  AuthProvider
} from "./context/authcontext.jsx";



import {
  NotificationProvider
} from "./context/NotificationContext.jsx";



import {
  ThemeProvider
} from "./context/ThemeContext.jsx";



import "./index.css";








ReactDOM.createRoot(

document.getElementById("root")

)

.render(



<React.StrictMode>



<ThemeProvider>



<BrowserRouter>



<AuthProvider>



<NotificationProvider>



<App />



</NotificationProvider>



</AuthProvider>



</BrowserRouter>



</ThemeProvider>






<Toaster


position="top-right"


toastOptions={{


duration:4000,


style:{


fontSize:"14px"


}


}}


/>






</React.StrictMode>


);