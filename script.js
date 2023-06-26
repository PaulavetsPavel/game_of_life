
const canvas = document.querySelector('canvas');
const contextCanvas = canvas.getContext('2d');
const buttonStart = document.querySelector('#start');
const buttonStop = document.querySelector('#stop');
const buttonClear = document.querySelector('#clear');
const size = 50;
let mass = [];
let count = 0;
let timer;

canvas.addEventListener('click', function (event) {
    let x = event.offsetX;
    let y = event.offsetY;
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    mass[y][x] = 1;
    drawField();

});

function goLife() {
    for (let i = 0; i < size; i++) {
        mass[i] = [];
        for (let j = 0; j < size; j++) {
            mass[i][j] = 0;
        }
    }

}

goLife();

function drawField() {
    contextCanvas.clearRect(0, 0, size*10, size*10);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (mass[i][j] === 1) {
                contextCanvas.fillRect(j * 10, i * 10, 10, 10);
            }
        }
    }
}

function startLife() {
    buttonStart.innerText='Старт'
    let mass2 = [];
    for (let i = 0; i < size; i++) {

        mass2[i] = [];
        for (let j = 0; j < size; j++) {
            let neighbors = 0;
            // сосед сверху
            if (mass[fpm(i) - 1][j] === 1) neighbors++;
            // сосед снизу
            if (mass[fpp(i) + 1][j] === 1) neighbors++;
            // сосед справа
            if (mass[i][fpp(j) + 1] === 1) neighbors++;
            // сосед слева
            if (mass[i][fpm(j) - 1] === 1) neighbors++;
            // сосед справа вверху
            if (mass[fpm(i) - 1][fpp(j) + 1] === 1) neighbors++;
            // сосед слева вверху
            if (mass[fpm(i) - 1][fpm(j) - 1] === 1) neighbors++;
            // сосед слева внизу
            if (mass[fpp(i) + 1][fpm(j) - 1] === 1) neighbors++;
            // сосед справа внизу
            if (mass[fpp(i) + 1][fpp(j) + 1] === 1) neighbors++;
            (neighbors === 2 || neighbors === 3) ? mass2[i][j] = 1 : mass2[i][j] = 0;
        }
    }

    mass = mass2;
    drawField();
    count++;
    document.querySelector('#count').innerText = count;
    timer = setTimeout(startLife, 500);
    buttonStart.disabled=true
}

function fpm(i) {

    if (i === 0) return size;
    else return i;
}

function fpp(i) {
    if (i === size - 1) return -1;
    else return i;
}

buttonStart.addEventListener('click', startLife);
buttonStop.addEventListener('click', () => {
    clearTimeout(timer);
    buttonStart.innerText='Продолжить'
    buttonStart.disabled=false
});
buttonClear.addEventListener('click', () => {
    document.querySelector('#count').innerText = 0;
    buttonStart.innerHTML='Старт'
    mass=[]
    contextCanvas.clearRect(0, 0, size*10, size*10);
    goLife();

});