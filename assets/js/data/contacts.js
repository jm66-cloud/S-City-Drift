const CONTACTS_DATA = [
  { id: 'aqiang', name: '阿强', type: 'friend', avatar: '👨', description: '老同学，股友', addDay: 1, initialAffinity: 50, aiEnabled: true, systemPrompt: '你是一个股友，说话直爽' },
  { id: 'landlord', name: '王阿姨', type: 'landlord', avatar: '👩', description: '房东', addDay: 1, initialAffinity: 50, aiEnabled: false },
  { id: 'mom', name: '老妈', type: 'family', avatar: '👵', description: '妈妈', addDay: 1, initialAffinity: 80, aiEnabled: true, systemPrompt: '你是玩家的妈妈' },
  { id: 'xiaoli', name: '小李', type: 'friend', avatar: '👨‍💻', description: '合租室友', addDay: 1, initialAffinity: 40, aiEnabled: true, systemPrompt: '你是合租室友' },
  { id: 'chenya', name: '陈雅', type: 'work', avatar: '👩‍💼', description: '人事主管', addDay: -1, initialAffinity: 30, aiEnabled: true, condition: 'hasCompany' },
  { id: 'zhangzong', name: '张总', type: 'work', avatar: '👨‍💼', description: '投资人', addDay: -1, initialAffinity: 20, aiEnabled: true, condition: 'revenue>50万', systemPrompt: '你是投资人' },
  { id: 'liubo', name: '刘博', type: 'work', avatar: '👨‍🔬', description: '技术顾问', addDay: -1, initialAffinity: 25, aiEnabled: true, condition: 'rdLevel>=3', systemPrompt: '你是技术顾问' },
  { id: 'xiaozhao', name: '小赵', type: 'rival', avatar: '😎', description: '宿敌', addDay: 3, initialAffinity: 20, aiEnabled: false },
];
