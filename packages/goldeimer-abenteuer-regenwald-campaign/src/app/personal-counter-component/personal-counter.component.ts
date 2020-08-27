import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-personal-counter',
  templateUrl: './personal-counter.component.html'
})
export class PersonalCounterComponent {
    @Input() newlyGivenPledgeCount: number = 0

    counterOptions = {
        duration: 5,
        separator: '.',
        decimal: ','
    }
}
