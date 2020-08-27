import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-people-counter',
  templateUrl: './people-counter.component.html'
})
export class PeopleCounterComponent {
    @Input() givenPledgesCount: number

    counterOptions = {
        duration: 5,
        separator: '.',
        decimal: ',',
    }
}
