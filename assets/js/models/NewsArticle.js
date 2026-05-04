class NewsArticle {
  constructor(type, title, content, impact, stocks) {
    this.id = Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    this.date = Date.now();
    this.type = type;
    this.title = title;
    this.content = content;
    this.impact = impact;
    this.affects = stocks || [];
    this.read = false;
  }
}
