import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import AOS from 'aos';
import TypeIt from 'typeit';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Homepage implements AfterViewInit {

  ngAfterViewInit(): void {
    AOS.init({
      duration: 1200,
      once: true
    });

    new TypeIt("#typewriterTarget", {
      speed: 45,
      waitUntilVisible: true,
      lifeLike: true,
      cursorChar: "|",
    })
      .type("I said I was going to give you a blue bunny on your next birthday,")
      .break()
      .type("I don't intend to break that promise.")
      .break()
      .type("I also wanna make new stuff on your birthday or other occasions for you.")
      .break()
      .type("It also helps a lot with getting better at programming so its a win win  ")
      .type("ദ്ദി ˉ͈̀꒳ˉ͈́ ✧")
      .go();
  }

  
}