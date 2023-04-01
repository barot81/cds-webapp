import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@exxat/fusion/core';
import { LoginContainerComponent } from './container';
import { LoginScreenComponent, PasswordChangeScreenComponent, PasswordChangeSuccessScreenComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        component: LoginContainerComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'login_screen',
                pathMatch: 'full'
            },
            {
                path: 'login_screen',
                component: LoginScreenComponent,
                canActivate: [AuthGuardService],
            },
            {
                path: 'change_password',
                component: PasswordChangeScreenComponent,
                canActivate: [AuthGuardService],
            },
            {
                path: 'change_password_success',
                component: PasswordChangeSuccessScreenComponent,
                canActivate: [AuthGuardService],
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginDemoRoutingModule { }
