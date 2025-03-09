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

// 像素数字模板
const digitPatterns = {
    '0': [
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1
    ],
    '1': [
        0,0,1,0,0,
        0,1,1,0,0,
        1,0,1,0,0,
        0,0,1,0,0,
        0,0,1,0,0,
        0,0,1,0,0,
        1,1,1,1,1
    ],
    '2': [
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        1,1,1,1,1,
        1,0,0,0,0,
        1,0,0,0,0,
        1,1,1,1,1
    ],
    '3': [
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        0,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        1,1,1,1,1
    ],
    '4': [
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        0,0,0,0,1
    ],
    '5': [
        1,1,1,1,1,
        1,0,0,0,0,
        1,0,0,0,0,
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        1,1,1,1,1
    ],
    '6': [
        1,1,1,1,1,
        1,0,0,0,0,
        1,0,0,0,0,
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1
    ],
    '7': [
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,1,0,
        0,0,1,0,0,
        0,1,0,0,0,
        0,1,0,0,0,
        0,1,0,0,0
    ],
    '8': [
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1
    ],
    '9': [
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        1,1,1,1,1
    ]
};

function createPixelDigit(container) {
    for (let i = 0; i < 35; i++) { // 5x7 = 35个像素点
        const pixel = document.createElement('div');
        pixel.className = 'pixel off';
        container.appendChild(pixel);
    }
}

function updatePixelDigit(container, number) {
    const pattern = digitPatterns[number];
    const pixels = container.querySelectorAll('.pixel');
    pixels.forEach((pixel, index) => {
        pixel.classList.toggle('off', !pattern[index]);
    });
}

function initPixelClock() {
    const pixelClock = document.querySelector('.pixel-clock');
    
    // 清空现有内容
    pixelClock.innerHTML = `
        <div class="pixel-group hours">
            <div class="pixel-digit"></div>
            <div class="pixel-digit"></div>
        </div>
        <div class="pixel-divider">:</div>
        <div class="pixel-group minutes">
            <div class="pixel-digit"></div>
            <div class="pixel-digit"></div>
        </div>
        <div class="pixel-divider">:</div>
        <div class="pixel-group seconds">
            <div class="pixel-digit"></div>
            <div class="pixel-digit"></div>
        </div>
    `;

    // 初始化所有数字容器
    document.querySelectorAll('.pixel-digit').forEach(digit => {
        createPixelDigit(digit);
    });
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // 更新翻页时钟
    updateFlipper('hours', hours);
    updateFlipper('minutes', minutes);
    updateFlipper('seconds', seconds);

    // 更新像素时钟
    const pixelDigits = document.querySelectorAll('.pixel-digit');
    updatePixelDigit(pixelDigits[0], hours[0]);
    updatePixelDigit(pixelDigits[1], hours[1]);
    updatePixelDigit(pixelDigits[2], minutes[0]);
    updatePixelDigit(pixelDigits[3], minutes[1]);
    updatePixelDigit(pixelDigits[4], seconds[0]);
    updatePixelDigit(pixelDigits[5], seconds[1]);

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

function initStyleToggle() {
    const styleToggle = document.getElementById('styleToggle');
    const flipClock = document.querySelector('.flip-clock');
    const pixelClock = document.querySelector('.pixel-clock');

    // 初始化时根据保存的状态设置正确的显示
    const savedStyle = localStorage.getItem('clockStyle') || 'flip';
    if (savedStyle === 'pixel') {
        flipClock.classList.add('hidden');
        pixelClock.classList.remove('hidden');
        styleToggle.textContent = '现代'; // 显示下一个可切换的模式
    } else {
        flipClock.classList.remove('hidden');
        pixelClock.classList.add('hidden');
        styleToggle.textContent = '像素'; // 显示下一个可切换的模式
    }

    styleToggle.addEventListener('click', () => {
        flipClock.classList.toggle('hidden');
        pixelClock.classList.toggle('hidden');
        
        // 更新按钮文字为下一个可切换的模式
        if (flipClock.classList.contains('hidden')) {
            styleToggle.textContent = '现代';  // 当前是像素模式，显示可切换到现代
        } else {
            styleToggle.textContent = '像素';  // 当前是现代模式，显示可切换到像素
        }
        
        // 保存当前样式
        localStorage.setItem('clockStyle', 
            flipClock.classList.contains('hidden') ? 'pixel' : 'flip'
        );
    });
}

// 修改初始化函数
function init() {
    initializeCards();
    initThemeToggle();
    initPixelClock();
    initStyleToggle();
    updateDate();
    setInterval(updateClock, 1000);
}

// 初始化
init(); 