/**
 * 水晶定制推荐系统 - 水晶数据库
 * 包含详细的水晶种类、功效、能量、使用方法等信息
 */

const crystalDatabase = [
    {
        id: 1,
        name: '紫水晶',
        englishName: 'Amethyst',
        image: 'https://qiniustatic.wodidashi.com/Amethyst.jpg',
        description: '紫水晶是一种强大的保护石，有助于清除负能量，增强直觉并促进灵性发展。它能平衡情绪，舒缓压力，改善睡眠质量。',
        benefits: ['保护', '冥想', '平静', '直觉', '灵性提升', '改善睡眠'],
        elements: ['水', '风'],
        compatibility: ['子时', '丑时', '寅时', '卯时'],
        chakra: '第三眼轮、顶轮',
        color: '紫色、淡紫色',
        hardness: '7',
        transparency: '透明至半透明',
        origin: ['巴西', '乌拉圭', '玻利维亚', '纳米比亚', '俄罗斯'],
        usage: [
            '冥想时握持或放置于第三眼处',
            '放在卧室以改善睡眠质量',
            '佩戴为首饰以获得持续保护',
            '放置在办公区域以清除负能量',
            '用于能量净化和平衡'
        ],
        energyTransfer: {
            cleansing: ['月光浸泡', '紫晶簇净化', '流水冲洗', '声波清洗'],
            charging: ['月光充能', '阳光短时间充能', '水晶簇充能'],
            activation: '意念激活、月光浸泡'
        },
        combinations: ['白水晶', '粉晶', '青金石', '海蓝宝'],
        suitableFor: ['工作压力大的人', '睡眠质量差的人', '需要精神保护的人', '修行者', '敏感人群'],
        zodiac: ['白羊座', '金牛座', '双子座', '处女座', '天秤座', '射手座', '水瓶座', '双鱼座']
    },
    {
        id: 2,
        name: '玫瑰石英',
        englishName: 'Rose Quartz',
        image: 'https://qiniustatic.wodidashi.com/RoseQuartz.jpg',
        description: '玫瑰石英被称为"爱的石头"，能促进自爱、无条件的爱、和平、信任和情感治愈。它柔和的能量能抚慰心灵创伤，帮助释放旧有的负面情绪。',
        benefits: ['爱情', '和平', '自爱', '情感治愈', '人际关系', '心灵平静'],
        elements: ['水', '土'],
        compatibility: ['丑时', '辰时', '未时', '戌时'],
        chakra: '心轮',
        color: '粉红色、浅粉色',
        hardness: '7',
        transparency: '半透明至不透明',
        origin: ['巴西', '马达加斯加', '印度', '南非', '美国'],
        usage: [
            '放置在卧室或客厅促进和谐关系',
            '佩戴在靠近心脏的位置',
            '冥想时放置于心轮上',
            '用于按摩面部减轻皱纹',
            '放在工作场所促进同事关系'
        ],
        energyTransfer: {
            cleansing: ['月光浸泡', '白水晶簇净化', '流水冲洗', '海盐浸泡'],
            charging: ['月光充能', '晨光充能', '花瓣浸泡'],
            activation: '爱的意念、玫瑰花瓣环绕'
        },
        combinations: ['绿幽灵', '石榴石', '绿色方解石', '粉晶族'],
        suitableFor: ['恋爱中的人', '情感受伤的人', '需要自我接纳的人', '希望改善人际关系的人'],
        zodiac: ['金牛座', '天秤座', '双鱼座']
    },
    {
        id: 3,
        name: '黑曜石',
        englishName: 'Obsidian',
        image: 'https://qiniustatic.wodidashi.com/Obsidian.JPG',
        description: '黑曜石是一种强大的保护石，能够屏蔽负能量，帮助释放旧的情感模式，并提供心灵支持。它具有强大的接地能力，能帮助使用者认清真相，面对自己的阴暗面。',
        benefits: ['保护', '接地', '清除负能量', '真相', '反省', '净化'],
        elements: ['土', '火'],
        compatibility: ['子时', '申时', '酉时', '亥时'],
        chakra: '根轮、脐轮',
        color: '黑色、有时带彩虹色调',
        hardness: '5-5.5',
        transparency: '不透明至半透明边缘',
        origin: ['墨西哥', '意大利', '冰岛', '美国', '土耳其'],
        usage: [
            '作为防护盾抵御负能量',
            '冥想时促进深度自我探索',
            '放置在家门口保护家庭',
            '用于切断负面连接和关系',
            '进行灵性工作时定位和接地'
        ],
        energyTransfer: {
            cleansing: ['流水冲洗', '海盐浸泡', '埋入土中', '烧香熏烟'],
            charging: ['月光充能', '龙血树脂熏染', '埋入土中充能'],
            activation: '意念活化、月圆之夜'
        },
        combinations: ['白水晶', '紫水晶', '绿发晶', '黄水晶'],
        suitableFor: ['需要精神保护的人', '处于转变期的人', '灵性工作者', '希望面对内心真相的人'],
        zodiac: ['天蝎座', '摩羯座']
    },
    {
        id: 4,
        name: '黄水晶',
        englishName: 'Citrine',
        image: 'https://qiniustatic.wodidashi.com/Topaz.jpg',
        description: '黄水晶能量充满阳光和温暖，有助于增强个人意志、创造力和自信心，吸引丰盛与财富。它是少有的不需要经常净化的水晶之一，能持续散发正能量。',
        benefits: ['财富', '自信', '创造力', '丰盛', '正能量', '意志力'],
        elements: ['火', '木'],
        compatibility: ['寅时', '巳时', '午时', '申时'],
        chakra: '太阳神经丛轮',
        color: '金黄色、橙黄色、棕黄色',
        hardness: '7',
        transparency: '透明至半透明',
        origin: ['巴西', '马达加斯加', '俄罗斯', '美国', '西班牙'],
        usage: [
            '放置在财位或钱包中吸引财富',
            '工作场所使用增强创造力',
            '佩戴提升自信和正面能量',
            '冥想时增强个人意志力',
            '放置在家中带来温暖和积极能量'
        ],
        energyTransfer: {
            cleansing: ['阳光短时间照射', '白水晶簇净化', '流水冲洗', '意念清洁'],
            charging: ['阳光充能', '黄色可视化充能'],
            activation: '阳光照射、金色蜡烛点燃'
        },
        combinations: ['虎眼石', '金发晶', '琥珀', '太阳石'],
        suitableFor: ['企业家', '创意工作者', '需要自信的人', '希望改善财务状况的人'],
        zodiac: ['狮子座', '处女座', '白羊座']
    },
    {
        id: 5,
        name: '青金石',
        englishName: 'Lapis Lazuli',
        image: 'https://qiniustatic.wodidashi.com/LapisLazuli.jpg',
        description: '青金石是智慧与真理的象征，能够增强思考能力、沟通能力和领导素质，带来内心的平静与和谐。它鼓励自我意识和自我表达，有助于揭示内在真相。',
        benefits: ['智慧', '沟通', '真理', '和谐', '记忆力', '领导力'],
        elements: ['水', '金'],
        compatibility: ['卯时', '巳时', '酉时', '戌时'],
        chakra: '喉轮、第三眼轮',
        color: '深蓝色、带有金色闪光',
        hardness: '5-6',
        transparency: '不透明',
        origin: ['阿富汗', '智利', '俄罗斯', '美国', '安哥拉'],
        usage: [
            '佩戴提升沟通能力',
            '冥想时增强智慧和洞察力',
            '学习时放在书桌上增强记忆力',
            '进行公开演讲前使用',
            '写作时使用增强表达能力'
        ],
        energyTransfer: {
            cleansing: ['月光浸泡', '白水晶簇净化', '轻轻拍干'],
            charging: ['月光充能', '靛蓝色可视化充能'],
            activation: '第三眼冥想、蓝色蜡烛'
        },
        combinations: ['白水晶', '紫水晶', '海蓝宝', '天河石'],
        suitableFor: ['老师', '作家', '演说家', '学生', '需要提升沟通能力的人']
    },
    {
        id: 6,
        name: '翡翠',
        englishName: 'Jade',
        image: 'https://qiniustatic.wodidashi.com/Jade.jpg',
        description: '翡翠是吉祥和繁荣的象征，有助于增强勇气、和谐与平衡，促进身心健康与长寿。它被视为"梦之石"，能帮助实现心愿和抱负。',
        benefits: ['健康', '长寿', '平衡', '繁荣', '和谐', '实现愿望'],
        elements: ['木', '水'],
        compatibility: ['寅时', '卯时', '辰时', '未时'],
        chakra: '心轮',
        color: '绿色、白色、紫色、黄色等多种色调',
        hardness: '6-7',
        transparency: '半透明至不透明',
        origin: ['缅甸', '中国', '新西兰', '俄罗斯', '危地马拉'],
        usage: [
            '佩戴作为护身符带来好运',
            '作为传家宝传递福气',
            '放置于卧室促进健康和改善睡眠',
            '冥想时握持增强内心和谐',
            '在工作场所摆放促进事业运'
        ],
        energyTransfer: {
            cleansing: ['清水冲洗', '白布擦拭', '阳光短时间照射'],
            charging: ['月光充能', '绿叶包裹充能'],
            activation: '绿色蜡烛、清晨阳光'
        },
        combinations: ['粉晶', '绿幽灵', '白水晶', '红纹石'],
        suitableFor: ['追求健康的人', '事业发展中的人', '需要好运的人', '希望家庭和谐的人']
    },
    {
        id: 7,
        name: '虎眼石',
        englishName: 'Tiger Eye',
        image: 'https://qiniustatic.wodidashi.com/TigerEye.jpg',
        description: '虎眼石是一种强大的保护石，能增强勇气、自信和决断力，有助于实现目标和增强个人意志力。它集合了太阳的能量和大地的力量，带来均衡与稳定。',
        benefits: ['保护', '勇气', '成功', '财富', '决断力', '平衡'],
        elements: ['土', '金'],
        compatibility: ['辰时', '巳时', '午时', '酉时'],
        chakra: '太阳神经丛轮、根轮',
        color: '金褐色、带有虎纹状光泽',
        hardness: '7',
        transparency: '不透明',
        origin: ['南非', '澳大利亚', '印度', '美国', '缅甸'],
        usage: [
            '商务谈判时随身携带',
            '做决策前握持增强洞察力',
            '摆放在办公桌上促进事业成功',
            '佩戴为首饰增强自信和勇气',
            '旅行时携带保护安全'
        ],
        energyTransfer: {
            cleansing: ['阳光短时间照射', '烧香熏烟', '流水冲洗', '埋入土中'],
            charging: ['阳光充能', '埋入土中充能'],
            activation: '金色蜡烛、阳光照射'
        },
        combinations: ['黄水晶', '红虎眼', '蓝虎眼', '茶晶'],
        suitableFor: ['商人', '需要勇气的人', '处于转变阶段的人', '需要保护的人']
    },
    {
        id: 8,
        name: '月光石',
        englishName: 'Moonstone',
        image: 'https://qiniustatic.wodidashi.com/MoonlightStone.jpg',
        description: '月光石与月亮能量相连，能增强直觉和女性能量，有助于情绪平衡、和谐与内心平静。它有很强的周期性，能帮助使用者适应变化和过渡时期。',
        benefits: ['直觉', '内在智慧', '情绪平衡', '创造力', '女性能量', '新开始'],
        elements: ['水', '金'],
        compatibility: ['子时', '丑时', '未时', '亥时'],
        chakra: '顶轮、第三眼轮、喉轮',
        color: '白色、蓝白色、带有彩虹光效应',
        hardness: '6-6.5',
        transparency: '半透明至透明',
        origin: ['斯里兰卡', '印度', '澳大利亚', '缅甸', '马达加斯加'],
        usage: [
            '满月时冥想增强直觉力',
            '在新月时设定意愿',
            '睡眠时放在枕边改善梦境',
            '经期时随身携带缓解不适',
            '创作时使用促进灵感'
        ],
        energyTransfer: {
            cleansing: ['月光浸泡', '轻柔清水冲洗', '白水晶簇净化'],
            charging: ['月光充能', '银色可视化充能'],
            activation: '月光浸泡、新月或满月仪式'
        },
        combinations: ['紫水晶', '海蓝宝', '珍珠', '天河石'],
        suitableFor: ['女性', '创意工作者', '处于人生转变期的人', '对月球感兴趣的人']
    },
    {
        id: 9,
        name: '白水晶',
        englishName: 'Clear Quartz',
        image: 'https://qiniustatic.wodidashi.com/WhiteCrystal.JPG',
        description: '白水晶被称为"万能水晶"，具有净化、放大和传导能量的特性。它能提升其他水晶的效力，清除障碍，增强意念力量，促进灵性成长。',
        benefits: ['净化', '能量放大', '清晰思考', '灵性成长', '平衡', '疗愈'],
        elements: ['水', '气'],
        compatibility: ['所有时辰'],
        chakra: '全脉轮，特别是顶轮',
        color: '无色透明',
        hardness: '7',
        transparency: '透明',
        origin: ['巴西', '马达加斯加', '美国', '阿尔卑斯山', '中国'],
        usage: [
            '净化其他水晶',
            '增强冥想体验',
            '放大其他水晶能量',
            '帮助设定和实现目标',
            '用于能量治疗和平衡脉轮'
        ],
        energyTransfer: {
            cleansing: ['阳光照射', '月光浸泡', '海盐浸泡', '流水冲洗'],
            charging: ['阳光或月光充能', '水晶簇充能'],
            activation: '意念或阳光月光交替'
        },
        combinations: ['几乎所有水晶', '特别是紫水晶、黑色矿石'],
        suitableFor: ['所有人', '初学者', '灵性寻求者', '疗愈师']
    },
    {
        id: 10,
        name: '绿幽灵',
        englishName: 'Green Phantom Quartz',
        image: 'https://qiniustatic.wodidashi.com/GreenGhost.jpg',
        description: '绿幽灵水晶包含着绿色幽灵般的内部生长层，象征着生命力和重生。它有助于连接自然能量，促进个人成长和转变，支持治愈和再生。',
        benefits: ['个人成长', '转变', '再生', '与自然连接', '疗愈', '财富'],
        elements: ['木', '土'],
        compatibility: ['寅时', '卯时', '辰时', '巳时'],
        chakra: '心轮',
        color: '透明水晶内含绿色夹层',
        hardness: '7',
        transparency: '透明至半透明',
        origin: ['巴西', '中国', '纳米比亚', '俄罗斯'],
        usage: [
            '冥想时使用促进个人成长',
            '在转变期间携带增强适应力',
            '花园中放置增强植物生长',
            '商业场所使用促进繁荣',
            '疗愈工作中增强治愈能力'
        ],
        energyTransfer: {
            cleansing: ['月光浸泡', '白水晶簇净化', '流水冲洗'],
            charging: ['自然环境中充能', '植物旁充能'],
            activation: '森林或花园中激活'
        },
        combinations: ['青金石', '翡翠', '玫瑰石英', '黄水晶'],
        suitableFor: ['追求个人成长的人', '园艺爱好者', '治疗师', '处于人生转折点的人']
    },
    {
        id: 11,
        name: '石榴石',
        englishName: 'Garnet',
        image: 'https://qiniustatic.wodidashi.com/PomegranateGarnet.JPG',
        description: '石榴石是一种具有强大活力的水晶，能提升热情、创造力和生命力。它增强身体力量，刺激欲望和吸引力，同时也提供保护和稳定的能量。',
        benefits: ['活力', '力量', '创造力', '热情', '保护', '吸引力'],
        elements: ['火', '土'],
        compatibility: ['巳时', '午时', '卯时', '辰时'],
        chakra: '根轮、太阳神经丛轮',
        color: '深红色、棕红色、也有绿色和橙色变种',
        hardness: '6.5-7.5',
        transparency: '透明至半透明',
        origin: ['印度', '斯里兰卡', '巴西', '美国', '非洲多国'],
        usage: [
            '增强体力和精力',
            '激发热情和创造力',
            '提升性能量和吸引力',
            '商务活动中提高成功率',
            '旅行时的保护石'
        ],
        energyTransfer: {
            cleansing: ['流水冲洗', '干燥白布擦拭', '白水晶簇净化'],
            charging: ['阳光短时间充能', '火元素视觉化'],
            activation: '红色蜡烛、日出时分'
        },
        combinations: ['黄水晶', '琥珀', '红碧玺', '红纹石'],
        suitableFor: ['需要激发热情的人', '运动员', '创意工作者', '商人']
    },
    {
        id: 12,
        name: '海蓝宝',
        englishName: 'Aquamarine',
        image: 'https://qiniustatic.wodidashi.com/Aquamarine.JPG',
        description: '海蓝宝如同海洋般平静舒缓，能安抚情绪，净化心灵，增强沟通能力。它与水元素紧密相连，有助于平息愤怒，释放压力，增强勇气和信任。',
        benefits: ['平静', '沟通', '勇气', '净化', '和平', '释放压力'],
        elements: ['水', '气'],
        compatibility: ['子时', '亥时', '酉时', '未时'],
        chakra: '喉轮、心轮',
        color: '淡蓝色、浅绿蓝色',
        hardness: '7.5-8',
        transparency: '透明',
        origin: ['巴西', '尼日利亚', '马达加斯加', '赞比亚', '俄罗斯'],
        usage: [
            '沟通困难时佩戴',
            '冥想时使用增强心灵平静',
            '睡前放在枕边缓解焦虑',
            '旅行尤其是海上旅行时携带',
            '重要会议或讲话前使用'
        ],
        energyTransfer: {
            cleansing: ['月光浸泡', '海水浸泡', '清水冲洗'],
            charging: ['月光充能', '蓝色可视化充能'],
            activation: '海边或任何水源边激活'
        },
        combinations: ['青金石', '蓝碧玺', '天河石', '白水晶'],
        suitableFor: ['公众演说者', '需要平静的人', '旅行者', '治疗师']
    },
    {
        id: 13,
        name: '茶晶',
        englishName: 'Smoky Quartz',
        image: 'https://qiniustatic.wodidashi.com/Citrine.jpg',
        description: '茶晶是极佳的负能量转化器，能将负面能量转化为正面能量，帮助接地、平衡和保护。它具有强大的净化和防御能力，同时带来心灵的安宁和平静。',
        benefits: ['接地', '净化', '保护', '转化负能量', '稳定', '清除电磁辐射'],
        elements: ['土', '气'],
        compatibility: ['辰时', '戌时', '丑时', '未时'],
        chakra: '根轮',
        color: '棕色、灰褐色、几乎黑色',
        hardness: '7',
        transparency: '透明至半透明',
        origin: ['巴西', '苏格兰', '瑞士阿尔卑斯山', '中国', '美国'],
        usage: [
            '电子设备旁放置减少辐射影响',
            '工作场所使用增强接地感',
            '净化空间的负能量',
            '压力大时握持平衡情绪',
            '保护家居免受负能量'
        ],
        energyTransfer: {
            cleansing: ['流水冲洗', '埋入土中', '烧香熏烟'],
            charging: ['月光充能', '埋入土中充能'],
            activation: '地气连接、烟熏'
        },
        combinations: ['黑曜石', '黄水晶', '虎眼石', '红纹石'],
        suitableFor: ['电脑工作者', '高压环境中的人', '需要保护的人', '能量敏感者']
    },
    {
        id: 14,
        name: '拉长石',
        englishName: 'Labradorite',
        image: 'https://qiniustatic.wodidashi.com/Labradorite.jpg',
        description: '拉长石以其迷人的彩虹闪光效应而著名，被视为变革和转型的石头。它能提升精神意识，增强创造力和想象力，帮助发现内在的魔力与能力。',
        benefits: ['精神力量', '直觉', '魔法工作', '转变', '保护', '灵性发展'],
        elements: ['风', '气'],
        compatibility: ['子时', '亥时', '午时', '戌时'],
        chakra: '喉轮、第三眼轮',
        color: '灰色或灰黑色底色，有蓝色、紫色、金色等闪光',
        hardness: '6-6.5',
        transparency: '半透明',
        origin: ['加拿大', '芬兰', '马达加斯加', '俄罗斯', '美国'],
        usage: [
            '灵性工作或魔法实践',
            '增强梦境体验和记忆',
            '保护能量场不受干扰',
            '冥想时增强精神意识',
            '创造性工作时激发灵感'
        ],
        energyTransfer: {
            cleansing: ['月光浸泡', '鼠尾草熏烟', '白水晶簇净化'],
            charging: ['月光充能', '雷雨天气中充能'],
            activation: '雷暴天气或满月时分'
        },
        combinations: ['月光石', '琥珀', '摩根石', '天河石'],
        suitableFor: ['艺术家', '梦者', '直觉工作者', '处于转变期的人']
    },
    {
        id: 15,
        name: '碧玺',
        englishName: 'Tourmaline',
        image: 'https://qiniustatic.wodidashi.com/Verdelite.JPG',
        description: '碧玺是一种多彩的水晶，不同颜色带有不同特性。总体而言，它有助于平衡能量，保护使用者免受负面影响，并增强信心和内在力量。',
        benefits: ['保护', '接地', '平衡能量', '清除阻塞', '减轻压力', '增强创造力'],
        elements: ['土', '火', '风', '水'],
        compatibility: ['所有时辰，依颜色而定'],
        chakra: '依颜色对应不同脉轮',
        color: '黑色、绿色、粉红色、蓝色、多色等',
        hardness: '7-7.5',
        transparency: '透明至不透明',
        origin: ['巴西', '非洲', '阿富汗', '美国', '斯里兰卡'],
        usage: [
            '电子设备旁放置（尤其是黑碧玺）',
            '佩戴为护身符抵御负能量',
            '平衡左右脑（西瓜碧玺）',
            '增强自信和魅力（粉碧玺）',
            '吸引财富和成功（绿碧玺）'
        ],
        energyTransfer: {
            cleansing: ['月光浸泡', '阳光短时充能', '流水冲洗'],
            charging: ['月光或阳光充能', '依颜色选择充能方式'],
            activation: '意念激活、自然光线'
        },
        combinations: ['白水晶', '绿幽灵', '海蓝宝', '橄榄石'],
        suitableFor: ['能量工作者', '电脑工作者', '需要保护的人', '寻求平衡的人']
    }
];

// 导出数据库供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { crystalDatabase };
} else {
    // 浏览器环境下的处理
    window.crystalDatabase = crystalDatabase;
} 