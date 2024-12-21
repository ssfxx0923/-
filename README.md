# PDF题库练习系统

+ [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fssfxx0923%2F-)
+ 
一个基于 Vue 3 的在线PDF题库练习系统，支持PDF试题解析、在线答题、成绩统计等功能。

## 功能特性

- PDF文件上传与解析
- 单题练习模式
- 实时答案判断
- 练习进度保存
- 错题统计与回顾
- 成绩分析

## 技术栈

- Vue 3
- Vue Router
- PDF.js
- Vite
- LocalStorage

## 项目结构

src/
├── assets/          # 静态资源目录
├── components/      # 组件目录
│   ├── PDFUploader.vue    # PDF上传组件
│   └── QuestionDisplay.vue # 题目显示组件
├── utils/          # 工具函数目录
│   ├── pdfParser.js      # PDF解析工具
│   └── storage.js        # 本地存储工具
├── views/          # 页面目录
│   ├── Home.vue          # 首页
│   ├── Practice.vue      # 练习页
│   └── Result.vue        # 结果页
├── router/         # 路由配置
│   └── index.js
├── App.vue         # 根组件
├── main.js         # 入口文件
└── style.css       # 全局样式

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 部署到 Vercel

1. 通过 Vercel CLI:
```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel
```

2. 或通过 Vercel 网站:
- 将项目推送到 GitHub
- 在 Vercel 导入项目
- 选择 Vue.js 框架
- 点击部署

## 数据结构说明

### 题目数据结构

```javascript
{
  question: String,    // 题目内容
  options: Array,      // 选项数组
  answer: Number,      // 正确答案索引
  explanation: String  // 题目解析
}
```

### 答题记录结构

```javascript
{
  selected: Number,    // 选择的答案
  correct: Boolean     // 是否正确
}
```

### 练习进度结构

```javascript
{
  currentQuestion: Number,  // 当前题目索引
  answers: Array           // 答题记录数组
}
```

## 核心功能说明

### 1. PDF解析功能
- 支持PDF文件上传
- 文件大小限制(10MB)
- 自动识别题目、选项和答案
- 支持预览和编辑

### 2. 答题功能
- 单题显示模式
- 选项选择
- 即时判断对错
- 显示正确答案和解析

### 3. 练习管理
- 答题进度保存
- 错题记录
- 成绩统计
- 重新练习

## 本地存储说明

系统使用 localStorage 存储以下数据：
- `questions`: 解析后的题目数据
- `currentProgress`: 当前练习进度
- `practiceResult`: 练习结果数据

## 注意事项

### 1. PDF文件要求
- 文件大小不超过10MB
- 需符合指定的题目格式
- 建议使用标准PDF文件

### 2. 性能优化
- 大文件处理时显示加载状态
- 分页加载题目内容
- 及时清理不需要的存储数据

### 3. 数据存储
- 定期清理localStorage
- 注意存储容量限制
- 重要数据及时保存

## 待优化项

### 1. 题目解析
- 支持更多题目格式
- 提高解析准确率
- 添加批量导入功能

### 2. 用户体验
- 添加操作引导
- 优化移动端适配
- 增加快捷键支持

### 3. 功能扩展
- 添加题目分类
- 支持多种练习模式
- 添加练习历史记录
- 支持数据导出

## 错误处理

系统包含全局错误处理机制：

```javascript
app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err)
  // 可以添加错误上报逻辑
}
```

## 如何贡献

1. Fork 本仓库
2. 创建新的功能分支
3. 提交你的更改
4. 创建 Pull Request

## 许可证

[MIT License](LICENSE)

## 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。

## 更新日志

### v1.0.0
- 实现基础PDF解析功能
- 实现答题功能
- 实现成绩统计功能
- 实现错题本功能