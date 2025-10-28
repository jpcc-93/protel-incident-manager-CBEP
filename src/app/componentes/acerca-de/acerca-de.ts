import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acerca-de.html',
  styleUrl: './acerca-de.css'
})
export class AcercaDe {

  version: string = '1.0.0';

}
