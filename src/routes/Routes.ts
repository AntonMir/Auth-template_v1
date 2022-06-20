// interfaces
import IRoute from "@interfaces/IRoute";
// components
import AuthPage from "@pages/AuthPage";
import TempPage from "@pages/TempPage";


export const publicRoutes: IRoute[] = [
    {path: '/auth/*', component: AuthPage}
] 

export const privateRoutes: IRoute[] = [
    {path: '/temp/*', component: TempPage}
]