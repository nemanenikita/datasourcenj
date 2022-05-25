import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { TesteComponent } from "./teste/teste.component";
import { ApiInterceptor } from './interceptor/api.interceptor';
// var styleDrawflow = require("drawflow/dist/drawflow.min.css");

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, HelloComponent, TesteComponent],
  bootstrap: [AppComponent],
  entryComponents: [TesteComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ]
})

export class AppModule {}
