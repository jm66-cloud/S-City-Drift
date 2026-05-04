const ProfileList = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const chars = ROMANCE_CHARS;
    el.innerHTML = '<div style="padding:8px;"><h4 style="color:var(--text-bright);margin-bottom:8px;">可发展对象</h4>'
      + chars.map(c => '<div style="padding:8px;border-bottom:1px solid #333;cursor:pointer;" onclick="RomanceApp.selectChar(\'' + c.id + '\')">'
        + '<span style="font-size:24px;">' + c.avatar + '</span> '
        + '<span style="font-weight:bold;">' + c.name + '</span> (' + c.age + '岁)'
        + '<div style="font-size:12px;color:#808080;">' + c.occupation + ' | ' + c.personality + '</div>'
        + '</div>').join('') + '</div>';
  },
};
