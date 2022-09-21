

import tranback from '../../src/accets/img/tranback.png'
interface Defaults{
    drawPanel?:string,
    canvasId?:any,
    imgId?:string,
    width:number,
    height:number,
    imgSrc:string,
    imgBackSrc?:string,
    penColor?:string,
    defaultPointList?:Array<any>,
    showTip?:Function
}
interface Img{
    image:HTMLImageElement,
    id: string,
    w: number,
    h: number
}
interface Canvas {
    canvas:any,
    id: any,
    w: number,
    h: number,
    //坐标点集合
    pointList:any,
    //临时存储坐标点
    tempPointList: Array<any>,
    //圆点的触发半径：
    roundr: number,
    //圆点的显示半径：
    roundrr: number,
    //当前拖动点的索引值；
    curPointIndex: number,
    //判断是否点击拖动
    paint: boolean,
    //判断是否点圆点拖动，并瞬间离开,是否拖动点；
    juPull: boolean,
    //判断是否闭合
    IsClose: boolean,
    imgBack: HTMLImageElement,
    penColor: string
}
export class Cut{
    DEFAULTS:Defaults = {
        drawPanel: "drawPanel",
        canvasId: "canvas",
        imgId: "imgCut",
        width: 400,
        height: 400,
        imgSrc: "",
        imgBackSrc: tranback,
        penColor: "#0087C4",
        defaultPointList: new Array(),
        showTip: function (msg:string) {
            alert(msg);
        }
    }
    //图片
    IMG:Img = {
        image: new Image(),
        id: "",
        w: 0,
        h: 0
    }
    //画布；
    CANVAS:Canvas = {
        canvas: new Object(),
        id: "",
        w: 0,
        h: 0,
        //坐标点集合
        pointList: new Array(),
        //临时存储坐标点
        tempPointList: new Array(),
        //圆点的触发半径：
        roundr: 7,
        //圆点的显示半径：
        roundrr: 7,
        //当前拖动点的索引值；
        curPointIndex: 0,
        //判断是否点击拖动
        paint: false,
        //判断是否点圆点拖动，并瞬间离开,是否拖动点；
        juPull: false,
        //判断是否闭合
        IsClose: false,
        imgBack: new Image(),
        penColor: "#0087C4"
    }
    constructor(data:Defaults){
        this.DEFAULTS=Object.assign(this.DEFAULTS,{...data});
        this.iniData()
        this.eventBind();
    }


    iniData(){
        this.DEFAULTS=Object.assign(this.DEFAULTS,{});
        this.CANVAS.id = this.DEFAULTS.canvasId;
        this.CANVAS.roundr = 7;
        this.CANVAS.roundrr = 3;
        this.CANVAS.imgBack.src = this.DEFAULTS.imgBackSrc;
        this.CANVAS.penColor = this.DEFAULTS.penColor;
        this.CANVAS.canvas =this.CANVAS.id
        this.CANVAS.canvas=this.CANVAS.canvas.getContext("2d");
        this.CANVAS.w = this.DEFAULTS.width;
        this.CANVAS.h = this.DEFAULTS.height;
       
        this.CANVAS.curPointIndex = 0;

        //图片
        this.IMG.w = this.CANVAS.w;
        this.IMG.h = this.CANVAS.h;
        this.IMG.image.src = this.DEFAULTS.imgSrc;

   
        //加载事件：
        this.ReDo();
        if (this.notEmptyObj(this.DEFAULTS.defaultPointList) && this.DEFAULTS.defaultPointList.length > 0) {
            this.setOriPoints(this.DEFAULTS.defaultPointList);
        }
    }

    eventBind(){
        const events=this.CANVAS.id;
        events.onmousemove=(e)=>{
            var p = this.CANVAS.pointList;
            if (this.CANVAS.paint) {//是不是按下了鼠标
                if (p.length > 0) {
                    this.equalStartPoint(p[p.length - 1].pointx, p[p.length - 1].pointy);
                }
                this.roundIn(e.offsetX, e.offsetY);
            }
            //判断是否在直线上
            //光标移动到线的附近如果是闭合的需要重新划线，并画上新添加的点
            this.AddNewNode(e.offsetX, e.offsetY);
            //添加动态线：
            this.draAllMove(e.offsetX, e.offsetY);
        }
        events.onmousedown=(e)=>{

            this.CANVAS.paint = true;
            //点击判断是否需要在线上插入新的节点：
            if (this.CANVAS.tempPointList.length > 0) {
                this.CANVAS.pointList.splice(this.CANVAS.tempPointList[1].pointx, 0, this.Point(this.CANVAS.tempPointList[0].pointx, this.CANVAS.tempPointList[0].pointy));
                //
                //清空临时数组
                this.CANVAS.tempPointList.length = 0;
            }
        }
        events.onmouseup=(e)=>{
            const p = this.CANVAS.pointList;
            //拖动结束
            this.CANVAS.paint = false;
            //拖动结束；
            if (this.CANVAS.juPull) {
                this.CANVAS.juPull = false;
                this.CANVAS.curPointIndex = 0;
                //验证抠图是否闭合：闭合，让结束点=开始点；添加标记
                this.equalStartPoint(p[p.length - 1].pointx, p[p.length - 1].pointy);
            } else {
                //如果闭合：禁止添加新的点；
                if (!this.CANVAS.IsClose) {//没有闭合
                    const point= this.Point(e.offsetX, e.offsetY)
                    p.push(point);
                    //验证抠图是否闭合：闭合，让结束点=开始点；添加标记
                    this.equalStartPoint(p[p.length - 1].pointx, p[p.length - 1].pointy);
                    //判断是否闭合：
                    //重新画；
                    if (p.length > 1) {
                        this.drawLine(p[p.length - 2].pointx, p[p.length - 2].pointy, p[p.length - 1].pointx, p[p.length - 1].pointy);
                        this.drawArc(p[p.length - 1].pointx, p[p.length - 1].pointy);
                    } else {
                        this.drawArc(p[p.length - 1].pointx, p[p.length - 1].pointy);
                    }
                } else {
                    //闭合
                }
            }
            //验证是否填充背景：
            if (this.CANVAS.IsClose) {
                this.fillBackColor();
                this.drawAllLine();
            }
        }
        events.onmouseleave=()=>{
            this.CANVAS.paint = false;
        }
    }
    Point(x, y) {
        return {
            pointx: x,
            pointy:y
        }
    }
    setOriPoints(pointObj) {
        this.clearCan();
        if (pointObj != null && pointObj.length > 0) {
            this.CANVAS.pointList = pointObj.concat();
            if (pointObj.length > 1 && pointObj[pointObj.length - 1].pointx == pointObj[0].pointx) {
                this.CANVAS.IsClose = true;
                this.fillBackColor();
            } else {
                this.drawAllLine();
            }
        }
    }

    //函数：重做，清空
    ReDo() {
        this.clearCan();
        //清空listPoint();
        this.CANVAS.pointList.length = 0;
        //IsClose闭合重新设为false;
        this.CANVAS.IsClose = false;
    }
    //保存：返回所有点的数组：
    SaveCut() {
        return this.CANVAS.pointList();
    }
    //更新画线
    drawAllLine() {
        for (var i = 0; i < this.CANVAS.pointList.length - 1; i++) {
            //画线
            var p = this.CANVAS.pointList;
            this.drawLine(p[i].pointx, p[i].pointy, p[i + 1].pointx, p[i + 1].pointy);
            //画圈
            this.drawArc(p[i].pointx, p[i].pointy);
        }
    }
    //动态线针：(光标的x,y)
    draAllMove(x, y) {
        if (!this.CANVAS.IsClose) {
            if (this.CANVAS.pointList.length >= 1) {
                //重画：
                this.clearCan();
                var p = this.CANVAS.pointList;
                for (var i = 0; i < this.CANVAS.pointList.length - 1; i++) {
                    //画线
                    this.drawLine(p[i].pointx, p[i].pointy, p[i + 1].pointx, p[i + 1].pointy);
                    ////画圈
                    this.drawArc(p[i].pointx, p[i].pointy);
                    if (i == this.CANVAS.pointList.length - 2) {
                        this.drawArc(p[i + 1].pointx, p[i + 1].pointy);
                    }
                }
                if (p.length == 1) {
                    this.drawArc(p[0].pointx, p[0].pointy);
                }
                this.drawArcSmall(x, y);
                this.drawLine(p[this.CANVAS.pointList.length - 1].pointx, p[this.CANVAS.pointList.length - 1].pointy, x, y);

            }
        }
    }Î
     //画线
     drawLine(startX, startY, endX, endY) {
        this.CANVAS.canvas.strokeStyle = this.CANVAS.penColor;
        this.CANVAS.canvas.lineWidth = 1;
        this.CANVAS.canvas.moveTo(startX, startY);
        this.CANVAS.canvas.lineTo(endX, endY);
        this.CANVAS.canvas.stroke();
    }
    //画圈：
    drawArc(x, y) {
        this.CANVAS.canvas.fillStyle = this.CANVAS.penColor;
        this.CANVAS.canvas.beginPath();
        this.CANVAS.canvas.arc(x, y, this.CANVAS.roundrr, 360, Math.PI * 2, true);
        this.CANVAS.canvas.closePath();
        this.CANVAS.canvas.stroke();
    }
    //画圈：
    drawArcSmall(x, y) {
        this.CANVAS.canvas.fillStyle = this.CANVAS.penColor;
        this.CANVAS.canvas.beginPath();
        this.CANVAS.canvas.arc(x, y, 0.1, 360, Math.PI * 2, true);
        this.CANVAS.canvas.closePath();
        this.CANVAS.canvas.stroke();
    }
    //光标移到线上画大圈：
    drawArcBig(x, y) {
        this.CANVAS.canvas.fillStyle = this.CANVAS.penColor;
        this.CANVAS.canvas.beginPath();
        this.CANVAS.canvas.arc(x, y, this.CANVAS.roundr + 2, 360, Math.PI * 2, true);
        this.CANVAS.canvas.closePath();
        this.CANVAS.canvas.stroke();
    }
    //填充背景色
    fillBackColor() {
        for (var i = 0; i < this.IMG.w; i += 96) {
            for (var j = 0; j <= this.IMG.h; j += 96) {
                this.CANVAS.canvas.drawImage(this.CANVAS.imgBack, i, j, 96, 96);
            }
        }
        this.CANVAS.canvas.globalCompositeOperation = "destination-out";
        this.CANVAS.canvas.beginPath();
        for (var i = 0; i < this.CANVAS.pointList.length; i++) {
            this.CANVAS.canvas.lineTo(this.CANVAS.pointList[i].pointx, this.CANVAS.pointList[i].pointy);
        }
        this.CANVAS.canvas.closePath();
        this.CANVAS.canvas.fill();
        this.CANVAS.canvas.globalCompositeOperation = "destination-over";
    }
    //判断结束点是否与起始点重合；
    equalStartPoint(x, y) {
        var p = this.CANVAS.pointList;
        if (p.length > 2 && Math.abs((x - p[0].pointx) * (x - p[0].pointx)) + Math.abs((y - p[0].pointy) * (y - p[0].pointy)) <= this.CANVAS.roundr * this.CANVAS.roundr) {
            //如果闭合
            this.CANVAS.IsClose = true;
            p[p.length - 1].pointx = p[0].pointx;
            p[p.length - 1].pointy = p[0].pointy;
        } else {
            this.CANVAS.IsClose = false;
        }
    }
    //清空画布
    clearCan() {
        this.CANVAS.canvas.clearRect(0, 0, this.CANVAS.w, this.CANVAS.h);
    }
    //判断鼠标点是不是在圆的内部：
    roundIn(x, y) {
        //刚开始拖动
        var p = this.CANVAS.pointList;
        if (!this.CANVAS.juPull) {
            for (var i = 0; i < p.length; i++) {

                if (Math.abs((x - p[i].pointx) * (x - p[i].pointx)) + Math.abs((y - p[i].pointy) * (y - p[i].pointy)) <= this.CANVAS.roundr * this.CANVAS.roundr) {
                    //说明点击圆点拖动了；
                    this.CANVAS.juPull = true;//拖动
                    this.CANVAS.curPointIndex = i;
                    p[i].pointx = x;
                    p[i].pointy = y;
                    //重画：
                    this.clearCan();
                    if (this.CANVAS.IsClose) {
                        this.fillBackColor();
                    }
                    this.drawAllLine();
                    return;
                }
            }
        } else {//拖动中
            p[this.CANVAS.curPointIndex].pointx = x;
            p[this.CANVAS.curPointIndex].pointy = y;
            //重画：
            this.clearCan();
            if (this.CANVAS.IsClose) {
                this.fillBackColor();
            }
            this.drawAllLine();
        }
    };
    //光标移到线上，临时数组添加新的节点：
    AddNewNode(newx, newy) {
        //如果闭合
        var ii = 0;
        if (this.CANVAS.IsClose) {
            //判断光标点是否在线上：
            var p = this.CANVAS.pointList;
            for (var i = 0; i < p.length - 1; i++) {
                //计算a点和b点的斜率
                // var k =(p[i + 1].pointy - p[i].pointy) / (p[i + 1].pointx - p[i].pointx);
                var result = false;
                if (parseFloat(p[i + 1].pointx) - parseFloat(p[i].pointx) != 0) {
                    var k:any = (p[i + 1].pointy - p[i].pointy) / (p[i + 1].pointx - p[i].pointx);
                    var b = p[i].pointy - k * p[i].pointx;
                    var userK:any = (k * newx + b);
                    if (((userK < newy + 4 && userK > newy - 4) || (parseInt(userK) == parseInt(newy))) && (newx - p[i + 1].pointx) * (newx - p[i].pointx) <= 2 && (newy - p[i + 1].pointy) * (newy - p[i].pointy) <= 2) {
                        var aa = Math.abs(p[i + 1].pointx - p[i].pointx - 3);
                        var ab = Math.abs(p[i + 1].pointx - newx);
                        var ac = Math.abs(newx - p[i].pointx);
                        var ba = Math.abs(p[i + 1].pointy - p[i].pointy - 3);
                        var bb = Math.abs(p[i + 1].pointy - newy);
                        var bc = Math.abs(newy - p[i].pointy);
                        if (aa <= 2 || aa >= 4) {
                            if (ab <= aa && ac <= aa && bb <= ba && bc <= ba) {
                                result = true;
                            }
                        } else {
                            if (ab <= aa && ac <= aa) {
                                result = true;
                            }
                        }
                    }
                }
                //考虑接近垂直的情况
                if (parseFloat(p[i + 1].pointx) - parseFloat(p[i].pointx) == 0 || (Math.abs(parseFloat(p[i + 1].pointx) / parseFloat(p[i].pointx)) >= 15)) {
                    if (p[i].pointx + 3 >= newx && p[i].pointx - 3 <= newx) {
                        var ba = Math.abs(p[i + 1].pointy - p[i].pointy - 3);
                        var bb = Math.abs(p[i + 1].pointy - newy);
                        var bc = Math.abs(newy - p[i].pointy);
                        if (bb <= ba && bc <= ba) {
                            result = true;
                        }
                    }
                }
                if (result) {
                    //添加临时点：
                    this.CANVAS.tempPointList[0] =  this.Point(newx, newy);//新的坐标点
                    this.CANVAS.tempPointList[1] =  this.Point(i + 1, i + 1);//需要往pointlist中插入新点的索引；
                    i++;
                    //光标移动到线的附近如果是闭合的需要重新划线，并画上新添加的点；
                    if (this.CANVAS.tempPointList.length > 0) {
                        //重画：
                        this.clearCan();
                        //showImg();
                        if (this.CANVAS.IsClose) {
                            this.fillBackColor();
                        }
                        this.drawAllLine();
                        this.drawArcBig(this.CANVAS.tempPointList[0].pointx, this.CANVAS.tempPointList[0].pointy);
                        return;
                    }
                    return;
                }
            }
            if (ii == 0) {
                if (this.CANVAS.tempPointList.length > 0) {
                    //清空临时数组；
                    this.CANVAS.tempPointList.length = 0;
                    //重画：
                    this.clearCan();
                    //showImg();
                    if (this.CANVAS.IsClose) {
                        this.fillBackColor();
                    }
                    this.drawAllLine();
                }
            }
        } else {
            //防止计算误差引起的添加点，当闭合后，瞬间移动起始点，可能会插入一个点到临时数组，当再次执行时，
            //就会在非闭合情况下插入该点，所以，时刻监视：
            if (this.CANVAS.tempPointList.length > 0) {
                this.CANVAS.tempPointList.length = 0;
            }
        }
    }

    notEmptyObj(obj) {
        if (obj != null && obj != undefined && obj != "") {
            return true;
        }
        return false;
    }
    createCutImg(fun) {
        var tempPointArray;
        var tempPointList;
        if (this.notEmptyObj(this.CANVAS.pointList) && this.CANVAS.pointList.length > 1) {
            tempPointList = JSON.parse(JSON.stringify(this.CANVAS.pointList));
            tempPointArray = this.movePointArray(tempPointList);
        } else {
            this.DEFAULTS.showTip("请先进行抠图操作");
            return;
        }
        var proxy = this as any;
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = this.DEFAULTS.imgSrc;
        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = tempPointArray[1].pointx - tempPointArray[0].pointx;
            canvas.height = tempPointArray[1].pointy - tempPointArray[0].pointy;
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0; i < tempPointList.length; i++) {
                ctx.lineTo(tempPointList[i].pointx, tempPointList[i].pointy);
            }
            ctx.lineTo(tempPointList[0].pointx, tempPointList[0].pointy);
            ctx.clip();
            ctx.drawImage(img, tempPointArray[0].pointx * -1, tempPointArray[0].pointy * -1, proxy.IMG.w, proxy.IMG.h);
            fun(canvas.toDataURL("image/png"), canvas.width, canvas.height);
        };
    }
    downLoad() {
        var tempPointArray;
        var tempPointList;
        if (this.notEmptyObj(this.CANVAS.pointList) && this.CANVAS.pointList.length > 1) {
            tempPointList = JSON.parse(JSON.stringify(this.CANVAS.pointList));
            tempPointArray = this.movePointArray(tempPointList);
        } else {
            this.DEFAULTS.showTip("请先进行抠图操作");
            return;
        }
        var proxy = this;
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = this.DEFAULTS.imgSrc;
        img.onload = function () {
            var canvas:any = document.createElement("canvas");
            canvas.width = tempPointArray[1].pointx - tempPointArray[0].pointx;
            canvas.height = tempPointArray[1].pointy - tempPointArray[0].pointy;
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0; i < tempPointList.length; i++) {
                ctx.lineTo(tempPointList[i].pointx, tempPointList[i].pointy);
            }
            ctx.lineTo(tempPointList[0].pointx, tempPointList[0].pointy);
            ctx.clip();
            ctx.drawImage(img, tempPointArray[0].pointx * -1, tempPointArray[0].pointy * -1, proxy.IMG.w, proxy.IMG.h);
            var fileName = "target.png";
            const nav = (window.navigator as any);
            if (nav.msSaveOrOpenBlob) {
                var imgData = canvas.msToBlob();
                var blobObj = new Blob([imgData]);
                nav.msSaveOrOpenBlob(blobObj, fileName);
            } else {
                var imgData = canvas.toDataURL("image/png");
                var a = document.createElement('a');
                var event = new MouseEvent('click');
                a.download = fileName;
                a.href = imgData;
                a.dispatchEvent(event);
            }
        };
    }
    movePointArray = function (pointArray) {
        var smallX = pointArray[0].pointx;
        var smallY = pointArray[0].pointy;
        var bigX = smallX;
        var bigY = smallY;
        var tempArray = new Array();
        for (var i = 1; i < pointArray.length; i++) {
            if (pointArray[i].pointx < smallX) {
                smallX = pointArray[i].pointx;
            }
            if (pointArray[i].pointx > bigX) {
                bigX = pointArray[i].pointx;
            }
            if (pointArray[i].pointy < smallY) {
                smallY = pointArray[i].pointy;
            }
            if (pointArray[i].pointy > bigY) {
                bigY = pointArray[i].pointy;
            }
        }
        for (var i = 0; i < pointArray.length; i++) {
            pointArray[i].pointx -= smallX;
            pointArray[i].pointy -= smallY;
        }
        tempArray[0] =  this.Point(smallX, smallY);
        tempArray[1] =  this.Point(bigX, bigY);
        return tempArray;
    }
}