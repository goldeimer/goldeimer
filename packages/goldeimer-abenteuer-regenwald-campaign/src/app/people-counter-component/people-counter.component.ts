import { Component } from '@angular/core';

@Component({
  selector: 'app-people-counter',
  templateUrl: './people-counter.component.html'
})
export class PeopleCounterComponent {


  public peopleCounter = 152;

  //You'll find this piece of code also in personal-counter.component & res-counter.component - "write everything just once!" J. Pille, 2020
  counterOptions = {
      
    duration: 5,
    separator: '.',
    decimal: ',',
  };
}
