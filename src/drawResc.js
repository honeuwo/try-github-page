// 

// ブラウザのクライアント領域を取得
let body = document.getElementsByClassName("body")[0];
let width = window.width || document.documentElement.clientWidth || body.clientWidth;
let Height = window.height || document.documentElement.clientHeight || body.clientHeight;

// canvasを配置
let canvas = document.createElement("canvas");
body.appendChild(canvas);
let ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

function drawScuare(x, y, radius, angle) {
	ctx.beginPath();
	let pos = positionByAngle(angle, radius);
	ctx.
}

// 半径と角度から座標を計算
function positionByAngle(angle, radius) {
	let rad = angle * (Math.PI/180);
	let x = radius * Math.cos(rad);
	let y = radius * Math.sin(rad);
	return { x: x, y: y };
}