document.addEventListener('DOMContentLoaded', function() {
    // 页面切换逻辑
    const homePage = document.getElementById('home-page');
    const formPage = document.getElementById('form-page');
    const resultPage = document.getElementById('result-page');
    const startBtn = document.getElementById('start-btn');
    const backBtn = document.getElementById('back-btn');
    const crystalForm = document.getElementById('crystal-form');

    // AI接口设置
    let aiSettings = {
        apiKey: localStorage.getItem('crystal_ai_api_key') || '',
        apiUrl: localStorage.getItem('crystal_ai_api_url') || 'https://api.openai.com/v1/chat/completions',
        model: localStorage.getItem('crystal_ai_model') || 'gpt-3.5-turbo',
        customModel: localStorage.getItem('crystal_ai_custom_model') || ''
    };
    
    // 调试弹窗功能
    const debugLogo = document.getElementById('debug-logo');
    const debugModal = document.getElementById('debug-modal');
    const closeBtn = document.querySelector('.close-btn');
    const saveBtn = document.getElementById('save-api-settings');
    const aiModelSelect = document.getElementById('ai-model');
    const customModelSetting = document.getElementById('custom-model-setting');
    
    // 初始化设置表单
    if (aiSettings.apiKey) {
        document.getElementById('ai-api-key').value = aiSettings.apiKey;
    }
    if (aiSettings.apiUrl) {
        document.getElementById('ai-api-url').value = aiSettings.apiUrl;
    }
    aiModelSelect.value = aiSettings.model;
    if (aiSettings.model === 'custom') {
        customModelSetting.style.display = 'block';
        document.getElementById('custom-model').value = aiSettings.customModel;
    }
    
    // 点击logo显示调试弹窗
    debugLogo.addEventListener('click', function() {
        debugModal.style.display = 'flex';
    });
    
    // 关闭调试弹窗
    closeBtn.addEventListener('click', function() {
        debugModal.style.display = 'none';
    });
    
    // 点击弹窗外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === debugModal) {
            debugModal.style.display = 'none';
        }
    });
    
    // 模型选择变化时
    aiModelSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customModelSetting.style.display = 'block';
        } else {
            customModelSetting.style.display = 'none';
        }
    });
    
    // 保存API设置
    saveBtn.addEventListener('click', function() {
        const apiKey = document.getElementById('ai-api-key').value;
        const apiUrl = document.getElementById('ai-api-url').value;
        const model = aiModelSelect.value;
        const customModel = document.getElementById('custom-model').value;
        
        if (!apiKey) {
            showApiTestResult('请输入API密钥', false);
            return;
        }
        
        if (!apiUrl) {
            showApiTestResult('请输入API服务地址', false);
            return;
        }
        
        if (model === 'custom' && !customModel) {
            showApiTestResult('请输入自定义模型名称', false);
            return;
        }
        
        // 保存设置
        aiSettings.apiKey = apiKey;
        aiSettings.apiUrl = apiUrl;
        aiSettings.model = model;
        aiSettings.customModel = customModel;
        
        localStorage.setItem('crystal_ai_api_key', apiKey);
        localStorage.setItem('crystal_ai_api_url', apiUrl);
        localStorage.setItem('crystal_ai_model', model);
        localStorage.setItem('crystal_ai_custom_model', customModel);
        
        // 测试API连接
        testApiConnection();
    });
    
    // 显示API测试结果
    function showApiTestResult(message, success) {
        const resultElement = document.getElementById('api-test-result');
        resultElement.textContent = message;
        resultElement.className = 'api-test-result ' + (success ? 'api-test-success' : 'api-test-error');
        resultElement.style.display = 'block';
        
        setTimeout(function() {
            if (success) {
                debugModal.style.display = 'none';
            }
        }, success ? 1500 : 3000);
    }
    
    // 测试API连接
    function testApiConnection() {
        const testElement = document.getElementById('api-test-result');
        testElement.textContent = '正在测试API连接...';
        testElement.className = 'api-test-result';
        testElement.style.display = 'block';
        
        // 这里实际项目中应该发送一个简单的API请求来测试连接
        // 这里我们简化为只检查是否有API密钥
        if (aiSettings.apiKey) {
            setTimeout(function() {
                showApiTestResult('API设置保存成功', true);
            }, 1000);
        } else {
            showApiTestResult('API密钥无效', false);
        }
    }
    
    // AI分析功能
    const aiAnalyzeBtn = document.getElementById('ai-analyze-btn');
    const applyAiResultBtn = document.getElementById('apply-ai-result');
    const aiResultContainer = document.getElementById('ai-result');
    const aiTagsContainer = document.querySelector('.ai-tags');
    
    // 八大诉求对照表
    const aspirationsMap = {
        '健康': 'health',
        '财富': 'wealth',
        '爱情': 'love',
        '事业': 'career',
        '智慧': 'wisdom',
        '保护': 'protection',
        '平静': 'peace',
        '自信': 'confidence'
    };
    
    // 自定义诉求字段
    const customAspirationField = document.getElementById('custom-aspiration-field');
    
    // AI分析按钮点击事件
    aiAnalyzeBtn.addEventListener('click', function() {
        const customText = customAspirationInput.value.trim();
        if (!customText) {
            alert('请先输入您的自定义诉求');
            return;
        }
        
        if (!aiSettings.apiKey) {
            alert('请先设置AI API密钥');
            debugModal.style.display = 'flex';
            return;
        }
        
        // 显示加载状态
        this.disabled = true;
        const statusElement = document.querySelector('.ai-status');
        statusElement.innerHTML = '<span class="ai-loading"></span> AI正在分析您的诉求...';
        
        // 调用AI接口分析诉求
        analyzeAspiration(customText)
            .then(tags => {
                // 显示分析结果
                showAnalysisResults(tags);
                this.disabled = false;
                statusElement.textContent = 'AI分析完成，请查看结果';
            })
            .catch(error => {
                console.error('AI分析失败:', error);
                alert('AI分析失败，请检查API设置或稍后再试');
                this.disabled = false;
                statusElement.textContent = 'AI分析失败，请重试';
            });
    });
    
    // 应用AI分析结果
    applyAiResultBtn.addEventListener('click', function() {
        const tags = Array.from(aiTagsContainer.querySelectorAll('.ai-tag')).map(tag => {
            return tag.dataset.value;
        });
        
        if (tags.length === 0) {
            return;
        }
        
        // 清除所有已选的诉求
        document.querySelectorAll('input[name="aspirations"]:checked').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // 应用AI分析结果，选中对应的复选框
        tags.forEach(tag => {
            const checkboxId = aspirationsMap[tag];
            if (checkboxId) {
                document.getElementById(checkboxId).checked = true;
            }
        });
        
        // 隐藏结果容器
        aiResultContainer.classList.add('hidden');
    });
    
    // 分析诉求函数
    async function analyzeAspiration(text) {
        try {
            // 实际的API调用
            const response = await fetch(aiSettings.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${aiSettings.apiKey}`
                },
                body: JSON.stringify({
                    model: aiSettings.model === 'custom' ? aiSettings.customModel : aiSettings.model,
                    messages: [
                        {
                            role: "system",
                            content: "将输入的问题分析并拆解为基础的八大诉求：健康、财富、爱情、事业、智慧、保护、平静、自信。只返回相关的诉求标签，不要其他解释。"
                        },
                        {
                            role: "user",
                            content: text
                        }
                    ]
                })
            });
            
            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }
            
            const data = await response.json();
            
            // 解析API返回的结果
            // 预期API返回的是诉求标签数组，或者包含诉求标签的文本
            let results = [];
            
            if (data.choices && data.choices.length > 0) {
                const content = data.choices[0].message.content;
                // 尝试提取八大诉求
                const aspirations = ['健康', '财富', '爱情', '事业', '智慧', '保护', '平静', '自信'];
                results = aspirations.filter(asp => content.includes(asp));
                
                // 如果没有匹配到，可能是API返回了完整的句子，尝试基于关键词分析
                if (results.length === 0) {
                    // 回退到关键词分析
                    return analyzeWithKeywords(text);
                }
            } else {
                // API没有返回预期结构，回退到关键词分析
                return analyzeWithKeywords(text);
            }
            
            return results;
        } catch (error) {
            console.error('API调用失败:', error);
            // 出错时回退到关键词分析
            return analyzeWithKeywords(text);
        }
    }
    
    // 基于关键词的分析（备用方案）
    function analyzeWithKeywords(text) {
        // 基于输入文本分析结果
        const results = [];
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('记忆') || lowerText.includes('学习') || lowerText.includes('思考')) {
            results.push('智慧');
        }
        if (lowerText.includes('压力') || lowerText.includes('焦虑') || lowerText.includes('平静') || lowerText.includes('睡眠')) {
            results.push('平静');
        }
        if (lowerText.includes('人际') || lowerText.includes('关系') || lowerText.includes('朋友') || lowerText.includes('社交')) {
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
    
    // 显示分析结果
    function showAnalysisResults(tags) {
        // 清空原有标签
        aiTagsContainer.innerHTML = '';
        
        // 添加新标签
        tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'ai-tag';
            tagElement.dataset.value = tag;
            tagElement.innerHTML = `${tag} <span class="ai-tag-remove">×</span>`;
            aiTagsContainer.appendChild(tagElement);
            
            // 添加删除标签事件
            tagElement.querySelector('.ai-tag-remove').addEventListener('click', function() {
                tagElement.remove();
            });
        });
        
        // 显示结果容器
        aiResultContainer.classList.remove('hidden');
    }

    // 自定义诉求字段相关元素
    const customCheckbox = document.getElementById('custom');
    const customAspirationInput = document.getElementById('custom-aspiration');
    const customItem = document.getElementById('custom-item');

    // 显示/隐藏自定义诉求输入框
    customCheckbox.addEventListener('change', function() {
        if (this.checked) {
            customAspirationField.classList.remove('hidden');
            customAspirationInput.setAttribute('required', true);
            customItem.classList.add('active');
        } else {
            customAspirationField.classList.add('hidden');
            customAspirationInput.removeAttribute('required');
            customItem.classList.remove('active');
        }
    });

    // 年份、月份、日期选择框
    const yearSelect = document.getElementById('year');
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');

    // 初始化年份选项 (1950-2023)
    for (let year = 2023; year >= 1950; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year + '年';
        yearSelect.appendChild(option);
    }

    // 初始化月份选项
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month + '月';
        monthSelect.appendChild(option);
    }

    // 动态更新日期选项
    function updateDays() {
        const year = parseInt(yearSelect.value) || new Date().getFullYear();
        const month = parseInt(monthSelect.value) || 1;
        
        // 获取当月天数
        const daysInMonth = new Date(year, month, 0).getDate();
        
        // 清空现有选项
        daySelect.innerHTML = '<option value="" disabled selected>选择日期</option>';
        
        // 添加新选项
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day + '日';
            daySelect.appendChild(option);
        }
    }

    // 月份或年份变化时更新日期
    yearSelect.addEventListener('change', updateDays);
    monthSelect.addEventListener('change', updateDays);
    
    // 初始化日期
    updateDays();

    // 表单验证增强
    const requiredFields = document.querySelectorAll('.form-field.required select, .form-field.required input');
    requiredFields.forEach(field => {
        field.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
            }
        });
    });

    // 页面导航
    startBtn.addEventListener('click', function() {
        homePage.classList.remove('active');
        formPage.classList.add('active');
    });

    backBtn.addEventListener('click', function() {
        resultPage.classList.remove('active');
        formPage.classList.add('active');
    });

    // 表单提交处理
    crystalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取选中的诉求
        const checkedAspirations = Array.from(
            document.querySelectorAll('input[name="aspirations"]:checked')
        ).map(checkbox => checkbox.value);
        
        // 获取自定义诉求
        let userAspirations = [...checkedAspirations];
        if (customCheckbox.checked) {
            const customValue = customAspirationInput.value.trim();
            if (customValue) {
                userAspirations = userAspirations.filter(asp => asp !== 'custom');
                userAspirations.push(customValue);
            }
        }
        
        // 获取生辰八字信息
        const birthYear = yearSelect.value;
        const birthMonth = monthSelect.value;
        const birthDay = daySelect.value;
        const birthHour = document.getElementById('hour').value;
        
        // 获取个性化信息
        const userName = document.getElementById('name').value.trim();
        const userGender = document.getElementById('gender').value;
        const crystalPreference = document.getElementById('preference').value.trim();
        const additionalInfo = document.getElementById('additional').value.trim();
        
        // 验证必要信息已填写
        if (userAspirations.length === 0) {
            alert('请至少选择一项诉求');
            return;
        }
        
        if (!birthYear || !birthMonth || !birthDay || !birthHour) {
            alert('请完整填写生辰八字信息');
            return;
        }
        
        // 生成推荐结果
        generateRecommendations(
            userAspirations, 
            birthYear, 
            birthMonth, 
            birthDay, 
            birthHour, 
            {
                name: userName,
                gender: userGender,
                preference: crystalPreference,
                additional: additionalInfo
            }
        );
        
        // 切换到结果页
        formPage.classList.remove('active');
        resultPage.classList.add('active');
        
        // 滚动到页面顶部
        window.scrollTo(0, 0);
    });

    // 根据用户输入生成水晶推荐
    function generateRecommendations(aspirations, year, month, day, hour, personalInfo) {
        const recommendationContainer = document.getElementById('recommendation-container');
        recommendationContainer.innerHTML = '';
        
        // 提取生辰八字五行属性 (简化版)
        const elementMapping = {
            // 年份最后一位数对应五行 (简化)
            yearElement: ['金', '金', '土', '土', '木', '木', '水', '水', '火', '火'][year % 10],
            // 月份对应五行
            monthElement: ['水', '水', '木', '木', '木', '火', '火', '火', '土', '土', '金', '金'][month - 1],
            // 日期对应五行 (简化)
            dayElement: ['木', '火', '土', '金', '水'][day % 5],
            // 时辰对应五行
            hourElement: {
                '子时': '水', '丑时': '土', '寅时': '木', '卯时': '木',
                '辰时': '土', '巳时': '火', '午时': '火', '未时': '土',
                '申时': '金', '酉时': '金', '戌时': '土', '亥时': '水'
            }[hour]
        };
        
        // 性别考虑 (简单版)
        let genderElement = null;
        if (personalInfo.gender === '男') {
            genderElement = '火';  // 男性阳刚之气
        } else if (personalInfo.gender === '女') {
            genderElement = '水';  // 女性阴柔之气
        }
        
        // 收集用户五行
        const userElements = Object.values(elementMapping);
        if (genderElement) {
            userElements.push(genderElement);
        }
        
        // 如果用户有喜好的水晶，先查找匹配
        let preferredCrystal = null;
        if (personalInfo.preference) {
            preferredCrystal = crystalDatabase.find(crystal => 
                crystal.name.includes(personalInfo.preference) || 
                crystal.englishName.toLowerCase().includes(personalInfo.preference.toLowerCase())
            );
            
            if (preferredCrystal) {
                // 将此水晶标记为偏好
                preferredCrystal.isPreferred = true;
            }
        }

        // 基于诉求和五行筛选水晶
        let matchedCrystals = crystalDatabase.filter(crystal => {
            // 检查诉求匹配
            const hasBenefitMatch = aspirations.some(aspiration => {
                return crystal.benefits.some(benefit => 
                    benefit.includes(aspiration) || aspiration.includes(benefit)
                );
            });
            
            // 检查时辰匹配
            let hasHourMatch = false;
            if (crystal.compatibility.includes('所有时辰')) {
                hasHourMatch = true;
            } else {
                hasHourMatch = crystal.compatibility.includes(hour);
            }
            
            // 检查五行匹配
            const hasElementMatch = crystal.elements.some(element => userElements.includes(element));
            
            // 检查用户特殊需求
            let matchesUserNeeds = true;
            if (personalInfo.additional) {
                // 如果有附加信息，尝试匹配水晶描述或功效
                const additionalLower = personalInfo.additional.toLowerCase();
                matchesUserNeeds = 
                    crystal.description.toLowerCase().includes(additionalLower) ||
                    crystal.benefits.some(b => b.toLowerCase().includes(additionalLower)) ||
                    crystal.usage.some(u => u.toLowerCase().includes(additionalLower));
            }
            
            // 如果是用户偏好的水晶，直接返回true
            if (crystal.isPreferred) return true;
            
            return (hasBenefitMatch && (hasHourMatch || hasElementMatch) && matchesUserNeeds);
        });
        
        // 尝试次数计数器
        let attemptCount = 1;
        
        // 如果没有符合条件的水晶，尝试第二种匹配方法：仅基于诉求
        if (matchedCrystals.length === 0) {
            attemptCount++;
            console.log("第一次匹配无结果，尝试仅基于诉求匹配...");
            
            matchedCrystals = crystalDatabase.filter(crystal => {
                return aspirations.some(aspiration => {
                    return crystal.benefits.some(benefit => 
                        benefit.includes(aspiration) || aspiration.includes(benefit)
                    );
                });
            });
        }
        
        // 如果仍然没有，尝试第三种匹配方法：仅基于五行
        if (matchedCrystals.length === 0) {
            attemptCount++;
            console.log("第二次匹配无结果，尝试仅基于五行匹配...");
            
            matchedCrystals = crystalDatabase.filter(crystal => {
                return crystal.elements.some(element => userElements.includes(element));
            });
        }
        
        // 如果三次尝试后仍然没有匹配的水晶，随机选择一种
        if (matchedCrystals.length === 0) {
            console.log("三次匹配尝试都无结果，随机推荐一种水晶...");
            
            // 随机选择一个水晶
            const randomIndex = Math.floor(Math.random() * crystalDatabase.length);
            const randomCrystal = crystalDatabase[randomIndex];
            
            // 添加一个标记，表示这是随机推荐的
            randomCrystal.isRandom = true;
            
            matchedCrystals = [randomCrystal];
        }
        
        // 如果有偏好的水晶但不在匹配列表中，添加它
        if (preferredCrystal && !matchedCrystals.includes(preferredCrystal)) {
            matchedCrystals.unshift(preferredCrystal);
        }
        
        // 限制推荐数量
        matchedCrystals = matchedCrystals.slice(0, 3);
        
        // 生成个性化问候
        if (personalInfo.name) {
            const greetingEl = document.createElement('div');
            greetingEl.className = 'personal-greeting';
            greetingEl.textContent = `${personalInfo.name}${personalInfo.gender ? ' ' + personalInfo.gender : ''} 的专属推荐:`;
            recommendationContainer.appendChild(greetingEl);
        }
        
        // 生成推荐卡片
        matchedCrystals.forEach(crystal => {
            const card = document.createElement('div');
            card.className = 'crystal-card';
            if (crystal.isPreferred) {
                card.classList.add('preferred-crystal');
            } else if (crystal.isRandom) {
                card.classList.add('random-crystal');
            }
            
            // 选择该水晶的2-3个最适合用户的使用方法
            let relevantUsages = crystal.usage.slice(0, 3);
            
            // 尝试根据用户诉求筛选最相关的使用方法
            if (aspirations.length > 0) {
                const filteredUsages = crystal.usage.filter(usage => 
                    aspirations.some(aspiration => 
                        usage.toLowerCase().includes(aspiration.toLowerCase())
                    )
                );
                
                if (filteredUsages.length > 0) {
                    relevantUsages = filteredUsages.slice(0, 2);
                }
            }
            
            // 使用CDN地址作为图片路径
            const imagePath = crystal.image;
            
            // 创建卡片内容
            const cardContent = `
                <div class="crystal-header">
                    <div class="crystal-image" style="background-image: url('${imagePath}')"></div>
                    <div class="crystal-title">
                        <h3>${crystal.name}</h3>
                        <p class="english-name">${crystal.englishName}</p>
                        ${crystal.isPreferred ? '<span class="preferred-tag">您的偏好</span>' : ''}
                        ${crystal.isRandom ? '<span class="random-tag">特别推荐</span>' : ''}
                    </div>
                </div>
                <div class="crystal-info">
                    <p class="crystal-description">${crystal.description}</p>
                    
                    <div class="tag-section">
                        <h4>主要功效</h4>
                        <div class="tag-container">
                            ${crystal.benefits.map(benefit => `<span class="tag-pill">${benefit}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="tag-section">
                        <h4>五行属性</h4>
                        <div class="tag-container">
                            ${crystal.elements.map(element => `<span class="tag-pill element-tag">${element}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="tag-section">
                        <h4>脉轮</h4>
                        <div class="tag-container">
                            ${crystal.chakra.split('、').map(chakra => `<span class="tag-pill chakra-tag">${chakra}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="usage-section">
                        <h4>推荐使用方法</h4>
                        <div class="usage-container">
                            ${relevantUsages.map(usage => `<div class="usage-item">${usage}</div>`).join('')}
                        </div>
                    </div>
                    
                    <div class="energy-section">
                        <div class="energy-item">
                            <h4>净化方式</h4>
                            <div class="tag-container">
                                ${crystal.energyTransfer.cleansing.slice(0, 2).map(method => `<span class="tag-pill energy-tag">${method}</span>`).join('')}
                            </div>
                        </div>
                        <div class="energy-item">
                            <h4>充能方式</h4>
                            <div class="tag-container">
                                ${crystal.energyTransfer.charging.slice(0, 2).map(method => `<span class="tag-pill energy-tag">${method}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            card.innerHTML = cardContent;
            recommendationContainer.appendChild(card);
        });
        
        // 注释掉不需要的无匹配结果提示，因为我们现在有随机推荐功能
        // 如果三次匹配尝试后仍然没有匹配的水晶，我们会提供随机推荐
        // if (matchedCrystals.length === 0) {
        //    recommendationContainer.innerHTML = '<p>很抱歉，根据您提供的信息，我们暂时无法找到匹配的水晶。请尝试调整您的诉求或生辰信息。</p>';
        // }
    }

    // 滚动指示器功能
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        // 点击滚动指示器，滚动到内容区
        scrollIndicator.addEventListener('click', function() {
            const scrollContent = document.querySelector('.home-scrollable-content');
            scrollContent.scrollIntoView({ behavior: 'smooth' });
        });
        
        // 监听滚动事件，滚动后隐藏指示器
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) { // 当滚动超过100px时
                scrollIndicator.style.opacity = '0';
                setTimeout(function() {
                    scrollIndicator.style.display = 'none';
                }, 300); // 等待淡出动画完成后隐藏元素
            } else {
                scrollIndicator.style.display = 'block';
                setTimeout(function() {
                    scrollIndicator.style.opacity = '0.7';
                }, 10);
            }
        });
    }
}); 