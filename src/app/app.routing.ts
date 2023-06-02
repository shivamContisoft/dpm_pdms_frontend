import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    {
        path: '',
        component: PagesComponent, children: [
            { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'Dashboard' } },
            { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule), data: { breadcrumb: 'Profile' } },
            { path: 'uploadpdf', loadChildren: () => import('./pages/upload-pdf/upload-pdf.module').then(m => m.uploadPdfModule), data: { breadcrumb: 'UploadPdf' } },
            { path: 'olduploadpdf', loadChildren: () => import('./pages/old-upload-pdf/old-upload-pdf.module').then(m => m.OldUploadPdfModule), data: { breadcrumb: 'Old UploadPdf' } },
            { path: 'communication', loadChildren: () => import('./pages/communication/communication.module').then(m => m.CommunicationModule), data: { breadcrumb: 'communication' } },
            { path: 'issuance', loadChildren: () => import('./pages/issuance/issuance.module').then(m => m.IssuanceModule), data: { breadcrumb: 'issuance' } },
            { path: 'healthcheckup', loadChildren: () => import('./pages/health-checkup/health-checkup.module').then(m => m.HealthCheckupModule), data: { breadcrumb: 'health checkup' } },
            { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule), data: { breadcrumb: 'user' } },
            { path: 'report', loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule), data: { breadcrumb: 'reports' } }
        ]
    },
    { path: 'policy-list', loadChildren: () => import('./pages/upload-pdf/upload-pdf.module').then(m => m.uploadPdfModule), data: { breadcrumb: 'UploadPdf' } },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    { path: 'reset-password', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
    { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
            relativeLinkResolution: 'legacy',
            useHash: true
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }