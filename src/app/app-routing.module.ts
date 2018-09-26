/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from './settings/settings.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OdsConfigComponent} from './ods-config/ods-config.component';
import {OverviewComponent} from './overview/overview.component';
import {DataSourceDetailComponent} from './ods-config/components/data-source-detail/data-source-detail.component';
import {DataSourceFormComponent} from './ods-config/components/data-source.form/data-source.form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'odsConfig', component: OdsConfigComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'odsConfig/:sourceId/details', component: DataSourceDetailComponent},
  { path: 'odsConfig/newDataSource', component: DataSourceFormComponent},
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
