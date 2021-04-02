import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';



const MaterialComponents = [
  MatButtonModule,
  MatCardModule,
  MatRadioModule,
  MatIconModule,
  MatFormFieldModule
]

@NgModule({

  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialsModule { }
