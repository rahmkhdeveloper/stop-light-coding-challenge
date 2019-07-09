import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stop light logic';

  //setTimeout vairable for changeColor
  changeColour;
  //setTimeout vairable for toggleColor
  toggleColour;
  //toggles on button click
  toggle = true;

  //array of signals to be displayed along with message and respective colors
  signals = [
    {switch: false, color: 'red', message: 'Move east/west'},
    {switch: false, color: 'orange', message: 'Waiting....'},
    {switch: true, color: 'green', message: 'Move north/south'}
  ];

  //on init life-cycle hook
  ngOnInit() {
    this.changeColor(this.signals[2].color, !this.signals[2].switch);
  }

  //this method is called to change the color of signals
  changeColor(color, toggle) {
    this.changeColour = setTimeout(()=>{
      this.signals[1].switch = true;
      if(color == this.signals[2].color) {
        this.signals[2].switch = false;
      }
      else {
        this.signals[0].switch = false;
      }
      this.setToggle(!toggle);
    }, 4500);
  }

  //sets the color index based on toggle boolean value
  setToggle(toggle) {
    (toggle) ? this.toggleColor(toggle, 0) : this.toggleColor(toggle, 2);
  }

  //sets the yellow color to animate from red to green or visa-versa
  toggleColor(toggle, colorIndex) {
    this.toggleColour = setTimeout(()=>{
      this.signals[colorIndex].switch = !this.signals[colorIndex].switch;
      this.signals[1].switch = false;
      this.changeColor(this.signals[colorIndex].color, toggle);
    }, 500);
  }

  //change color based pn button click from red to green or visa-versa
  switchColor(toggle) {
    clearTimeout(this.toggleColour);
    clearTimeout(this.changeColour);

    this.signals[0].switch = false;
    this.signals[1].switch = true;
    this.signals[2].switch = false;

    this.toggle = !toggle;
    this.setToggle(toggle);
  }
}
