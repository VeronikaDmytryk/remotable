import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { InterviewsComponent } from 'app/interviews/interviews';
import { ReportsComponent } from 'app/reports/reports';
import { CandidateComponent } from 'app/candidate/candidate';
import { HeaderComponent } from 'app/header/header';
import { MenuComponent } from 'app/menu/menu';
import { ModalComponent } from 'app/modal/modal';
import { InterviewsPipe } from 'app/interviews/pipes/interviews-search';
import { OrderByPipe } from 'app/interviews/pipes/order-by';
import { InterviewsService } from 'app/interviews/services/interviews-service';
import { CandidatesService } from 'app/candidate/candidate-service';
import { SearchService } from 'app/interviews/services/seach-service';

let routes: Routes = [
  { path: "interviews", component: InterviewsComponent },
  { path: "reports", component: ReportsComponent },
  { path: "candidates/:id", component: CandidateComponent},
  { path: '**',  redirectTo: 'interviews'}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InterviewsComponent,
    MenuComponent,
    ReportsComponent,
    ModalComponent,
    CandidateComponent,
    InterviewsPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ChartsModule
  ],
  providers: [InterviewsService, CandidatesService, SearchService],
  bootstrap: [AppComponent]
})

export class AppModule { }
