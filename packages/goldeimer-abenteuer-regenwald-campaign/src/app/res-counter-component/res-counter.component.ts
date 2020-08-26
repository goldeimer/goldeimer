import { Component, OnInit } from '@angular/core'
import { ApiService } from '../app.api.service'

@Component({
  selector: 'app-res-counter',
  templateUrl: './res-counter.component.html'
})
export class ResCounterComponent implements OnInit {
    constructor(private apiService: ApiService) { }

    loading: boolean = true
    peopleCounter: any = null

    ngOnInit() {
        this.fetchBackendPeopleCounter()
    }

    private fetchBackendPeopleCounter = () => {
        this.apiService.getPeopleCounter().subscribe((response) => {
            this.loading = false
            this.peopleCounter = response['value'] || 0
        })
    }

    // Average water- / wood- / tp- consumption in germany
    waterCons = 35;
    woodCons = 2.2;
    toiletPaperCons = 12.1;

    // ressource counter functions
    public waterCounter() {
      return Math.round ((this.peopleCounter || 0) * this.waterCons * this.toiletPaperCons);
    }

    public woodCounter() {
      return Math.round ((this.peopleCounter || 0) * this.woodCons * this.toiletPaperCons);
    }

    // Counter changes
    counterOptions = {

      duration: 5,
      separator: '.',
      decimal: ',',
    };

    // Text
    peopleCounterDesc = 'gehaltene Versprechen retten'
    waterCounterDesc = 'Wasser und'
    woodCounterDesc = 'Holz pro Jahr.'
}
