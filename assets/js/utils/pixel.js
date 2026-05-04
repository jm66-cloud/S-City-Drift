const Pixel = {
  drawRect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
  },
  drawText(ctx, text, x, y, color, size) {
    ctx.fillStyle = color;
    ctx.font = (size || 12) + 'px Zpix';
    ctx.textBaseline = 'top';
    ctx.fillText(text, Math.floor(x), Math.floor(y));
  },
  drawTextStroke(ctx, text, x, y, color, strokeColor, size) {
    ctx.font = (size || 12) + 'px Zpix';
    ctx.textBaseline = 'top';
    ctx.strokeStyle = strokeColor || '#000';
    ctx.lineWidth = 2;
    ctx.strokeText(text, Math.floor(x), Math.floor(y));
    ctx.fillStyle = color;
    ctx.fillText(text, Math.floor(x), Math.floor(y));
  },
  drawCandle(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
  },
  drawLine(ctx, x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.floor(x1), Math.floor(y1));
    ctx.lineTo(Math.floor(x2), Math.floor(y2));
    ctx.stroke();
  },
  clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  setPixel(canvas, x, y, color) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
  },
};
