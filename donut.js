const pre = document.getElementById('donut');
let A = 0, B = 0;
let currentFrame = '';
function renderFrame() {
    let b = Array(1760).fill(' ');
    let z = Array(1760).fill(0);
    for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
            let c = Math.sin(i),
                    d = Math.cos(j),
                    e = Math.sin(A),
                    f = Math.sin(j),
                    g = Math.cos(A),
                    h = d + 2,
                    D = 1 / (c * h * e + f * g + 5),
                    l = Math.cos(i),
                    m = Math.cos(B),
                    n = Math.sin(B),
                    t = c * h * g - f * e,
                    x = Math.floor(40 + 30 * D * (l * h * m - t * n)),
                    y = Math.floor(12 + 15 * D * (l * h * n + t * m)),
                    o = x + 80 * y,
                    N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));
            if (22 > y && y > 0 && x > 0 && 80 > x && D > z[o]) {
                z[o] = D;
                b[o] = ".,-~:;=!*#$@"[Math.max(0, Math.min(N, 11))];
            }
        }
    }
    let output = '';
    for (let k = 0; k < 1760; k++) {
        output += k % 80 ? b[k] : '\n';
    }
    pre.textContent = output;
    currentFrame = output;
    A += 0.04;
    B += 0.02;
}
setInterval(renderFrame, 30);

document.getElementById('download').onclick = function() {
    const blob = new Blob([currentFrame], {type: 'text/plain'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'donut_frame.txt';
    link.click();
    URL.revokeObjectURL(link.href);
};
