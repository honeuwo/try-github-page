// 

// canvasを配置
let body = document.getElementsByTagName("body")[0];
let explanation = document.getElementById("explanation");
let win = window,
	e = document.documentElement,
	width = win.innerWidth || e.clientWidth || body.clientHeight,
	height = win.innerHeight | e.clientHeight | body.clientHeight;
	if(width > 800) width = 800;
width *= 0.9;
height *= 0.7;
// let width = 350;
// let height = 450;
let canvas = document.createElement("canvas");
body.appendChild(canvas);
let ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;
canvas.style.border = "1px solid";
canvas.style.backgroundColor = "white";

// 変数
let angle = 0;				//角度
let radius = 100;			//半径
let direction = false;		//半径変化の向き
let hue = 0;				//色相
// let saturation = 0.6;	//彩度
// let value = 0.8;			//明度
let oldPoss = [
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
	{ x: 0, y: 0 }
];
let mousePos = { x: width/2, y: height/2 };
let count = 15;

// ■登録━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// mousodownイベントリスナを登録
canvas.addEventListener("mousemove", function mouseMoveListener(e) {
	// プレス時の相対位置を記録
	// 要素の原点からの距離
	mousePos = { x: e.offsetX, y: e.offsetY }; 
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
	let hueTemp = hue + Math.random() * 180;
	if(hueTemp >= 360) hueTemp -= 360;
	// 透過
	let alpha = 0 + Math.random() * 0.6; 
	let col = hsv2rgbToString(hueTemp, Math.random()*0.7, 1);
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
	drawSquare(mousePos, radius, angle, col, alpha);
	if(count > 15) {
		count = 0;
		explanation.style.color = col;
	}
	count++;
}, 20);

// ■関数━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 角度のついた正三角形を描画
function drawSquare(pos, radius, angle, color, alpha) {
	ctx.globalAlpha = alpha;
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
		poss.push(positionByAngle(pos, radius, angle));
	}
	oldPoss = poss;
	// 白の描画
	// ctx.fillStyle = "white"; 
	// ctx.beginPath();
	// for(let num=0; num<4; num++) {
	// 	if(num == 0) 
	// 		ctx.moveTo(poss[num].x, poss[num].y);
	// 	else
	// 		ctx.lineTo(poss[num].x, poss[num].y);
	// }
	// ctx.closePath();
	// ctx.fill();
}

// 半径と角度から座標を計算
function positionByAngle(pos, radius, angle) {
	let rad = angle * (Math.PI/180);
	let x = pos.x + radius * Math.cos(rad);
	let y = pos.y - radius * Math.sin(rad);
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
