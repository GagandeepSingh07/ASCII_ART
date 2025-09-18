const pre = document.getElementById('fire');
let currentFrame = '';

function getHeroWidth() {
    return document.querySelector('.hero').offsetWidth;
}

function getHeroHeight() {
    return document.querySelector('.hero').offsetHeight;
}

let width = 0;
let height = 0;
const chars = '     .:-=+*%@#';
let firePixels = [];

function seedFire() {
    for (let x = 0; x < width; x++) {
        firePixels[(height - 1) * width + x] = chars.length - 1 - Math.floor(Math.random() * 2);
    }
}

function updateFire() {
    for (let y = 1; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let src = y * width + x;
            let below = src + width;
            if (below < width * height) {
                let decay = Math.floor(Math.random() * 3);
                let newVal = firePixels[below] - decay + Math.floor(Math.random() * 2);
                firePixels[src] = newVal < 0 ? 0 : newVal > chars.length - 1 ? chars.length - 1 : newVal;
            }
        }
    }
}

function renderFrame() {
    // Update width/height if hero section resizes
    let newWidth = getHeroWidth();
    let newHeight = Math.floor(getHeroHeight() / 14);
    if (newWidth !== width || newHeight !== height || firePixels.length === 0) {
        width = newWidth;
        height = newHeight;
        firePixels = Array(width * height).fill(0);
    }
    if (width === 0 || height === 0) {
        pre.textContent = '';
        return;
    }
    seedFire();
    updateFire();
    let output = '';
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let idx = firePixels[y * width + x];
            output += chars[idx];
        }
        output += '\n';
    }
    pre.textContent = output;
    currentFrame = output;
}

let frameCount = 0;

function animate() {
    frameCount++;
    if (frameCount % 3 === 0) {
        renderFrame();
    }
    requestAnimationFrame(animate);
}

animate();
