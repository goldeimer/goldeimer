
import { Component, NgModule, HostListener} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  textpromise = 'Menschen versprechen bereits:'
  headline = 'Keine Bäume für den Arsch!';
  texxxxtmain = '2,2kg Holz werden für 1kg Zellstoff-Papier benötigt. Das wächst auf Plantagen, die für die Zerstörung von Urwäldern und die Reduzierung der Artenvielfalt mitverantwortlich sind. Anschließend legt der daraus gewonnene Zellstoff eine Reise von bis zu 11.000km zurück - aus Skandinavien und Südamerika - bevor er unter hohem Wasser- und Energieaufwand zu Papier wird. Das alles für fünf Sekunden Abwischen.';
  textquestion = 'Mein Versprechen an mich und die Umwelt:';
  buttonpromise = 'Versprechen geben';
  buttonActive = false;
  
// Use this var in res-counter, people-counter and personal-counter
  public peopleCounter = 152;

// Campagn Goal, how many people we want to reach?
  public campagnGoal = 10000;

  // Counter changes
  counterOptions = {
      
    duration: 5,
    separator: '.',
    decimal: ',',
  };

  counterOptionsFreezed = {
      
    duration: 0,
    separator: '.',
    decimal: ',',
  };
  
/* Pille, please implement this solution, if necessary, instead of viewportWidth-Solution in mousemove and scroll event.
https://www.npmjs.com/package/ngx-device-detector
*/

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    
    //Browserfenster ausmessen
    var viewportHeight = window.innerHeight;
    var viewportWidth = window.innerWidth;

    if (viewportWidth >= 992 && this.buttonActive == false) {

      //Transitions wegnehmen für Effekt simultan zur Mausbewegung
      const backgroundElement = document.getElementById('Background');
      backgroundElement.style.transition = "0s";
  
      const treesLeft = document.getElementById('trees-left');
        treesLeft.style.transition = "0s";
  
      const treesRight = document.getElementById('trees-right');
        treesRight.style.transition = "0s";

      //Viewport Farbänderung über komplettes Viewportfenster von (255,229,0) zu (169,202,84)
      var r = Math.round(255 - ((e.clientY * 86 / viewportHeight) *1));
      var g = Math.round(229 - ((e.clientY * 27 / viewportHeight) *1));
      var b = Math.round(0 + ((e.clientY * 84 / viewportHeight)/1));
      var rgb = "("+r+","+g+","+b+")";
      
      //Farbänderung auf Element übertragen
      backgroundElement.style.backgroundColor = "rgb"+rgb;

      //Baumposition verändern
      var treePosVert = -100 + (80*(e.clientY / viewportHeight));
      var treePosHor = -50 + (10*(e.clientY / viewportHeight));
      var treesRot = -5 + (10*(e.clientY / viewportHeight));
      
      //Baumposition in Css überschreiben
      treesLeft.style.bottom = treePosVert+"%";
      treesLeft.style.left = treePosHor+"%";
      treesLeft.style.transform = "rotate("+treesRot+"deg)";

      treesRight.style.bottom = treePosVert+"%";
      treesRight.style.left = "-"+treePosHor+"%";
      treesRight.style.transform = "rotate(-"+treesRot+"deg)";
    } 
  }
  
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(f) {
  
    //Scroll messen und auf Variable schreiben
    var scrollHeight = window.pageYOffset;
    var viewportWidth = window.innerWidth;

    if (viewportWidth < 992 && this.buttonActive == false) {

    //Transition hinzufügen
    const backgroundElement = document.getElementById('Background');
    backgroundElement.style.transition = "0.5s ease";

    const treesLeft = document.getElementById('trees-left');
      treesLeft.style.transition = "0.5s ease";

    const treesRight = document.getElementById('trees-right');
      treesRight.style.transition = "0.5s ease";
      

    // Wenn gescrollt wird, dann Farbveränderung und Bäume reinholen  
    if (scrollHeight != 0){

      treesLeft.style.bottom = "-10%";
      treesLeft.style.left = "-40%";
      treesRight.style.bottom = "-10%";
      treesRight.style.right = "-40%"; 
      treesLeft.style.transform = "rotate(5deg)";
      treesRight.style.transform = "rotate(-5deg)";
      backgroundElement.style.backgroundColor = "rgb(169,202,84)";
    } else {
        
      treesLeft.style.bottom = "-100%";
      treesLeft.style.left = "-50%";
      treesRight.style.bottom = "-100%";
      treesRight.style.right = "-50%"; 
      treesLeft.style.transform = "rotate(-5deg)";
      treesRight.style.transform = "rotate(5deg)";
      backgroundElement.style.backgroundColor = "rgb(255,229,0)";
      }
    }

    
    }

    // Fires when button gets pressed. 
    // peopleCounter should get updated in the database. 
    // refresh peopleCounter in web.app
    // show some kind of subtile success-animation on the peopleCounter.
    // set cookie and disable button forever and ever 1000 years


      public givePromise() {

        this.buttonActive = true;
        const MovingBoard = document.getElementById('Movingboard');
        const backgroundElement = document.getElementById('Background');
        
        MovingBoard.style.left = "-100%";
      
        const treesLeft = document.getElementById('trees-left');
          treesLeft.style.transition = "1s ease";
    
        const treesRight = document.getElementById('trees-right');
          treesRight.style.transition = "1s ease";
    
          treesLeft.style.bottom = "-100%";
          treesLeft.style.left = "-50%";
          treesRight.style.bottom = "-100%";
          treesRight.style.right = "-50%"; 
          backgroundElement.style.backgroundColor = "rgb(169,202,84)";
          
  }










//PANEL 2

  headline2 = 'Du musst es auch so meinen!';
  textmain2 = '';
  
  
  
  
  
  
  // Counter, how many promises are still needed (10.000 goal)
  public promiseCounterText() {

    if (this.peopleCounter < this.campagnGoal) {
      return 'Hilf uns dabei, weitere';
    } else {
      return 'Dieses Ziel haben wir erreicht! Wir wollen jedoch noch so viele Menschen wie möglich erreichen! Hilf uns dabei, weitere '
    }
  }

  public promiseCounterNumber(number) {
    
    var promiseCounterNumber = this.campagnGoal - this.peopleCounter;

    if (number == 1) {

      if (this.peopleCounter < this.campagnGoal) {
        return promiseCounterNumber;
      } else {
        return this.campagnGoal;
      }
    } else if (number == 2) {
      if (this.peopleCounter < this.campagnGoal) {
        return promiseCounterNumber *35;
      } else {
        return this.campagnGoal *35;
      }
    } else if (number == 3) {
      if (this.peopleCounter < this.campagnGoal) {
        return promiseCounterNumber *2.2;
      } else {
        return this.campagnGoal *2.2;
      }
    } else {
      return '';
    }
    
  }
  
  

}


