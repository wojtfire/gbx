import { NgModule } from '@angular/core';
import { InputTextComponent } from './forms/input-text';
import { BaseComponent } from './component/base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ FormsModule, ReactiveFormsModule ],
  declarations: [ BaseComponent, InputTextComponent ],
  exports: [ InputTextComponent ]
})
export class SharedModule { }
