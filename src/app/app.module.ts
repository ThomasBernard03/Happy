import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { SharedModule } from './shared/shared.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CodemirrorModule,
    SharedModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}
