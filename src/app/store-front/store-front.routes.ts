
import { Routes } from '@angular/router';
import { StoreFrontLayout } from './layout/store-front-layout/store-front-layout';
import { HomePage } from './pages/home-page/home-page';
import { FunPage } from './pages/fun-page/fun-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { ProductPage } from './pages/product-page/product-page';




export const storeFrontRoutes: Routes = [
  {
    path: '',
    component:StoreFrontLayout,
    children: [
      {
        path: '',
        component:HomePage
      },
      {
        path: 'fun/:fun',
        component:FunPage,
      },
      {
        path:'product/:idSlug',
        component:ProductPage
      },
      {
        path: '**',
        component:NotFoundPage,
      },

    ],
  },
    {
      path: '**',
      redirectTo:'',
    },
];
export default storeFrontRoutes;
