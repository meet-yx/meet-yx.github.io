/**
 * Created by Administrator on 2017/9/11 0011.
 */

//敌机
     //属性：X Y 路径、速度、img节点、血量
     //方法（功能）：发射子弹、移动、组装（初始化）

//玩家的飞机  localPlane
    //属性：X Y 路径 img节点 血量 积分
    //方法：发射子弹 移动（上下左右）组装（初始化）

// 玩家飞机的子弹
    //属性：X Y 路径 img节点
    //方法：移动  组装（初始化）

var game=document.getElementById("game");
var arrBadPlane=[];   //存放敌机
var arrZiDan=[];      //存放玩家子弹
var arrBadZiDan=[];   //存放敌机子弹

createPlayPlane();         //创建玩家飞机
createBadPlane1();         //创建敌机
createBadPlane2();         //创建敌机
createBadPlane3();         //创建敌机

var createBadPlane1Timer=setInterval(createBadPlane1,1000);   //创建敌机定时器
var moveBadPlaneTimer=setInterval(moveBadPlane,800);        //敌机移动定时器

var createBadPlane2Timer=setInterval(createBadPlane2,3000);   //创建敌机定时器
var createBadPlane3Timer=setInterval(createBadPlane3,4000);   //创建敌机定时器
var moveBadZiDanTimer=setInterval(moveBadZiDan,1);         //敌机子弹移动发射定时器

var playPengTimer=setInterval(playPeng,500);               //玩家子弹与敌机的碰撞
var playPengHouTimer=setInterval(playPengHou,200);         //玩家子弹与敌机的碰撞爆炸后的状态

var movePlayPlaneTimer=setInterval(movePlayPlane,1);       //玩家飞机移动定时器
var moveZiDanTimer=setInterval(moveZiDan,50);               //玩家子弹发射定时器
var badPengTimer=setInterval(badPeng,50);               //敌机子弹与玩家的碰撞

var left = false,down = false,right = false,up = false;
var playZi=false;
var planePlay;             //玩家对象


//创建玩家飞机
function  createPlayPlane(){
    // var x=156;
    planePlay=new localPlane(156,514,"plane-images/lplane.gif",1);
}
//玩家飞机移动
function movePlayPlane(){
    if (planePlay==undefined){
        return;
    }
    if(up){
        planePlay.moveUp();
    }
    if(down){
        planePlay.moveDown();
    }
    if(left){
        planePlay.moveLeft();
    }
    if(right){
        planePlay.moveRight();
    }
    if(playZi){
        planePlay.send();
    }
}
//玩家子弹移动
function moveZiDan(){
    for (var i=0;i<arrZiDan.length;i++){
        var top=parseInt(arrZiDan[i].imgNode.style.top);
        if(top==0){
            game.removeChild(arrZiDan[i].imgNode);
            arrZiDan.splice(i,1);
            i--;
        }else {
            arrZiDan[i].move();
        }
    }
}

//定义键盘事件
// 键盘按下
document.onkeydown = function(){
    var move = window.event||arguments[0];
    switch (move.keyCode){
        case 37:
            left = true;
            break;
        case 38:
            down = true;
            break;
        case 39:
            right = true;
            break;
        case 40:
            up = true;
            break;
        case 32:
            playZi=true;
            break;
    }
};
//松开键盘
document.onkeyup = function(){
    var move = window.event||arguments[0];
    switch (move.keyCode){
        case 37:
            left = false;
            break;
        case 38:
            down = false;
            break;
        case 39:
            right = false;
            break;
        case 40:
            up = false;
            break;
        case 32:
            playZi=false;
            break;

    }
};

//玩家子弹与敌机的碰撞后
function playPengHou(){
    for (var i=0;i<arrBadPlane.length;i++){
        if(arrBadPlane[i].isDied){
            game.removeChild(arrBadPlane[i].imgNode);
            arrBadPlane.splice(i,1);
            i--;
        }

    }
}
//玩家子弹与敌机的碰撞
function playPeng(){
    for (var i=0;i<arrZiDan.length;i++){
        var ziWidth=arrZiDan[i].imgNode.width;
        var ziHeight=arrZiDan[i].imgNode.height;
        var ziTop=parseInt(arrZiDan[i].imgNode.style.top);     //x轴
        var ziLeft=parseInt(arrZiDan[i].imgNode.style.left);   //y轴
        for (var j=0;j<arrBadPlane.length;j++){
            var BadPlaneWidth=arrBadPlane[j].imgNode.width;
            var BadPlaneHeight=arrBadPlane[j].imgNode.height;
            var BadPlaneTop=parseInt(arrBadPlane[j].imgNode.style.top);     //x轴
            var BadPlaneLeft=parseInt(arrBadPlane[j].imgNode.style.left);   //y轴
            if(ziLeft>(BadPlaneLeft-ziWidth)&&ziLeft<(BadPlaneLeft+ziWidth)
            &&ziTop>(BadPlaneTop-ziHeight)&&ziTop<(BadPlaneTop+BadPlaneHeight)){
                //敌机中弹后，爆炸的状态
                arrBadPlane[j].bleed--;
                var jiFen=arrBadPlane[j].jiFen++;
                if(arrBadPlane[j].bleed==0){
                    arrBadPlane[j].imgNode.src="plane-images/BeiJi_02.png";
                    arrBadPlane[j].isDied=true;
                }

                //敌机中弹后，子弹消失
                game.removeChild(arrZiDan[i].imgNode);
                arrZiDan.splice(i,1);
                i--;
                break;

            }
        }
    }
}

//敌机子弹与玩家的碰撞
function badPeng(){
    for (var i=0;i<arrBadZiDan.length;i++){
        var badZiWidth=arrBadZiDan[i].imgNode.width;
        var badZiHeight=arrBadZiDan[i].imgNode.height;
        var badZiTop=parseInt(arrBadZiDan[i].imgNode.style.top);     //x轴
        var badZiLeft=parseInt(arrBadZiDan[i].imgNode.style.left);   //y轴
            var PlaneWidth=planePlay.imgNode.width;
            var PlaneHeight=planePlay.imgNode.height;
            var PlaneTop=parseInt(planePlay.imgNode.style.top);     //x轴
            var PlaneLeft=parseInt(planePlay.imgNode.style.left);   //y轴
            if(badZiLeft>(PlaneLeft-badZiWidth)&&badZiLeft<(PlaneLeft+PlaneWidth)
                &&badZiTop>(PlaneTop-badZiHeight)&&badZiTop<(PlaneTop+PlaneHeight)){
                //玩家中弹后，爆炸的状态
                planePlay.bleed--;
                if(planePlay.bleed==0){
                    planePlay.imgNode.src="plane-images/BeiJi_2.png";
                    qichu();
                    planePlay.isDied=true;
                    alert("Game Over!");
                }

        }
    }
}

function qichu(){
     createBadPlane1Timer=clearInterval(createBadPlane1Timer);   //创建敌机定时器
     moveBadPlaneTimer=clearInterval(moveBadPlaneTimer);        //敌机移动定时器

     createBadPlane2Timer=clearInterval(createBadPlane2Timer);   //创建敌机定时器
     createBadPlane3Timer=clearInterval(createBadPlane3Timer);   //创建敌机定时器
     moveBadZiDanTimer=clearInterval(moveBadZiDanTimer);         //敌机子弹移动发射定时器

     playPengTimer=clearInterval(playPengTimer);               //玩家子弹与敌机的碰撞
     playPengHouTimer=clearInterval(playPengHouTimer);         //玩家子弹与敌机的碰撞爆炸后的状态

     movePlayPlaneTimer=clearInterval(movePlayPlaneTimer);       //玩家飞机移动定时器
     moveZiDanTimer=clearInterval(moveZiDanTimer);               //玩家子弹发射定时器
     badPengTimer=clearInterval(badPengTimer);               //敌机子弹与玩家的碰撞
}
//创建敌机
function createBadPlane1(){
    //限制敌机的在X轴出现的范围0-396,(除去敌机本身)
    var x=parseInt(Math.random()*397);
    var y=0;
    var plane=new badPlane(x,y,"plane-images/BluePlane.png",10);
    arrBadPlane.push(plane);
    plane.send();
}
function createBadPlane2(){
    //限制敌机的在X轴出现的范围0-396,(除去敌机本身)
    var x=parseInt(Math.random()*397);
    var y=0;
    var plane=new badPlane(x,y,"plane-images/BluePlane1.png",10);
    arrBadPlane.push(plane);
    plane.send();
}
function createBadPlane3(){
    //限制敌机的在X轴出现的范围0-396,(除去敌机本身)
    var x=parseInt(Math.random()*397);
    var y=0;
    var plane=new badPlane(x,y,"plane-images/BluePlane3.png",10);
    arrBadPlane.push(plane);
    plane.send();
}
//敌机移动
function moveBadPlane(){    //敌机移动
    for (var i=0;i<arrBadPlane.length;i++){
        var top=parseInt(arrBadPlane[i].imgNode.style.top);
        if(top>628){
            game.removeChild(arrBadPlane[i].imgNode);
            arrBadPlane.splice(i,1.5);
            i--;
        }else {
             arrBadPlane[i].move();
        }

    }
}

//敌机子弹移动
function moveBadZiDan(){
    for (var i=0;i<arrBadZiDan.length;i++){
        var top=parseInt(arrBadZiDan[i].imgNode.style.top);

        if(top>628){
            game.removeChild(arrBadZiDan[i].imgNode);
            arrBadZiDan.splice(i,1.5);
            i--;
        }else {
            arrBadZiDan[i].move();
        }
    }
}


//玩家飞机原型
function localPlane(x,y,src,speed){
    this.x=x;
    this.y=y;
    this.src=src;         //玩家飞机图片路径
    this.speed=speed;     //玩家飞机速度
    this.bleed=3;         //玩家血量
    this.isDied=false;    //玩家默认状态生存

    this.imgNode=document.createElement("img");  //获取图片节点

    this.send=function(){     //发射子弹
        var width=this.imgNode.width;
        var top=parseInt(this.imgNode.style.top);
        var left=parseInt(this.imgNode.style.left);
        var x=left+width/2-10;
        var y=top-40-10;
        var ziDan=new playZiDan(x,y,"plane-images/bullet_03.png",10);
        arrZiDan.push(ziDan);
    };

    this.moveUp=function(){      //向上移动
        var top=(parseInt(this.imgNode.style.top)+this.speed);
        if(top<(662-128)){
            this.imgNode.style.top=top+"px";
        }
    };

    this.moveDown=function(){      //向下移动
        var top=(parseInt(this.imgNode.style.top)-this.speed);
        if(top>0){
            this.imgNode.style.top=top+"px";
        }
    };

    this.moveLeft=function(){      //向左移动
        var left=(parseInt(this.imgNode.style.left)-this.speed);
        if(left>0){
            this.imgNode.style.left=left+"px";
        }
    };

    this.moveRight=function(){      //向右移动
        var left=(parseInt(this.imgNode.style.left)+this.speed);
        if(left<(442-128)){

            this.imgNode.style.left=left+"px";
        }
    };

    this.init=function(){    //开始状态
        this.imgNode.src= this.src;
        this.imgNode.style.left=x+"px";
        this.imgNode.style.top=y+"px";
        game.appendChild(this.imgNode);
    };
    this.init();
}
//玩家飞机的子弹发射原型
function playZiDan(x,y,src,speed){
    this.x=x;             //x轴位置
    this.y=y;             //y轴位置
    this.src=src;         //子弹图片路径
    this.speed=speed;     //子弹速度

    this.imgNode=document.createElement("img");  //获取子弹图片节点

    this.move=function(){      //子弹移动
        var top=(parseInt(this.imgNode.style.top)-this.speed);
        if(top>=0){
            this.imgNode.style.top=top+"px";
        }else {
            this.imgNode.style.top="0px";
        }
    };

    this.start=function(){    //子弹开始状态
        this.imgNode.src= this.src;
        this.imgNode.style.left=x+"px";
        this.imgNode.style.top=y+"px";
        game.appendChild(this.imgNode);
    };
    this.start();
}

//敌机原型
function badPlane(x,y,src,speed){
    this.x=x;             //x轴位置
    this.y=y;             //y轴位置
    this.src=src;         //敌机图片路径
    this.speed=speed;     //敌机速度
    this.bleed=1;         //敌机血量
    this.isDied=false;    //敌机默认状态存在
    this.imgNode=document.createElement("img");  //获取图片节点

    this.send=function(){     //发射子弹
        var width=this.imgNode.width;
        var top=parseInt(this.imgNode.style.top);
        var left=parseInt(this.imgNode.style.left);
        this.x=left+width/2-10;
        var y=top+10;
        var badZiDanx=new badZiDan(this.x,y,"plane-images/EnemyFire_02.png",1);
        arrBadZiDan.push(badZiDanx);
    };

    this.move=function(){      //移动
        var top=(parseInt(this.imgNode.style.top)+this.speed);
        this.imgNode.style.top=top+"px";
    };

    this.start=function(){    //开始状态
        this.imgNode.src= this.src;
        this.imgNode.style.left=x+"px";
        this.imgNode.style.top=y+"px";
        game.appendChild(this.imgNode);
    };
    this.start();
}
//敌机子弹发射原型
function badZiDan(x,y,src,speed){
    this.x=x;             //x轴位置
    this.y=y;             //y轴位置
    this.src=src;         //子弹图片路径
    this.speed=speed;     //子弹速度

    this.imgNode=document.createElement("img");  //获取子弹图片节点

    this.move=function(){      //子弹移动
        var top=(parseInt(this.imgNode.style.top)+this.speed);
        this.imgNode.style.top=top+"px";
    };

    this.start=function(){    //子弹开始状态
        this.imgNode.src= this.src;
        this.imgNode.style.left=x+"px";
        this.imgNode.style.top=y+"px";
        game.appendChild(this.imgNode);
    };
    this.start();
}

