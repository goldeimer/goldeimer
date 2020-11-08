import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-res-counter',
  templateUrl: './res-counter.component.html'
})
export class ResultDisplay
{
    @Input() givenPledgesCount: number = 0

    // Average water- / wood- / tp- consumption in germany
    waterCons = 35;
    woodCons = 2.2;
    toiletPaperCons = 12.1;

    // ressource counter functions
    public waterCounter() {
      return Math.round ((this.givenPledgesCount || 0) * this.waterCons * this.toiletPaperCons);
    }

    public woodCounter() {
      return Math.round ((this.givenPledgesCount || 0) * this.woodCons * this.toiletPaperCons);
    }

    // Counter changes
    counterOptions = {
        duration: 5,
        separator: '.',
        decimal: ','
    }

    // Text
    peopleCounterDesc = 'gehaltene Versprechen retten'
    waterCounterDesc = 'Wasser und'
    woodCounterDesc = 'Holz pro Jahr.'
}
