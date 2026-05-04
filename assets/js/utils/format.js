const Format = {
  money(v) {
    if (Math.abs(v) >= 100000000) return (v / 100000000).toFixed(2) + '亿';
    if (Math.abs(v) >= 10000) return (v / 10000).toFixed(2) + '万';
    return '¥' + Math.floor(v).toLocaleString();
  },
  moneyFull(v) { return '¥' + Math.floor(v).toLocaleString(); },
  percent(v, d = 2) { return (v >= 0 ? '+' : '') + (v * 100).toFixed(d) + '%'; },
  percentNum(v, d = 2) { return (v >= 0 ? '+' : '') + v.toFixed(d) + '%'; },
  time(h, m) {
    h = Math.floor(h); m = Math.floor(m);
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  },
  timeWithSec(h, m, s) {
    h = Math.floor(h); m = Math.floor(m); s = Math.floor(s);
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  },
  day(d) { return '第 ' + d + ' 天'; },
  short(v) {
    if (Math.abs(v) >= 100000000) return (v / 100000000).toFixed(1) + '亿';
    if (Math.abs(v) >= 10000) return (v / 10000).toFixed(1) + '万';
    return Math.floor(v).toString();
  },
  truncate(s, n = 20) { return s.length > n ? s.substring(0, n) + '...' : s; },
};
