# 个人主页模板（profile/）

这是一个基于你现有主页结构整理出的可直接替换内容的模板。它保留了原主页的布局、交互和动画效果，同时将文字、链接、图片与数据配置改为可快速填充的占位内容。

## 模板总结
模板包含一个主页面和三个功能页，整体风格为深色系、卡片化布局，搭配星空背景和打字机动效：

- 主页 `index.html`：包含欢迎区、精选图片横向滚动、文章卡片、视频卡片、音乐嵌入、更新热力图、更新日志与友链。
- 图片页 `gallery.html`：本地相册浏览、上传、备注、分页与预览功能。
- 专注页 `focus.html`：专注计时器与专注记录入口。
- 记录页 `records.html`：每日记录、待办清单、AI 建议与专注统计。

所有内容数据都集中在 `static/data.js`，只需要替换其中的数组即可完成大多数个性化修改。

## 目录结构
```
profile/
├─ index.html
├─ gallery.html
├─ focus.html
├─ records.html
├─ static/
│  ├─ data.js
│  ├─ styles.css
│  ├─ header.css
│  ├─ hero.css
│  ├─ gallery.css
│  ├─ focus.css
│  ├─ focus.js
│  ├─ gallery.js
│  └─ particle-config.js
├─ photos/
│  ├─ photo1.webp
│  ├─ photo2.png
│  ├─ photo3.jpg
│  ├─ photo4.png
│  ├─ photo5.png
│  └─ lighttrace/
│     ├─ img0001.jpg
│     ├─ img0002.jpg
│     └─ ...
├─ favicon.ico
├─ hero.jpg
└─ starfield.js
```

## 快速开始
1. 打开 `index.html` 预览效果。
2. 替换 `index.html` 里的标题、导航链接与欢迎语。
3. 修改 `static/data.js` 中的内容数据（图片、视频、友链等）。
4. 用你自己的素材替换 `photos/` 和 `photos/lighttrace/` 中的图片。

## 需要替换的核心内容

### 1) 站点标题与导航
- 文件：`index.html`、`gallery.html`、`focus.html`、`records.html`
- 位置：页面顶部导航区
- 建议替换为你的名字、主页名称、你的笔记链接或社交链接。

### 2) 欢迎语与打字机文本
- 文件：`index.html`
- 位置：`.hero` 里的 `<h1>` 与 `phrases` 数组
- 作用：展示你的个人简介和关键词。

### 3) 文章卡片（首页“妙笔生花”）
- 文件：`index.html`
- 数据位置：`const articles = [...]`
- 字段说明：
  - `title`: 标题
  - `description`: 简介
  - `image`: 封面图路径
  - `link`: 文章链接
  - `comment`: 标签或分类

### 4) 视频卡片（首页“用心做视频”）
- 文件：`static/data.js`
- 数据位置：`window.FOCUS_VIDEO_LIBRARY`
- 字段说明：
  - `title`: 标题
  - `description`: 简介
  - `bvid`/`link`: B 站链接或 bvid
  - `cover`: 封面图（可选）
  - `comment`: 标签

### 5) 友链（首页“缘分天空”）
- 文件：`static/data.js`
- 数据位置：`window.FRIENDS`
- 字段说明：
  - `name`: 昵称
  - `desc`: 简介
  - `link`: 地址
  - `avatar`: 头像图片

### 6) 图片库（光影留痕）
- 文件：`static/data.js`
- 数据位置：`window.LIGHTTRACE_LIBRARY` 或 `window.LIGHTTRACE_AUTO`
- 推荐做法：
  - 如果你有固定图片数量，设置 `LIGHTTRACE_AUTO.count` 并按 `img0001.jpg` 规则命名。
  - 如果你只想展示部分图片，用 `LIGHTTRACE_LIBRARY` 手动列出。

### 7) 音乐区嵌入
- 文件：`index.html`
- 位置：曲苑天地的 `<iframe>`
- 用法：将 `src` 换成你的 Apple Music 或其他音乐平台的嵌入链接。

### 8) 更新日志
- 文件：`index.html`
- 位置：`const changelog = [...]`
- 用法：按时间顺序添加你的更新记录。

## 常见操作示例

### 替换图片
1. 将你的图片放到 `photos/` 或 `photos/lighttrace/`
2. 更新 `index.html` 或 `static/data.js` 的图片路径

### 修改文章卡片
在 `index.html` 中找到 `const articles`，替换为：
```js
const articles = [
  {
    title: "我的第一篇文章",
    description: "这里写一句话介绍。",
    image: "photos/my-cover.jpg",
    link: "https://example.com/my-post",
    comment: "个人作品"
  }
];
```

### 修改视频卡片
在 `static/data.js` 中替换：
```js
window.FOCUS_VIDEO_LIBRARY = [
  {
    title: "我的作品集视频",
    description: "短视频简介。",
    bvid: "BV1xxxxxxxxx",
    link: "https://www.bilibili.com/video/BV1xxxxxxxxx/",
    cover: "https://i0.hdslb.com/bfs/archive/xxx.jpg",
    comment: "作品"
  }
];
```

## 注意事项
- 这个模板已经整理为可直接替换内容的版本。
- 不需要改动 CSS 和 JS 结构，只改内容数据即可。
- 如果某个模块暂时不需要，可以在 `index.html` 注释或删除对应区块。

## 预览方式
直接双击打开 `index.html` 即可预览。若需要部署，可上传到 GitHub Pages 或任何静态托管平台。
