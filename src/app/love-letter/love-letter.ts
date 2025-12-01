import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-love-letter',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './love-letter.html',
  styleUrl: './love-letter.scss',
})
export class LoveLetter implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initConfetti();
  }

  initConfetti(): void {
    const canvas = document.getElementById('confettiCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const confettiCount = 180;
    const confetti: any[] = [];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * W,
        y: Math.random() * H - H,
        r: Math.random() * 6 + 4,
        d: Math.random() + 1,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      confetti.forEach((c) => {
        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.ellipse(c.x, c.y, c.r, c.r / 2, c.tiltAngle, 0, Math.PI * 2);
        ctx.fill();
      });

      update();
      requestAnimationFrame(draw);
    };

    const update = () => {
      confetti.forEach((c, i) => {
        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.d) + c.r + 1) * 0.7;
        c.x += Math.sin(c.d);

        if (c.y > H + 20) {
          confetti[i] = {
            ...c,
            x: Math.random() * W,
            y: -10
          };
        }
      });
    };

    window.addEventListener('resize', () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    });

    draw();
  }
}
