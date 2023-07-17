import { Component, Input } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  template: `
  <path [attr.d]="randomSvg" />
  `,
  styleUrls: ['./icon.component.css']
})

export class IconComponent {
  display: any;
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  fas = fas;
  iconsMap = Object.entries(fas)
  randomNumber = Math.floor(Math.random() * this.iconsMap.length);
  @Input() randomSvg = this.iconsMap[this.randomNumber][1]

  resolver = (randomNumber: any) => new Promise(resolve => setTimeout(resolve, 3000, randomNumber))

  addTask = (() => {
    let pending = Promise.resolve();

    const run = async (randomNumber: any) => {
      try {
        await pending;
      } finally {
        return this.resolver(randomNumber)
      }
    }
    // @ts-ignore
    return (randomNumber: any) => (pending = run(randomNumber))
  })();

  async getRandom() {
    console.log('waiting for new random icon')
    const randomNumber =  Math.floor(Math.random() * this.iconsMap.length)
    try {
      await this.addTask(randomNumber)
    } finally {
      this.randomSvg = this.iconsMap[randomNumber][1]
      if (!this.display) {
        this.display = true
      }
    }
  }
}
