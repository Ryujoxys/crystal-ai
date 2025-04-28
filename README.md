# Crystal DIY - 水晶推荐系统

基于生辰八字和个人诉求的定制化水晶推荐系统。

## 项目说明

该项目是一个水晶推荐系统，可以基于用户的生辰八字和个人诉求，为用户推荐最适合的水晶组合。

主要功能包括：
- 生辰八字输入与分析
- 个人诉求选择
- 自定义诉求AI分析
- 定制化水晶推荐

## 技术栈

- 前端：HTML5, CSS3, JavaScript (原生)
- 后端：Node.js, Express.js
- 数据库：Supabase
- AI模型：GLM-4-32B-0414

## 环境要求

- Node.js v14.0.0 或更高版本
- npm v6.0.0 或更高版本

## 安装与运行

1. 克隆项目

```bash
git clone https://github.com/yourusername/crystal-ai.git
cd crystal-ai
```

2. 安装依赖

```bash
npm install
```

3. 创建 `.env` 文件

在项目根目录创建 `.env` 文件，设置以下环境变量：

```
PORT=3000
AI_API_KEY=sk-evgwlaexinmsvdrvlixvjjytqjwjrsvymnwifkbzxpbjduzf
AI_API_URL=https://api.siliconflow.cn/v1/chat/completions
AI_MODEL=THUDM/GLM-4-32B-0414
```

4. 启动开发服务器

```bash
npm run dev
```

5. 访问应用

打开浏览器访问: `http://localhost:3000`

## 功能使用

### 自定义诉求AI分析

1. 在诉求选择界面勾选"自定义"选项
2. 在文本框中输入您的具体诉求
3. 点击"AI分析"按钮
4. 系统会自动分析您的诉求，提取关键需求
5. 点击"应用结果"按钮，自动勾选相关诉求类型

## 项目结构

- `/public` - 前端静态资源
  - `index.html` - 主页面
  - `styles.css` - 样式表
  - `script.js` - 前端JavaScript
  - `crystalDatabase.js` - 水晶数据库
- `server.js` - 后端服务器
- `config/` - 配置文件

## 开发者

- [Your Name](https://github.com/yourusername)

## 许可证

MIT 