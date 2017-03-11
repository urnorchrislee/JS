
//构造函数
function TextCircle(option){
    this._init(option);
}

TextCircle.prototype = {
    constructor:TextCircle,
    _init:function(option){
        option = option || {};

        this.x = option.x || 0;
        this.y = option.y || 0;

        //半径
        this.innerRadius = option.innerRadius || 0;
        this.outerRadius = option.outerRadius || 0;

        //内圆颜色
        this.innerColor = option.innerColor || 'red';
        //外圆颜色
        this.outerColor = option.outerColor || 'gray';
        //文字内容
        this.text = option.text || 'xmg';

    },

    //渲染
    render: function (layerOrGroup) {
        //1.创建组
        var group = new Konva.Group({
            x:this.x,
            y:this.y
        });
        layerOrGroup.add(group);

        //2.创建内圆
        var innerCircle = new Konva.Circle({
            radius:this.innerRadius,
            fill:this.innerColor
        });
        group.add(innerCircle);

        //3.创建圆环
        var outerCircle = new Konva.Ring({
            innerRadius:this.innerRadius,
            outerRadius:this.outerRadius,
            fill:this.outerColor
        });
        group.add(outerCircle);

        //4.创建文字
        var text = new Konva.Text({
            x:-this.innerRadius,
            y:-8,
            width:2 *this.innerRadius,
            text:this.text,
            fill:"white",
            fontSize:20,
            align:'center'//文字居中对齐
        });
        group.add(text);
    }
}
