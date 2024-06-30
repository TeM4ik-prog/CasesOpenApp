// function ChangeColor() {
//     let randomColor1 = Math.floor(Math.random() * 16777215).toString(16);
//     let randomColor2 = Math.floor(Math.random() * 16777215).toString(16);

//     All.style.background = `linear-gradient(${Ar_Rotate[rand_Rotate]}, ${"#" + (randomColor1)}, ${"#" + randomColor2})`
// }
let colors = [
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0],
    [0, 0, 0],
    [128, 128, 128],
    [255, 255, 255],
    [255, 255, 0],
    [0, 255, 255],
    [128, 0, 128],
    [0, 128, 0],
    [0, 0, 128],
    [128, 0, 0],
    [0, 128, 128],
    [128, 128, 0],
    [192, 192, 192],
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [128, 0, 255],
    [255, 0, 128],
    [0, 255, 128],
    [128, 255, 0],
    [128, 0, 255],
    [0, 128, 255],
    [255, 128, 0],
    [255, 0, 128],
    [0, 255, 128]
];

// let colors = [
//     [0, 0, 0],
//     [20, 96, 20],
//     [96, 12, 35],
//     [27, 105, 138],
//     [96, 0, 96],
//     [96, 51, 0],
//     [0, 0, 0],
//     [64, 64, 64],
//     [128, 128, 128],
//     [128, 128, 0],
//     [0, 128, 128],
//     [64, 0, 64],
//     [0, 64, 0],
//     [0, 0, 64],
//     [64, 0, 0],
//     [0, 64, 64],
//     [64, 64, 0],
//     [96, 96, 96],
//     [128, 0, 0],
//     [0, 128, 0],
//     [0, 0, 128],
//     [128, 0, 64],
//     [0, 128, 64],
//     [128, 255, 0],
//     [128, 0, 128],
//     [0, 128, 128],
//     [255, 128, 0],
//     [255, 0, 128],
//     [0, 128, 255]
// ];

let element = document.querySelector('body')

// let colors = [[0, 0, 48],
// [0, 0, 64],
// [0, 0, 96],
// [0, 0, 128],
// [0, 0, 160],
// [0, 0, 192],
// [0, 0, 224],
// [0, 0, 255],
// [0, 16, 48],
// [0, 16, 64],
// [0, 16, 96],
// [0, 16, 128],
// [0, 16, 160],
// [0, 16, 192],
// [0, 16, 224],
// [0, 16, 255],
// [0, 32, 48],
// [0, 32, 64],
// [0, 32, 96],
// [0, 32, 128],
// [0, 32, 160],
// [0, 32, 192],
// [0, 32, 224],
// [0, 32, 255],
// [0, 48, 48],
// [0, 48, 64],
// [0, 48, 96],
// [0, 48, 128],
// [0, 48, 160],
// [0, 48, 192],
// [0, 48, 224],
// [0, 48, 255]]

let step = 0;
let Ar_Rotate = ['left top, right bottom', 'right top, left bottom', 'left top, left bottom', 'right top, right bottom'];
let rand_Rotate1 = 'left top'
rand_Rotate1 = Math.floor(0 + Math.random() * Ar_Rotate.length)
let colorIndices = [0, 1, 2, 3];
var gradientSpeed = 0.005;
function updateGradient() {
    if ($ === undefined) return;
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";



    $(element).css({

        background: `-webkit-gradient(linear,${Ar_Rotate[rand_Rotate1]},  from(${color1}), to(${color2}))`
    }).css({
        background: `-moz-linear-gradient(${Ar_Rotate[rand_Rotate1]},  ${color1}  0%,  ${color2} 100%)`
    });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];


        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
}




export {
    updateGradient
}