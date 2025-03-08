function updateDate() {
    const dateDisplay = document.querySelector('.date-display');
    const now = new Date();
    
    // 星期数组
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    // 格式化日期
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const weekday = weekdays[now.getDay()];
    
    // 更新日期显示
    dateDisplay.textContent = `${year}年${month}月${date}日 ${weekday}`;
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    updateFlipper('hours', hours);
    updateFlipper('minutes', minutes);
    updateFlipper('seconds', seconds);
    
    // 每次更新时钟时也更新日期
    updateDate();
}

function updateFlipper(unit, value) {
    const flipper = document.querySelector(`.${unit}`);
    const currentCard = flipper.querySelector('.current');
    const nextCard = flipper.querySelector('.next');
    
    if (currentCard.textContent !== value) {
        // 设置下一个数字
        nextCard.textContent = value;
        
        // 添加翻转动画
        currentCard.classList.add('flip-down');
        nextCard.classList.add('flip-up');
        
        // 动画结束后更新状态
        setTimeout(() => {
            currentCard.classList.remove('flip-down');
            nextCard.classList.remove('flip-up');
            
            // 更新当前卡片的数字
            currentCard.textContent = value;
            
            // 重置位置
            currentCard.style.transform = '';
            nextCard.style.transform = '';
        }, 600);
    }
}

// 初始化数字
function initializeCards() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.querySelectorAll('.hours .card').forEach(card => card.textContent = hours);
    document.querySelectorAll('.minutes .card').forEach(card => card.textContent = minutes);
    document.querySelectorAll('.seconds .card').forEach(card => card.textContent = seconds);
}

// 添加主题切换功能
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        // 保存主题设置到本地存储
        localStorage.setItem('theme', 
            body.classList.contains('light-mode') ? 'light' : 'dark'
        );
    });
}

// 修改初始化函数
function init() {
    initializeCards();
    initThemeToggle();
    updateDate(); // 初始化日期显示
    setInterval(updateClock, 1000);
}

// 初始化
init(); 