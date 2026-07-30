import { createBrowserRouter } from "react-router-dom";

import Main_layout from "../layouts/MainLayout/Main_layout";

// Pages
import Dashboard from "../pages/Dashboard";
import Worlds from "../pages/Worlds";
import Skins from "../pages/Skins";
import Ingredients from "../pages/Ingredients";
import Utilities from "../pages/Utilities";
import Settings from "../pages/Settings";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<Main_layout/>,
        children:[
            {
                index:true,
                element:<Dashboard/>
            },

            {
                path:"worlds",
                element:<Worlds/>
            },

            {
                path:"skins",
                element:<Skins/>
            },

            {
                path:"ingredients",
                element:<Ingredients/>
            },

            {
                path:"utilities",
                element:<Utilities/>
            },

            {
                path:"settings",
                element:<Settings/>
            },
        ]
    }
]);