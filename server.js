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
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// AI模型配置
const AI_API_KEY = process.env.AI_API_KEY || 'sk-evgwlaexinmsvdrvlixvjjytqjwjrsvymnwifkbzxpbjduzf';
const AI_API_URL = process.env.AI_API_URL || 'https://api.siliconflow.cn/v1/chat/completions';
const AI_MODEL = process.env.AI_MODEL || 'THUDM/GLM-4-32B-0414';


// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '.')));
app.use(bodyParser.json());

// 根路由 - 提供index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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
      ai_input: userData.aiInput || null,  // 保存AI分析的输入文本
      ai_tags: userData.aiTags || null,    // 保存AI分析的标签结果
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

// 诉求分析API接口
app.post('/api/analyze-aspiration', async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: '请提供要分析的文本' });
        }
        
        // 调用大模型API
        const response = await fetch(AI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_API_KEY}`
            },
            body: JSON.stringify({
                model: AI_MODEL,
                messages: [
                    {
                        role: "system",
                        content: "将用户输入的诉求分析并拆解为基础的八大诉求：健康、财富、爱情、事业、智慧、保护、平静、自信。只返回相关的诉求标签，以JSON数组形式返回，例如：[\"健康\",\"智慧\"]。不要返回其他解释文字，确保使用双引号而非单引号。"
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
                temperature: 0.2, // 降低随机性
                top_p: 0.8,
                response_format: { type: "text" } // 明确指定回复格式
            })
        });
        console.log(response);
        if (!response.ok) {
            const errorData = await response.text();
            console.error('AI API请求失败:', errorData);
            throw new Error(`AI API请求失败: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API完整响应数据:', JSON.stringify(data, null, 2));
        
        // 处理API返回结果
        let results = [];
        
        if (data.choices && data.choices.length > 0) {
            const content = data.choices[0].message.content;
            console.log('content', content);
            try {
                // 尝试解析JSON数组
                if (content.includes('[') && content.includes(']')) {
                    const jsonStr = content.substring(
                        content.indexOf('['), 
                        content.lastIndexOf(']') + 1
                    );
                    
                    // 处理单引号的情况 - 将单引号替换为双引号
                    const processedJsonStr = jsonStr.replace(/'/g, '"');
                    
                    try {
                        // 首先尝试直接解析处理后的JSON字符串
                        results = JSON.parse(processedJsonStr);
                    } catch (innerError) {
                        console.log('标准解析失败，尝试使用正则表达式提取：', processedJsonStr);
                        // 如果仍然失败，使用正则表达式提取字符串数组内容
                        const matches = processedJsonStr.match(/"([^"]+)"/g);
                        if (matches) {
                            results = matches.map(match => match.replace(/"/g, ''));
                        } else {
                            // 如果正则也提取失败，回退到直接分割字符串
                            const cleanStr = processedJsonStr.replace(/[\[\]"'\s]/g, '');
                            results = cleanStr.split(',').filter(item => item.trim() !== '');
                        }
                    }
                } else {
                    // 尝试提取八大诉求
                    const aspirations = ['健康', '财富', '爱情', '事业', '智慧', '保护', '平静', '自信'];
                    results = aspirations.filter(asp => content.includes(asp));
                }
            } catch (parseError) {
                console.error('解析AI返回内容失败:', parseError);
                // 使用备用方案分析文本
                results = analyzeWithKeywords(text);
            }
        }
        
        // 如果没有匹配到，使用备用方案
        if (results.length === 0) {
            results = analyzeWithKeywords(text);
        }
        
        // 最终清理和验证
        results = results
            .map(item => typeof item === 'string' ? item.trim() : '')
            .filter(item => item && item.length > 0)
            // 确保结果仅包含有效的八大诉求
            .filter(item => ['健康', '财富', '爱情', '事业', '智慧', '保护', '平静', '自信'].includes(item));
        
        console.log('用户原始输入:', text);
        console.log('最终处理后的结果标签:', results);
        
        return res.json({ 
            tags: results,
            inputText: text  // 返回原始输入文本
        });
        
    } catch (error) {
        console.error('处理请求失败:', error);
        return res.status(500).json({ error: '服务器处理请求失败' });
    }
});

// 备用的关键词分析函数
function analyzeWithKeywords(text) {
    const results = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('记忆') || lowerText.includes('学习') || lowerText.includes('思考')) {
        results.push('智慧');
    }
    if (lowerText.includes('压力') || lowerText.includes('焦虑') || lowerText.includes('平静') || lowerText.includes('睡眠')) {
        results.push('平静');
    }
    if (lowerText.includes('人际') || lowerText.includes('关系') || lowerText.includes('朋友') || lowerText.includes('社交') || lowerText.includes('爱情') || lowerText.includes('恋爱')) {
        results.push('爱情');
    }
    if (lowerText.includes('工作') || lowerText.includes('事业') || lowerText.includes('升职') || lowerText.includes('职场')) {
        results.push('事业');
    }
    if (lowerText.includes('健康') || lowerText.includes('身体') || lowerText.includes('疾病')) {
        results.push('健康');
    }
    if (lowerText.includes('自信') || lowerText.includes('勇气') || lowerText.includes('表达')) {
        results.push('自信');
    }
    if (lowerText.includes('钱') || lowerText.includes('财富') || lowerText.includes('金钱') || lowerText.includes('财务')) {
        results.push('财富');
    }
    if (lowerText.includes('保护') || lowerText.includes('安全') || lowerText.includes('防护')) {
        results.push('保护');
    }
    
    // 如果没有匹配到任何标签，返回最可能的两个
    if (results.length === 0) {
        results.push('智慧', '平静');
    }
    
    return results;
}

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
}); 