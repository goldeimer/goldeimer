
import { Component, NgModule, HostListener} from '@angular/core'
import { DeviceDetectorService } from 'ngx-device-detector'

import { ApiService } from './app.api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    constructor(private apiService: ApiService) { }

    textpromise = 'Menschen versprechen bereits:'
    headline = 'Keine Bäume für den Arsch!';
    texxxxtmain = '2,2kg Holz werden für 1kg Zellstoff-Papier benötigt. Das wächst auf Plantagen, die für die Zerstörung von Urwäldern und die Reduzierung der Artenvielfalt mitverantwortlich sind. Anschließend legt der daraus gewonnene Zellstoff eine Reise von bis zu 11.000km zurück - aus Skandinavien und Südamerika - bevor er unter hohem Wasser- und Energieaufwand zu Papier wird. Das alles für fünf Sekunden Abwischen.';
    textquestion = 'Mein Versprechen an mich und die Umwelt:';
    buttonpromise = 'Versprechen geben';
    buttonActive = false;

    private incrementBackendPeopleCounter = () => {
        this.apiService.incrementPeopleCounter().subscribe((value) => {
            console.log(
                "PUT call successful value returned in body",
                value
            )
        });
    }

    public peopleCounter = 3000

    public campaignGoal = 10000

    counterOptions = {
        duration: 5,
        separator: '.',
        decimal: ',',
    }

    counterOptionsFreezed = {
        duration: 0,
        separator: '.',
        decimal: ',',
    }

    /// TODO: Implement alternative:
    /// https://www.npmjs.com/package/ngx-device-detector

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event) {
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

        const treesBg = document.getElementById('trees-bg');
            treesBg.style.transition = "0s";

        //Viewport Farbänderung über komplettes Viewportfenster von (255,229,0) zu (169,202,84)
        var r = Math.round(255 - ((event.clientY * 86 / viewportHeight) *1));
        var g = Math.round(229 - ((event.clientY * 27 / viewportHeight) *1));
        var b = Math.round(0 + ((event.clientY * 84 / viewportHeight)/1));
        var rgb = "("+r+","+g+","+b+")";

        //Farbänderung auf Element übertragen
        backgroundElement.style.backgroundColor = "rgb"+rgb;

        //Baumposition verändern
        var treePosVert = -100 + (80*(event.clientY / viewportHeight));
        var treePosHor = -50 + (10*(event.clientY / viewportHeight));
        var treesRotLeft = -10 + (10*(event.clientY / viewportHeight));
        var treesRotRight = 10 - (10*(event.clientY / viewportHeight));

        //Baumposition in Css überschreiben
        treesLeft.style.bottom = treePosVert+"%";
        treesLeft.style.left = treePosHor+"%";
        treesLeft.style.transform = "rotate("+treesRotLeft+"deg)";

        treesRight.style.bottom = treePosVert+"%";
        treesRight.style.left = "-"+treePosHor+"%";
        treesRight.style.transform = "rotate("+treesRotRight+"deg)";

        treesBg.style.bottom = treePosVert+"%";
        }
    }

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        var scrollHeight = window.pageYOffset;
        var viewportWidth = window.innerWidth;

        if (viewportWidth < 992 && this.buttonActive == false) {
            const backgroundElement = document.getElementById('Background');
            backgroundElement.style.transition = "1s ease";

            const treesLeft = document.getElementById('trees-left');
            treesLeft.style.transition = "1s ease";

            const treesRight = document.getElementById('trees-right');
            treesRight.style.transition = "1s ease";

            const treesBg = document.getElementById('trees-bg');
            treesBg.style.transition = "1s ease";

            // Wenn gescrollt wird, dann Farbveränderung und Bäume reinholen
            if (scrollHeight != 0)
            {
                treesLeft.style.bottom = "-10%";
                treesLeft.style.left = "-40%";
                treesRight.style.bottom = "-10%";
                treesRight.style.right = "-40%";
                treesLeft.style.transform = "rotate(5deg)";
                treesRight.style.transform = "rotate(-5deg)";
                treesBg.style.bottom = "-10%";

                backgroundElement.style.backgroundColor = "rgb(169,202,84)";
            }
            else
            {
                treesLeft.style.bottom = "-100%";
                treesLeft.style.left = "-50%";
                treesRight.style.bottom = "-100%";
                treesRight.style.right = "-50%";
                treesLeft.style.transform = "rotate(-5deg)";
                treesRight.style.transform = "rotate(5deg)";
                treesBg.style.bottom = "-100%";

                backgroundElement.style.backgroundColor = "rgb(255,229,0)";
            }
        }
    }

    // Fires when button gets pressed.
    // peopleCounter should get updated in the database.
    // refresh peopleCounter in web.app
    // show some kind of subtile success-animation on the peopleCounter.
    // set cookie and disable button forever and ever 1000 years
    public onParticipationIntent = () => {
        this.incrementBackendPeopleCounter()

        this.buttonActive = true
        const MovingBoard = document.getElementById('Movingboard');
        const backgroundElement = document.getElementById('Background');

        MovingBoard.style.left = "-100%";

        const treesLeft = document.getElementById('trees-left');
          treesLeft.style.transition = "1s ease";

        const treesRight = document.getElementById('trees-right');
        treesRight.style.transition = "1s ease";

        const treesBg = document.getElementById('trees-bg');
        treesBg.style.transition = "1s ease";

        treesLeft.style.bottom = "-100%";
        treesLeft.style.left = "-50%";
        treesRight.style.bottom = "-100%";
        treesRight.style.right = "-50%";
        treesBg.style.bottom = "-100%";

        backgroundElement.style.backgroundColor = "rgb(169,202,84)";
    }

    copyMessage(val: string){
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);

        const copyButton = document.getElementById('copy-button');
        copyButton.textContent = "Link kopiert";
        copyButton.style.backgroundColor="#ffe500"
    }

/// ---- PANEL 2 ---------------------------------------------------------------

    headline2 = 'Du musst es auch so meinen!';

    // Counter, how many promises are still needed (10.000 goal)
    public promiseCounterText() {

        if (this.peopleCounter < this.campaignGoal) {
        return 'Hilf uns dabei, weitere';
        } else {
        return 'Dieses Ziel haben wir erreicht. Hilf uns dabei, weitere '
        }
    }

    public promiseCounterNumber(number) {

        var promiseCounterNumber = this.campaignGoal - this.peopleCounter;

        /// TODO:
        /// Clean-up messy conditional-brnaching.
        if (number == 1) {

        if (this.peopleCounter < this.campaignGoal) {
            return promiseCounterNumber;
        } else {
            return this.campaignGoal;
        }
        } else if (number == 2) {
        if (this.peopleCounter < this.campaignGoal) {
            return promiseCounterNumber *35*12.1;
        } else {
            return this.campaignGoal *35*12.1;
        }
        } else if (number == 3) {
        if (this.peopleCounter < this.campaignGoal) {
            return promiseCounterNumber *2.2*12.1;
        } else {
            return this.campaignGoal *2.2*12.1;
        }
        } else {
        return '';
        }
    }
}
