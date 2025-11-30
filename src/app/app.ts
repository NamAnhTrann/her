import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import 'preline/preline';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('her');
  currentSong = signal('');
  isEasterEgg = signal(false);

  public audio = new Audio();
  private i = 0;

  isCollapsed = signal(false);
  isMusicOn = signal(false);

  private currentPlaylist: string[] = [

    'songs/do flowers bloom where you walk_.mp3',
    'songs/forward.mp3',
    'songs/and still, the sky waited.mp3',
    
  ];

  showPlayHint = signal(false);
  private firstClickListenerAdded = false;

  ngOnInit(): void {
    this.audio.preload = 'auto';
    this.audio.loop = false;
    this.audio.volume = 0.3; 

    this.setPlaylist(this.currentPlaylist);

    this.audio.addEventListener('ended', () => {
      this.next();
    });

    // 🔹 Add one-time listener for first user click
    if (!this.firstClickListenerAdded) {
      document.addEventListener('click', this.handleFirstClick, { once: true });
      this.firstClickListenerAdded = true;
    }
  }

private handleFirstClick = () => {
  // Just unlock audio; do NOT restart the song
  this.audio.play().then(() => {
    this.isMusicOn.set(true);
  });
};



  private setPlaylist(list: string[]) {
    if (!list.length) return;
    this.currentPlaylist = list;
    this.load(this.i);
  }

private load(index: number) {
  if (!this.currentPlaylist?.length) return;

  this.i = ((index % this.currentPlaylist.length) + this.currentPlaylist.length) % this.currentPlaylist.length;

  this.audio.src = this.currentPlaylist[this.i]; // ONLY SET SOURCE

  const raw = this.currentPlaylist[this.i].split('/').pop() ?? '';
  this.currentSong.set(raw.replace(/\.[^/.]+$/, ''));
}


  private next() {
    if (!this.currentPlaylist.length) return;
    this.load(this.i + 1);
    this.play();
  }

  private async play() {
    try {
      await this.audio.play();
    } catch {
      this.showPlayHint.set(true);
    }
  }

  public pause() {
    this.audio.pause();
    this.isMusicOn.set(false);
  }

  public resume() {
    this.play();
    this.isMusicOn.set(true);
  }

  public toggleMusic() {
    if (this.isMusicOn()) {
      this.pause();
    } else {
      this.resume();
    }
  }
}


