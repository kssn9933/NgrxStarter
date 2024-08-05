import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserContainerComponent } from './components/user-container/user-container.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UserContainerComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

// Can utilize lazy loading for all our Standalone components