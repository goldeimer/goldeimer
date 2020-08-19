import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-counter',
  templateUrl: './personal-counter.component.html'
})
export class PersonalCounterComponent {

  // Get this from app.component
  public personalCounter = 152;
  

  //You'll this piece of code also in people-counter.component & res-counter.component - - "write everything just once!" J. Pille, 2020
  counterOptions = {
      
    duration: 5,
    separator: '.',
    decimal: ',',
  };
}

