
//构造函数
function ProgressBar(option){
    this._init(option);
}

ProgressBar.prototype = {
    constructor:ProgressBar,
    _init:function(option){
        option = option || {};

        this.x = option.x || 0;
        this.y = option.y || 0;
        this.width = option.width || 0;
        this.height = option.height || 0;

        this.stroke = option.stroke || 'gray'; //描边颜色
        this.strokeWidth = option.strokeWidth || 1; //描边线宽

        this.fill = option.fill || 'blue'; //填充颜色
        this.cornerRadius = option.cornerRadius || 2;//圆角

        this.opacity = option.opacity || 1;//透明度
        this.value = option.value || 1; //宽度比例
        this.duration = option.duration || 2;//动画时间
    },

    //渲染
    render:function(layer){
        //1.创建组
        this.group = new Konva.Group({
            x:0,
            y:0
        });
        //组添加到层上
        layer.add(this.group);

        //2.创建里面矩形
        var innerRect = new Konva.Rect({
            x:this.x,
            y:this.y,
            width:this.width * this.value,
            height:this.height,
            fill:this.fill,
            id:'innerRect'//别名
        });
        //添加到组里
        this.group.add(innerRect);

        //3.创建外边矩形
        var outerRect = new Konva.Rect({
            x:this.x,
            y:this.y,
            width:this.width,
            height:this.height,
            stroke:this.stroke,
            strokeWidth:this.strokeWidth,
            cornerRadius:this.cornerRadius,//圆角
            opacity:this.opacity //透明度
        });
        //添加到组里
        this.group.add(outerRect);
    },

    //动画
    playAnimation: function () {

        //获取里面矩形
        var innerRect = this.group.findOne('#innerRect');
        //konva做动画要先确定两个状态: 初始状态, 结束状态
        //结束状态
        innerRect.to({
            width:this.width, //做动画属性
            duration:this.duration,
            easing:Konva.Easings.EaseInOut, //动画效果
            yoyo:true //动画循环播放
        });
    }

}
