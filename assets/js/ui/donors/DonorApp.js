const DonorApp = {
  open(bodyEl) {
    bodyEl.innerHTML = '<div style="display:flex;flex-direction:column;height:100%;">'
      + '<div style="padding:4px 8px;background:var(--bg-panel-light);border-bottom:1px solid #000;">'
      + '<span style="font-weight:bold;">🙏 赞助者名单</span>'
      + '</div><div id="donor-list"></div></div>';
    DonorList.render('donor-list');
  },
};
