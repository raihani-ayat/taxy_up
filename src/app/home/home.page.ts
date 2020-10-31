import { Component, OnInit,ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('slides') slides: IonSlides;

  constructor( ) { }

  ngOnInit() {
  }

  SlideNext(){
    this.slides.slideNext();
  }
  SlidePrev(){
    this.slides.slidePrev();
  }

}
