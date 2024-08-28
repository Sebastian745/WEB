import { Component } from '@angular/core';
import { evaluate } from 'mathjs';  

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  display: string = '';

  addToDisplay(value: string) {
    this.display += value;
  }

  calculate() {
    try {
      this.display = evaluate(this.display).toString();  
    } catch (e) {
      this.display = 'Error';
    }
  }

  clear() {
    this.display = '';
  }
}
