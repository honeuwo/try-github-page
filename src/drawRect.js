// 

// ブラウザのクライアント領域を取得
let body = document.getElementsByTagName("body")[0];
let width = 600;
let height = 300;
// let width = window.innerWidth || document.documentElement.clientWidth || body.clientWidth;
// let height = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
// var win = window,
// 	d = document,
// 	e = d.documentElement,
// 	g = d.getElementsByTagName('body')[0],
// 	width = win.innerWidth || e.clientWidth || g.clientHeight,
// 	height = win.innerHeight | e.clientHeight | g.clientHeight;

// canvasを配置
let canvas = document.createElement("canvas");
body.appendChild(canvas);
let ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;
canvas.style.border = "1px solid";

// 変数
let angle = 0;				//角度
let radius = 20;			//半径
let direction = 1;			//半径変化の向き
let hue = 0;				//色相
// let saturation = 0.6;		//彩度
// let value = 0.8;			//明度
let oldPoss = [
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 }
];
let mousePosX, mousePosY;

// mousodownイベントリスナを登録
canvas.addEventListener("mousemove", function mouseMoveListener(e) {
	// プレス時の相対位置を記録
	// 要素の原点からの距離
	mousePosX = e.offsetX;
	mousePosY = e.offsetY;
	console.log(mousePosX +" | "+ mousePosY);
}, false);

// setintarval登録
setInterval(() => {
	// let now = Date.now() /1000;
	// console.log(now.toFixed());
	// 角度
	angle += 0.5;
	if(angle >= 360) angle -= 360;
	// 色
	hue += 0.5;
	if(hue >= 360) hue -= 360;
	let hueTemp = hue + Math.random() * 200;
	let saturation = 0.3 + Math.random() * 0.5; 
	let col = hsv2rgbToString(hueTemp, saturation, 0.8);
	// console.log(col);
	// 半径
	radius+= direction;
	if(direction) {		//増加中なら
		radius += 0.4;
		if(radius >= 100) direction = false;
	} else {			//減少中なら
		radius -= 0.4;
		if(radius < 10) direction = true;
	}
	// 描画
	console.log(mousePosX +" | "+ mousePosY);
	drawSquare(mousePosX, mousePosY, radius, angle, col);
}, 20);

// 角度のついた正三角形を描画
function drawSquare(x, y, radius, angle, color) {
	// ctx.fillStyle = "rgb(80, 80, 80)";
	// ctx.fillRect(0, 0, width, height);
	// if(direction)
	// 	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = color;
	// 描画
	ctx.beginPath();
	for(let num=0; num<4; num++) {
		if(num == 0) 
			ctx.moveTo(oldPoss[num].x, oldPoss[num].y);
		else
			ctx.lineTo(oldPoss[num].x, oldPoss[num].y);
	}
	ctx.closePath();
	ctx.fill();	
	// 座標の計算
	let poss = [];
	for(let num=0; num<4; num++) {
		angle -= 90;
		poss.push(positionByAngle(x, y, radius, angle));
	}
	oldPoss = poss;
	// 白の描画
	ctx.fillStyle = "white"; 
	ctx.beginPath();
	for(let num=0; num<4; num++) {
		if(num == 0) 
			ctx.moveTo(poss[num].x, poss[num].y);
		else
			ctx.lineTo(poss[num].x, poss[num].y);
	}
	ctx.closePath();
	ctx.fill();	
}

// 半径と角度から座標を計算
function positionByAngle(x, y, radius, angle) {
	let rad = angle * (Math.PI/180);
	x += radius * Math.cos(rad);
	y -= radius * Math.sin(rad);
	return { x: x, y: y };
}

// hsvをrgbに変換
// 範囲 h:0~359, s:0~1, v:0~1
function hsv2rgb(h, s, v) {
	var c = v * s;
	var hp = h / 60;
	var x = c * (1 - Math.abs(hp % 2 - 1));
	
	var r, g, b;
	if (0 <= hp && hp < 1) [r, g, b] = [c, x, 0];
	if (1 <= hp && hp < 2) [r, g, b] = [x, c, 0];
	if (2 <= hp && hp < 3) [r, g, b] = [0, c, x];
	if (3 <= hp && hp < 4) [r, g, b] = [0, x, c];
	if (4 <= hp && hp < 5) [r, g, b] = [x, 0, c];
	if (5 <= hp && hp < 6) [r, g, b] = [c, 0, x];
	
	// console.log([r, g, b]);
	var m = v - c;
	[r, g, b] = [r + m, g + m, b + m];
	// console.log([r, g, b]);
	r = Math.floor(r * 255);
	g = Math.floor(g * 255);
	b = Math.floor(b * 255);

	return [r, g, b];
}

function hsv2rgbToString(h, s, v) {
	let rgb =hsv2rgb(h, s, v);
	let result = 
		"rgb("+
		rgb[0] +", "+ 
		rgb[1] +", "+ 
		rgb[2] +")"; 
	return result;
}