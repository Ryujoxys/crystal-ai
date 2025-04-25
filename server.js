// 加载环境变量
try {
  require('dotenv').config();
} catch (error) {
  console.log('未加载.env文件，将使用默认配置');
}

const express = require('express');
const path = require('path');
const cors = require('cors');
// 引入Supabase客户端
const supabase = require('./config/supabase');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.')));

// 路由
app.get('/api/test', (req, res) => {
  res.json({ message: '后端连接成功！' });
});

// Supabase查询示例 - 获取所有水晶数据
app.get('/api/crystals', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('crystals')
      .select('*');
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Supabase查询错误:', error);
    res.status(500).json({ error: '获取水晶数据失败', details: error.message });
  }
});

// Supabase查询示例 - 根据ID获取特定水晶
app.get('/api/crystals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('crystals')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: '未找到指定水晶' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Supabase查询错误:', error);
    res.status(500).json({ error: '获取水晶数据失败', details: error.message });
  }
});

// 处理水晶推荐请求
app.post('/api/recommend', (req, res) => {
  const { aspirations, year, month, day, hour, name, gender, preference, additional } = req.body;
  
  // 这里可以添加实际的推荐逻辑，现在只返回模拟数据
  const recommendation = {
    mainCrystal: {
      name: '紫水晶',
      description: '这是一块与您能量非常匹配的紫水晶，能够增强直觉，净化负面能量。',
      energyLevel: 89,
      compatibilityScore: 95,
      imageUrl: 'https://example.com/amethyst.jpg'
    },
    secondaryCrystals: [
      { 
        name: '月光石', 
        description: '月光石可以增强您的情感平衡和内在平静。',
        compatibilityScore: 87 
      },
      { 
        name: '黄水晶', 
        description: '黄水晶将为您带来财富和自信的能量。',
        compatibilityScore: 82 
      }
    ],
    personalizedAdvice: `亲爱的${name || '贵客'}，根据您的生辰八字和个人诉求，我们为您定制了这套水晶组合。在${aspirations ? aspirations.join('、') : '日常'}方面，它将为您带来显著的改善。`
  };
  
  res.json(recommendation);
});

// 保存用户数据接口
app.post('/api/save-user-data', async (req, res) => {
  try {
    const userData = req.body;
    
    // 输出接收到的数据（仅用于调试）
    console.log('收到用户数据:', JSON.stringify(userData, null, 2));
    
    // 数据验证
    if (!userData.aspirations || !userData.birth || !userData.personalInfo) {
      return res.status(400).json({ 
        success: false, 
        error: '数据格式不正确' 
      });
    }
    
    const saveData = {
      aspirations: userData.aspirations,
      birth_year: userData.birth.year,
      birth_month: userData.birth.month,
      birth_day: userData.birth.day,
      birth_hour: userData.birth.hour,
      name: userData.personalInfo.name,
      gender: userData.personalInfo.gender,
      preference: userData.personalInfo.preference,
      additional_info: userData.personalInfo.additional,
      created_at: new Date()
    }

    console.log('保存数据:', saveData);

    // 保存到Supabase的user_data表
    const { data, error } = await supabase
      .from('user_data')
      .insert([
        saveData
      ]);
    
    if (error) {
      console.error('保存数据错误:', error);
      throw error;
    }
    
    res.json({ 
      success: true, 
      message: '用户数据保存成功',
      data_id: data ? data[0]?.id : null
    });
  } catch (error) {
    console.error('保存用户数据失败:', error);
    res.status(500).json({ 
      success: false, 
      error: '保存用户数据失败', 
      details: error.message
    });
  }
});

// 使用Supabase的水晶推荐API
app.post('/api/recommend-with-db', async (req, res) => {
  try {
    const { aspirations, year, month, day, hour, name, gender, preference } = req.body;
    
    // 根据用户偏好从Supabase中查询匹配的水晶
    let query = supabase.from('crystals').select('*');
    
    // 如果有特定偏好，添加过滤条件
    if (preference && preference.length > 0) {
      // 假设benefits字段是数组类型，查询包含任一偏好的水晶
      query = query.containsAny('benefits', preference);
    }
    
    // 执行查询
    const { data, error } = await query;
    
    if (error) throw error;
    
    // 根据查询结果创建推荐
    // 这里是简化的示例，实际应用可能需要更复杂的匹配算法
    let mainCrystal = null;
    let secondaryCrystals = [];
    
    if (data && data.length > 0) {
      // 选择第一个作为主水晶
      mainCrystal = {
        name: data[0].name,
        description: data[0].description,
        energyLevel: Math.floor(Math.random() * 20) + 80, // 模拟能量等级
        compatibilityScore: Math.floor(Math.random() * 15) + 85, // 模拟兼容性分数
        imageUrl: data[0].image
      };
      
      // 选择其他2-3个作为次要水晶
      for (let i = 1; i < Math.min(4, data.length); i++) {
        secondaryCrystals.push({
          name: data[i].name,
          description: data[i].description,
          compatibilityScore: Math.floor(Math.random() * 20) + 70
        });
      }
    }
    
    // 构建推荐响应
    const recommendation = {
      mainCrystal: mainCrystal,
      secondaryCrystals: secondaryCrystals,
      personalizedAdvice: `亲爱的${name || '贵客'}，根据您的生辰八字和个人诉求，我们为您定制了这套水晶组合。在${aspirations ? aspirations.join('、') : '日常'}方面，它将为您带来显著的改善。`
    };
    
    res.json(recommendation);
  } catch (error) {
    console.error('推荐生成错误:', error);
    res.status(500).json({ error: '生成推荐失败', details: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
}); 