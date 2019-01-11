// document.body.addEventListener('touchstart', function(eee){
//     eee.preventDefault();
// }
var yyy = document.getElementById('xxx');

screenWH()

window.onresize = function() {
    screenWH()
}

var context = yyy.getContext('2d');
var lineWidth = 5;

var using = false;
var lastPoint = { x: undefined, y: undefined };

// 特性检测
if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    yyy.ontouchstart = function(aaa) {
        var x = aaa.touches["0"].clientX
        var y = aaa.touches["0"].clientY
        if (eraserEnable) {
            using = true;
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            using = true;
            lastPoint = { "x": x, "y": y };
        }
    }
    yyy.ontouchmove = function(aaa) {
        var x = aaa.touches["0"].clientX
        var y = aaa.touches["0"].clientY
        if (eraserEnable) {
            if (using) {
                context.clearRect(x - 5, y - 5, 10, 10);
            }
        } else {
            if (using) {
                var newPoint = { "x": x, "y": y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
    }
    yyy.ontouchend = function(aaa) {
        using = false;
    }
} else {
    // 非触屏设备
    yyy.onmousedown = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        if (eraserEnable) {
            using = true;
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            using = true;
            lastPoint = { "x": x, "y": y };
        }
    }
    yyy.onmousemove = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        if (eraserEnable) {
            if (using) {
                context.clearRect(x - 5, y - 5, 10, 10);
            }
        } else {
            if (using) {
                var newPoint = { "x": x, "y": y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
    }

    yyy.onmouseup = function(aaa) {
        using = false;
    }
}

var eraserEnable = false
pen.onclick = function(){
    eraserEnable = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}
eraser.onclick = function(){
    eraserEnable = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}
clear.onclick = function(){
    context.clearRect(0, 0, yyy.width, yyy.height);
}
download.onclick = function(){
    var url = yyy.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '我的画儿';
    a.target = '_blank';
    a.click();
}
red.onclick = function(){
    context.strokeStyle = "red";
    red.classList.add('active');
    green.classList.remove('active');
    black.classList.remove('active');
}
green.onclick = function(){
    context.strokeStyle = "green";
    green.classList.add('active');
    red.classList.remove('active');
    black.classList.remove('active');
}
black.onclick = function(){
    context.strokeStyle = "black";
    black.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
}
thin.onclick = function(){
    lineWidth = 5;
}
thick.onclick = function(){
    lineWidth = 10;
}
function screenWH() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    yyy.width = pageWidth;
    yyy.height = pageHeight;
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = lineWidth;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}