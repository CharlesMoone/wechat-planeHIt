/**
 * Created by apple on 16/1/14.
 */
window.onload = function () {
    var bulletNumber = 0;
    //屏幕大小
    var size = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");

    //设置屏幕大小
    canvas.width = size.width;
    canvas.height = size.height;

    //设置我方飞机基本参数
    var startX = size.width / 2, startY = size.height * 0.8, planeSrc = "../game/images/plane.png";

    //初始化我方飞机
    var plane = new Plane(startX, startY, planeSrc);
    plane.img.onload = function () {
        ctx.drawImage(plane.img, plane.x - 25, plane.y - 25, 50, 50);
    }

    var bullet = [];
    setInterval(function () {
        bullet[bulletNumber] = new Bullet(plane.x, plane.y, "../game/images/cartridge.png");
        bulletNumber ++;
        //if (bullet[bulletNumber].y <= 0) {
        //    bullet.splice(bulletNumber, 1);
        //}
    }, 1000);

    canvas.addEventListener('touchmove', function (e) {
        e.preventDefault();
        ctx.clearRect(0, 0, size.width, size.height);
        plane.x = event.targetTouches[0].pageX;
        plane.y = event.targetTouches[0].pageY;
        ctx.drawImage(plane.img, plane.x - 25, plane.y - 25, 50, 50);
    });

    //var plane = new Plane(startX, startY, planeSrc, function (img, x, y) {
    //    console.log(img, ctx);
    //    ctx.drawImage(img, x - 50 / 2, canvas.height - y);
    //});
    //plane.img();
};

function Plane(x, y, src) {
    this.x = x;
    this.y = y;
    var img = new Image();
    img.src = src;
    this.img = img;
}

function Bullet(x, y, src) {
    //console.log("born!");
    this.x = x - 2.5;
    this.y = y - 5;
    var img = new Image();
    img.src = src;
    this.img = img;
}

//function Plane (x, y, src, callback) {
//    this.x = x;
//    this.y = y;
//    this.img = function () {
//        var img = new Image();
//        img.src = src;
//        img.onload = callback(img, x, y);
//    }
//}