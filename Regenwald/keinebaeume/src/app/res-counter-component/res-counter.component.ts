import { Component } from '@angular/core';

@Component({
  selector: 'app-res-counter',
  templateUrl: './res-counter.component.html'
})
export class ResCounterComponent {
    
    // Average water- / wood- / tp- consumption in germany
    waterCons = 35; 
    woodCons = 2.2;
    toiletPaperCons = 12.1;

    // Get this from app.component
    public peopleCounter = 152;

    // ressource counter functions
    public waterCounter() {
      return Math.round (this.peopleCounter * this.waterCons * this.toiletPaperCons);
    }

    public woodCounter() {
      return Math.round (this.peopleCounter * this.woodCons * this.toiletPaperCons);
      
    }
    
    // Counter changes
    counterOptions = {
      
      duration: 5,
      separator: '.',
      decimal: ',',
    };
    
    // Text
    peopleCounterDesc = 'gehaltene Versprechen retten'
    waterCounterDesc = 'Liter Wasser und'
    woodCounterDesc = 'Kilogramm Holz pro Jahr.'
}

