// LocalStorage 数据管理

// 光影留痕 - 图片库配置
// 说明:
// 1) 将图片放入 photos/lighttrace/ 目录，命名为 img0001.jpg 之类
// 2) 可选手动列表或自动列表
// 3) featured 为 true 的图片会出现在首页精选
// 4) 如果列表为空，将回退到浏览器 localStorage 模式

window.LIGHTTRACE_LIBRARY = [
    // 示例:
    // { id: 'img0001', src: 'photos/lighttrace/img0001.jpg', comment: '夕阳', featured: true },
];

window.LIGHTTRACE_AUTO = {
    count: 6,
    featuredIds: ['img0001', 'img0002', 'img0003', 'img0004']
};

function buildAutoLibrary(config) {
    if (!config || !config.count || config.count < 1) return [];
    const featuredSet = new Set(config.featuredIds || []);
    const items = [];
    for (let i = 1; i <= config.count; i++) {
        const id = `img${String(i).padStart(4, '0')}`;
        items.push({
            id,
            src: `photos/lighttrace/${id}.jpg`,
            comment: '',
            featured: featuredSet.has(id)
        });
    }
    return items;
}

const autoLibrary = buildAutoLibrary(window.LIGHTTRACE_AUTO);
if (!window.LIGHTTRACE_LIBRARY || window.LIGHTTRACE_LIBRARY.length === 0) {
    window.LIGHTTRACE_LIBRARY = autoLibrary;
}

window.FEATURED_LIGHTTRACE = (window.LIGHTTRACE_LIBRARY || []).filter(item => item && item.featured);

// 视频库配置（B 站外链）
// 说明:
// 1) 使用 link 或 bvid
// 2) cover 建议 https 地址
window.FOCUS_VIDEO_LIBRARY = [
    {
        id: 'vid0001',
        title: '你的公开视频标题',
        description: '一句话描述视频内容。',
        platform: 'bilibili',
        bvid: 'BV1xxxxxxxxx',
        link: 'https://www.bilibili.com/video/BV1xxxxxxxxx/',
        cover: 'https://i0.hdslb.com/bfs/archive/your-cover.jpg',
        comment: '个人标签'
    }
];

// 友链配置
window.FRIENDS = [
    {
        name: '朋友昵称',
        desc: '一句话简介',
        link: 'https://example.com',
        avatar: 'https://picsum.photos/120'
    }
];

const RECORDS_PREFIX = 'daily_record_';

function getRecord(dateStr) {
    const key = RECORDS_PREFIX + dateStr;
    const stored = localStorage.getItem(key);

    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse record:', e);
        }
    }

    return {
        date: dateStr,
        keywords: [],
        today_done: '',
        tomorrow_plan: [],
        insights: '',
        todos: [],
        focus_sessions: []
    };
}

function saveRecordData(dateStr, data) {
    const key = RECORDS_PREFIX + dateStr;
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save record:', e);
        alert('保存失败：浏览器存储空间不足');
    }
}

function getHeatmapData() {
    const counts = {};

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key && key.startsWith(RECORDS_PREFIX)) {
            const dateStr = key.substring(RECORDS_PREFIX.length);

            if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));

                    let count = 0;
                    if (data.keywords && data.keywords.length > 0) count++;
                    if (data.today_done && data.today_done.trim()) count++;
                    if (data.tomorrow_plan && data.tomorrow_plan.length > 0) count++;
                    if (data.insights && data.insights.trim()) count++;
                    if (data.todos && data.todos.length > 0) count++;
                    if (data.focus_sessions && data.focus_sessions.length > 0) count++;

                    if (count > 0) {
                        counts[dateStr] = count;
                    }
                } catch (e) {
                    console.error('Failed to parse heatmap data:', e);
                }
            }
        }
    }

    return counts;
}

function exportAllRecordsAsJSON() {
    const allRecords = {};

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key && key.startsWith(RECORDS_PREFIX)) {
            const dateStr = key.substring(RECORDS_PREFIX.length);
            allRecords[dateStr] = JSON.parse(localStorage.getItem(key));
        }
    }

    const blob = new Blob([JSON.stringify(allRecords, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `all_records_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function importRecordsFromJSON(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            let count = 0;

            for (const [dateStr, record] of Object.entries(data)) {
                if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                    saveRecordData(dateStr, record);
                    count++;
                }
            }

            alert(`成功导入 ${count} 条记录`);
            window.location.reload();
        } catch (e) {
            alert('导入失败：文件格式错误或无法解析');
            console.error('Import error:', e);
        }
    };

    reader.readAsText(file);
}

function clearAllData() {
    if (confirm('确定要清除所有数据吗？此操作无法撤销')) {
        const keysToDelete = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(RECORDS_PREFIX)) {
                keysToDelete.push(key);
            }
        }

        keysToDelete.forEach(key => localStorage.removeItem(key));
        alert('已清除所有数据');
        window.location.reload();
    }
}
