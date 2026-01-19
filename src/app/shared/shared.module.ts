import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    CardModule,
    TagModule,
    ToastModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    MenubarModule,
    ButtonModule,
    CardModule,
    TagModule,
    ToastModule,
    HttpClientModule
  ]
})
export class SharedModule { }
