const defaultOptions = {
  text: 'shape.js',
  fontSize: '80',
  fontFamily: 'arial',
  width: 300,
  height: 150,
  radius: [1, 2],
  disperse: 4,
  duration: 0.1,
  colors: false,
  speed: 0.5
};

export default class Particles {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = Object.assign(defaultOptions, options);

    this.place = [];

    this.init();
    this.generateParticles();
    this.drawParticles();

    setInterval(this.updatePlace.bind(this), 24 / this.getRandomNumber(0, this.options.speed));
  }

  init() {
    this.ctx = this.canvas.getContext('2d');

    this.drawText();
  }

  drawText() {
    this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;
    this.ctx.fillText(this.options.text, 0, this.options.fontSize);
  }

  drawCircle(circleOptions) {
    this.ctx.beginPath();
    this.ctx.fillStyle = circleOptions.fillColor;
    this.ctx.arc(circleOptions.x, circleOptions.y, circleOptions.radius, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath;
  }

  getDataParticle(x, y, radius) {
    let color;

    if (this.options.colors) {
      color = this.options.colors[Math.floor(this.getRandomNumber(0, 3))];
    } else {
      color = `rgb(${this.getRandomColor()})`;
    }

    console.log(color);

    return {
      x: x,
      y: y,
      radius: radius,
      fillColor: color,
      growth: radius * 0.99 >= this.options.radius[0] + (this.options.radius[1] - this.options.radius[0]) / 2
    };
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  getRandomColor() {
    return [
      this.getRandomNumber(0, 255),
      this.getRandomNumber(0, 255),
      this.getRandomNumber(0, 255)
    ]
  }

  generateParticles() {
    const bufer = new Uint32Array(this.ctx.getImageData(0, 0, this.options.width, this.options.height).data.buffer);

    for (let y = 0; y < this.options.height; y += this.options.disperse) {
      for (let x = 0; x < this.options.width; x += this.options.disperse) {
        if (bufer[y * this.options.width + x]) {
          this.place.push(this.getDataParticle(x, y, this.getRandomNumber(this.options.radius[0], this.options.radius[1])));
        }
      }
    }

    this.ctx.clearRect(0, 0, this.options.width, this.options.height);
  }

  drawParticles() {
    for (let i = 0; i < this.place.length; i++) {
      this.drawCircle(this.place[i]);
    }
  }

  updatePlace() {
    for (let i = 0; i < this.place.length; i++) {
      const item = this.place[i];

      if (item.growth && item.radius < this.options.radius[1]) {
        this.place[i].radius += this.options.duration;
      } else if (item.growth && !(item.radius < this.options.radius[1])) {
        this.place[i].growth = false;
        this.place[i].radius -= this.options.duration;
      } else if (!item.growth && item.radius > this.options.radius[0]) {
        this.place[i].radius -= this.options.duration;
      } else if (!item.growth && !(item.radius > this.options.radius[0])) {
        this.place[i].growth = true;
        this.place[i].radius += this.options.duration;
      }
    }

    this.ctx.clearRect(0, 0, this.options.width, this.options.height);

    this.drawParticles();
  }
}
