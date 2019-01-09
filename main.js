var yyy = document.getElementById('xxx');

screenWH()

window.onresize = function() {
    screenWH()
}

var context = yyy.getContext('2d');

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
eraser.onclick = function() {
    eraserEnable = true;
    actions.className = 'actions x';
}
brush.onclick = function() {
    eraserEnable = false;
    actions.className = 'actions';
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
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}