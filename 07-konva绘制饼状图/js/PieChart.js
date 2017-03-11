
//构造函数
function PieChart(option){
    this._init(option);
}

PieChart.prototype = {
    constructor:PieChart,
    _init:function(option){ //属性
        option = option || {};
        //圆心
        this.x = option.x || 0;
        this.y = option.y || 0;

        //内圆半径
        this.innerRadius = option.innerRadius || 0;
        //外圆半径
        this.outerRadius = option.outerRadius || 0;

        //外圆的颜色
        this.outerColor = option.outerColor || 'blue';
        //外圆的线宽
        this.outerWidth = option.outerWidth || 1;
        //数组属性
        this.dataArr = option.dataArr||[];

        //角标属性
        this.animationIndex = 0;//动画角标
    },

    //渲染
    render: function (layer) {
        //备份指针
        var self = this;

        //1.创建总组
        this.group = new  Konva.Group({
            x:0,
            y:0
        });
        layer.add(this.group);

        //2.扇形组
        this.wedgeGroup = new  Konva.Group({
            x:0,
            y:0
        });
        this.group.add(this.wedgeGroup);

        //3.比例文字组
        var ratioGroup = new Konva.Group({
            x:0,
            y:0
        });
        this.group.add(ratioGroup);

        //4.区域组
        var areaGroup = new  Konva.Group({
            x:0,
            y:0
        });
        this.group.add(areaGroup);

        //5.绘制外圆
        var outerCircle = new Konva.Circle({
            x:this.x,
            y:this.y,
            radius:this.outerRadius,
            stroke:this.outerColor,
            strokeWidth:this.outerWidth
        });
        this.group.add(outerCircle);

        //6.遍历数组
        //起始角度
        var beginAngle = -90;
        this.dataArr.forEach(function (item, index) {

            //旋转角度
            //var rotation = beginAngle

            //6.1 创建扇形
            var wedge = new Konva.Wedge({
                x:self.x,
                y:self.y,
                radius:self.innerRadius,
                fill:item.color,
                angle:item.value * 360 , //扇形的角度
                rotation: beginAngle//旋转角度
            });
            //6.2 添加到扇形组
            self.wedgeGroup.add(wedge);

            //7.绘制比例文字
            //扇形角度
            var tempAngle = item.value * 360;
            //比例文字角度
            var textAngle = beginAngle + tempAngle * 0.5;
            //计算文字坐标
            var textX = self.x + (self.outerRadius + 30) * Math.cos(textAngle *Math.PI/180);
            var textY = self.y + (self.outerRadius + 30) * Math.sin(textAngle *Math.PI/180);
            console.log(textX, textY);

            //文字内容
            var text = item.value * 100 + '%';
            //创建文字对象
            var ratioText = new Konva.Text({
                x:textX,
                y:textY,
                text:text,
                fontSize:20,
                fontFamily:'微软雅黑',
                fill:item.color

            });

            //处理文字左边
            if (beginAngle > 90 && beginAngle < 270){
                ratioText.x(textX - ratioText.width());
            }

            //添加到比例组
            ratioGroup.add(ratioText);

            //8.绘制区域
            var areaX = self.x + self.outerRadius + 200;
            var areaY = self.y + index * 30;
            var areaW = 60;
            var areaH = 20;

            //绘制矩形
            var areaRect = new Konva.Rect({
                x:areaX,
                y:areaY,
                width:areaW,
                height:areaH,
                fill:item.color
            });
            areaGroup.add(areaRect);

            //绘制文字
            var areaText = new Konva.Text({
                x:areaX + areaW +10,
                y:areaY,
                text:item.name,
                fill:item.color,
                fontSize:14,

            });
            areaGroup.add(areaText);

            //更新起始角度
            beginAngle += item.value * 360;

        })
    },

    //动画处理
    playAnimation: function () {
        //备份指针
        var self = this;

        //初始状态
        //获取每一个扇形,将所有的扇形角度赋值为0
        //保证从第一个扇形开始的时候,才给扇形角度赋值为0
        if(this.animationIndex == 0){
            this.wedgeGroup.getChildren().each(function(item, index){
                item.angle(0);
            });
        }

        var wedge = this.wedgeGroup.getChildren()[this.animationIndex];

        //结束状态:让所有扇形展开,达到各自角度,并且依次做动画
        //直接或间接调用函数本身,递归函数
        //每次调用取出一个扇形做动画
        wedge.to({
            angle:this.dataArr[this.animationIndex].value * 360, //扇形的角度
            duration:this.dataArr[this.animationIndex].value, // 1s 内每个扇形做动画时间
            onFinish: function () {
                self.animationIndex++; //累加角标
                if (self.animationIndex >= self.dataArr.length){
                    self.animationIndex = 0;
                    return;
                }
                //递归
                self.playAnimation();
            }
        });


    }

}

