import { Component, HostListener, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentClass: string | undefined;

  constructor(
    private platform: Platform, 
    private router:Router
    ) {}
  isSmallScreen:boolean = false

  ngOnInit() {
    this.updateClass();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateClass();
  }

  updateClass() {
    this.isSmallScreen = this.platform.width() < 768; // Ajusta el valor según tu criterio de tamaño

    this.currentClass = this.isSmallScreen ? 'clase-pequena' : 'clase-grande';
  }

  navigate(route:string){
    this.router.navigate([route]);
  }
  
}
