const NEWS_TEMPLATES = {
  earnings_good: [
    { title: '{company}发布财报：营收{X}亿同比增长{Y}%，净利润{Z}亿大超预期', type: 'positive' },
    { title: '{company}Q3业绩亮眼，净利润同比增长{Y}%，股价有望冲高', type: 'positive' },
    { title: '{company}全年营收创新高，同比增长{Y}%', type: 'positive' },
  ],
  earnings_bad: [
    { title: '{company}营收不及预期，净利润下滑{X}%', type: 'negative' },
    { title: '{company}发布盈利预警，Q4净利润同比下降{Y}%', type: 'negative' },
  ],
  corruption: [
    { title: '{company}董事长涉嫌挪用公款被证监会立案调查', type: 'negative' },
    { title: '内部人士透露{company}高管已被带走协助调查', type: 'negative' },
  ],
  war: [
    { title: '国际局势紧张，{industry}板块或受冲击', type: 'negative' },
    { title: '{region}冲突升级，{industry}板块承压', type: 'negative' },
  ],
  policy_good: [
    { title: '{industry}获国家{X}亿扶持资金，行业迎来拐点', type: 'positive' },
    { title: '国务院出台{industry}利好政策，行业龙头受益', type: 'positive' },
  ],
  policy_bad: [
    { title: '{industry}监管收紧，新规下月起实施', type: 'negative' },
    { title: '{industry}行业标准提高，中小企业面临压力', type: 'negative' },
  ],
  contract: [
    { title: '{company}中标{X}亿大单，市场前景看好', type: 'positive' },
    { title: '{company}与{partner}签订战略合作协议', type: 'positive' },
  ],
  accident: [
    { title: '{company}产品被曝质量问题，紧急召回', type: 'negative' },
    { title: '{company}工厂发生安全事故，停产整顿', type: 'negative' },
  ],
  technology: [
    { title: '{tech}突破性进展，{company}率先布局', type: 'positive' },
    { title: '{company}研发取得重大突破，新产品即将上市', type: 'positive' },
  ],
  disaster: [
    { title: '{region}发生自然灾害，{industry}供应链受阻', type: 'negative' },
    { title: '极端天气影响{industry}生产，供应紧张', type: 'negative' },
  ],
  merger: [
    { title: '{company}拟收购{target}，估值{X}亿', type: 'positive' },
    { title: '{companyA}与{companyB}合并，打造行业巨头', type: 'positive' },
  ],
};
