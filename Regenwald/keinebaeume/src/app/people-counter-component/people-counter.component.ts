import { Component } from '@angular/core';

@Component({
  selector: 'app-people-counter',
  templateUrl: './people-counter.component.html'
})
export class PeopleCounterComponent {

  public peopleCounter = 152;

  counterOptions = {
      
    duration: 5,
    separator: '.',
    decimal: ',',
  };
}
