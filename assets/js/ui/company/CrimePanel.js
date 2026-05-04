const CrimePanel = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const char = Game.character;
    if (!char) return;
    el.innerHTML = '<div class="crime-panel">'
      + '<div class="crime-warn">⚠️ 以下操作存在法律风险</div>'
      + '<div class="crime-section"><h4>💰 资金调拨（挪用公款）</h4>'
      + '<div>从公司账户转出: <input type="number" id="crime-embezzle-amount" value="10000" style="width:100px;font-size:13px;"> 元</div>'
      + '<div style="margin:4px 0;">转至: 个人银行卡</div>'
      + '<div>风险预估: ' + (CriminalEngine._calcRisk('embezzle', 10000) * 100).toFixed(0) + '%</div>'
      + '<button onclick="CrimePanel.doEmbezzle()" style="margin-top:4px;">执行转账</button></div>'
      + '<div class="crime-section"><h4>📊 财务调整（财务造假）</h4>'
      + '<div>虚增营收比例: <input type="range" id="crime-fraud-range" min="0" max="50" value="20" oninput="document.getElementById(\'crime-fraud-pct\').textContent=this.value+\'%\'"> <span id="crime-fraud-pct">20%</span></div>'
      + '<button onclick="CrimePanel.doFraud()">确认调整</button></div>'
      + '<div class="crime-section"><h4>🧹 洗钱</h4>'
      + '<div>洗钱金额: <input type="number" id="crime-laundry-amount" value="50000" style="width:100px;font-size:13px;"> 元（手续费20%）</div>'
      + '<button onclick="CrimePanel.doLaundry()">洗钱</button></div>'
      + '<div class="crime-risk">🔒 当前累计风险: ' + (CriminalEngine.accumulatedRisk * 100).toFixed(0) + '% | 恶名值: ' + char.notoriety + '/100</div>'
      + '<div style="display:flex;gap:4px;margin-top:8px;flex-wrap:wrap;">'
      + '<button onclick="CrimePanel.destroyEvidence()">销毁证据 (¥' + Format.short(CONFIG.CRIME.EVIDENCE_DESTROY_COST) + ')</button>'
      + '<button onclick="CrimePanel.scapegoat()">找人顶罪 (¥' + Format.short(CONFIG.CRIME.SCAPEGOAT_COST) + ')</button>'
      + '</div>'
      + '<div style="margin-top:12px;font-size:11px;color:#808080;">犯罪记录: ' + CriminalEngine.records.filter(r => !r.settled).length + ' 条未处理</div>'
      + '</div>';
  },

  doEmbezzle() {
    const amt = parseInt(document.getElementById('crime-embezzle-amount')?.value) || 0;
    const result = CriminalEngine.embezzle(amt);
    if (result.success) { Game.showToast('转账完成', 'warn'); SoundEngine.play('crime'); }
    else Game.showToast(result.reason || '操作失败', 'error');
    this.render('company-content');
  },

  doFraud() {
    const pct = parseInt(document.getElementById('crime-fraud-range')?.value) || 0;
    const result = CriminalEngine.fraud(pct / 100);
    if (result.success) { Game.showToast('财务调整完成', 'warn'); SoundEngine.play('crime'); }
    else Game.showToast(result.reason || '操作失败', 'error');
    this.render('company-content');
  },

  doLaundry() {
    const amt = parseInt(document.getElementById('crime-laundry-amount')?.value) || 0;
    const result = CriminalEngine.moneyLaundering(amt);
    if (result.success) { Game.showToast('洗钱成功，风险降低30%', 'warn'); SoundEngine.play('money'); }
    else Game.showToast(result.reason || '洗钱失败', 'error');
    this.render('company-content');
  },

  destroyEvidence() {
    const result = CriminalEngine.destroyEvidence();
    if (result.success) { Game.showToast('证据销毁成功，风险降低50%', 'success'); SoundEngine.play('success'); }
    else Game.showToast(result.reason || '操作失败', 'error');
    this.render('company-content');
  },

  scapegoat() {
    const result = CriminalEngine.scapegoat();
    if (result.success) { Game.showToast('找人顶罪成功，风险清零', 'success'); SoundEngine.play('success'); }
    else Game.showToast(result.reason || '操作失败', 'error');
    this.render('company-content');
  },
};
