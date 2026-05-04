class Message {
  constructor(from, to, content, type = 'text') {
    this.id = Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    this.from = from;
    this.to = to;
    this.content = content;
    this.type = type;
    this.timestamp = Date.now();
    this.read = false;
  }
}
