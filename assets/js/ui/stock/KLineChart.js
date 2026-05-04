const KLineChart = {
  render(canvasId, stock) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const pad = { top: 20, bottom: 20, left: 40, right: 10 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;
    if (!stock) { Pixel.drawText(ctx, '选择一支股票', pad.left, pad.top + 40, '#808080', 14); return; }
    const kdata = stock.kline.slice(-60);
    if (kdata.length < 2) { Pixel.drawText(ctx, stock.name + ' 暂无K线数据', pad.left, pad.top + 40, '#c0c0c0', 14); return; }
    const prices = kdata.flatMap(d => [d.high || d.price, d.low || d.price]);
    const maxP = Math.max(...prices) * 1.05;
    const minP = Math.min(...prices) * 0.95;
    const range = maxP - minP || 1;
    const candleW = Math.min(8, chartW / kdata.length);
    const gap = candleW + 1;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top); ctx.lineTo(pad.left, pad.top + chartH);
    ctx.moveTo(pad.left, pad.top + chartH / 2); ctx.lineTo(pad.left + chartW, pad.top + chartH / 2);
    ctx.stroke();
    Pixel.drawText(ctx, (maxP).toFixed(2), 2, pad.top, '#808080', 10);
    Pixel.drawText(ctx, (minP).toFixed(2), 2, pad.top + chartH - 10, '#808080', 10);
    for (let i = 0; i < kdata.length; i++) {
      const d = kdata[i];
      const x = pad.left + i * gap;
      const openY = pad.top + chartH - (d.open || d.price - minP) / range * chartH;
      const closeY = pad.top + chartH - (d.close || d.price - minP) / range * chartH;
      const highY = pad.top + chartH - (d.high || d.price - minP) / range * chartH;
      const lowY = pad.top + chartH - (d.low || d.price - minP) / range * chartH;
      const isUp = (d.close || d.price) >= (d.open || d.price);
      const color = isUp ? '#ff4444' : '#00c853';
      Pixel.drawLine(ctx, x + candleW / 2, highY, x + candleW / 2, lowY, color);
      Pixel.drawRect(ctx, x, Math.min(openY, closeY), candleW, Math.max(1, Math.abs(closeY - openY)), color);
    }
    Pixel.drawText(ctx, stock.name + ' ¥' + stock.price.toFixed(2), pad.left, 4, '#c0c0c0', 12);
  },
};
