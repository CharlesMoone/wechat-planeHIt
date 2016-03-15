/**
 * Created by apple on 16/1/14.
 */
var canvas, ctx;
var imgLoad = [];

window.onload = function () {
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    var imgSrc = ["../game/images/plane.png", "../game/images/cartridge.png"];

    for (var i = 0; i < imgSrc.length; i ++) {
        imgLoad[i] = new Image();
        imgLoad[i].src = imgSrc[i];
        if (i == imgSrc.length - 1) {
            imgLoad[i].onload = game;
        }
    }
};

function game() {
    //屏幕大小
    var size = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    //设置屏幕大小
    canvas.width = size.width;
    canvas.height = size.height;

    var bulletNumber = 0;
    //设置我方飞机基本参数
    var startX = size.width / 2, startY = size.height * 0.8;

    //初始化我方飞机
    var plane = new Plane(startX, startY, imgLoad[0]);
    ctx.drawImage(plane.img, plane.x - 25, plane.y - 25, 50, 50);

    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        ctx.clearRect(plane.x - 25, plane.y - 25, 50, 50);
        plane.x = event.targetTouches[0].pageX;
        plane.y = event.targetTouches[0].pageY;
        ctx.drawImage(plane.img, plane.x - 25, plane.y - 25, 50, 50);
    });

    var bullet = [];
    setInterval(function () {
        bullet[bulletNumber] = new Bullet(plane.x, plane.y, imgLoad[1]);
        ctx.drawImage(bullet[bulletNumber].img, plane.x - 2.5, plane.y - 50, 5, 20);
        bullet[bulletNumber].move(bullet[bulletNumber], bulletNumber, ctx, bullet);
        bulletNumber ++;
        //console.log(bullet);
    }, 500);
}

function Plane(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
}

function Bullet(x, y, img) {
    this.x = x - 2.5;
    this.y = y - 50;
    this.img = img;
    this.move = function (bullet, bulletNumber, ctx, bulletArray) {
        var bulletRun = setInterval(function () {
            ctx.clearRect(bullet.x, bullet.y, 5, 20);
            bullet.y -= 5;
            ctx.drawImage(bullet.img, bullet.x, bullet.y, 5, 20);
            if (bullet.y <= 0) {
                window.clearInterval(bulletRun);
                bulletArray.splice(bulletNumber, 1);
                ctx.clearRect(bullet.x, bullet.y, 5, 20);
            }
        }, 15);
    }
}