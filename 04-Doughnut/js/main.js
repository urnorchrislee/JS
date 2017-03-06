/**
 * Created by 凸小布 on 2017/3/6.
 */
var themeprimary = getThemeColorFromCss('themeprimary');
var themesecondary = getThemeColorFromCss('themesecondary');
var themethirdcolor = getThemeColorFromCss('themethirdcolor');
var themefourthcolor = getThemeColorFromCss('themefourthcolor');
var themefifthcolor = getThemeColorFromCss('themefifthcolor');

//Gets Theme Colors From Selected Skin To Use For Drawing Charts
function getThemeColorFromCss(style) {
    var $span = $("<span></span>").hide().appendTo("body");
    $span.addClass(style);
    var color = $span.css("color");
    $span.remove();
    return color;
}

var InitiateChartJS = function () {
    return {
        init: function () {
            var doughnutData = [
                {
                    value: 30,
                    color: themeprimary
                },
                {
                    value: 50,
                    color: themesecondary
                },
                {
                    value: 100,
                    color: themethirdcolor
                },
                {
                    value: 40,
                    color: themefourthcolor
                },
                {
                    value: 120,
                    color: themefifthcolor
                },
                {
                    value: 120,
                    color: themesecondary
                }

            ];
            new Chart(document.getElementById("doughnut").getContext("2d")).Doughnut(doughnutData);
        }
    };
}();


//Define the global Chart Variable as a class.
window.Chart = function(context){

    var chart = this;

    //Easing functions adapted from Robert Penner's easing equations
    //http://www.robertpenner.com/easing/

    var animationOptions = {
        linear : function (t){
            return t;
        },
        easeInQuad: function (t) {
            return t*t;
        },
        easeOutQuad: function (t) {
            return -1 *t*(t-2);
        },
        easeInOutQuad: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t;
            return -1/2 * ((--t)*(t-2) - 1);
        },
        easeInCubic: function (t) {
            return t*t*t;
        },
        easeOutCubic: function (t) {
            return 1*((t=t/1-1)*t*t + 1);
        },
        easeInOutCubic: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t;
            return 1/2*((t-=2)*t*t + 2);
        },
        easeInQuart: function (t) {
            return t*t*t*t;
        },
        easeOutQuart: function (t) {
            return -1 * ((t=t/1-1)*t*t*t - 1);
        },
        easeInOutQuart: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t*t;
            return -1/2 * ((t-=2)*t*t*t - 2);
        },
        easeInQuint: function (t) {
            return 1*(t/=1)*t*t*t*t;
        },
        easeOutQuint: function (t) {
            return 1*((t=t/1-1)*t*t*t*t + 1);
        },
        easeInOutQuint: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t*t*t;
            return 1/2*((t-=2)*t*t*t*t + 2);
        },
        easeInSine: function (t) {
            return -1 * Math.cos(t/1 * (Math.PI/2)) + 1;
        },
        easeOutSine: function (t) {
            return 1 * Math.sin(t/1 * (Math.PI/2));
        },
        easeInOutSine: function (t) {
            return -1/2 * (Math.cos(Math.PI*t/1) - 1);
        },
        easeInExpo: function (t) {
            return (t==0) ? 1 : 1 * Math.pow(2, 10 * (t/1 - 1));
        },
        easeOutExpo: function (t) {
            return (t==1) ? 1 : 1 * (-Math.pow(2, -10 * t/1) + 1);
        },
        easeInOutExpo: function (t) {
            if (t==0) return 0;
            if (t==1) return 1;
            if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
            return 1/2 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function (t) {
            if (t>=1) return t;
            return -1 * (Math.sqrt(1 - (t/=1)*t) - 1);
        },
        easeOutCirc: function (t) {
            return 1 * Math.sqrt(1 - (t=t/1-1)*t);
        },
        easeInOutCirc: function (t) {
            if ((t/=1/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
            return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
        },
        easeInElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
        },
        easeOutElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*1-s)*(2*Math.PI)/p ) + 1;
        },
        easeInOutElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1/2)==2) return 1;  if (!p) p=1*(.3*1.5);
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p )*.5 + 1;
        },
        easeInBack: function (t) {
            var s = 1.70158;
            return 1*(t/=1)*t*((s+1)*t - s);
        },
        easeOutBack: function (t) {
            var s = 1.70158;
            return 1*((t=t/1-1)*t*((s+1)*t + s) + 1);
        },
        easeInOutBack: function (t) {
            var s = 1.70158;
            if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
            return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
        },
        easeInBounce: function (t) {
            return 1 - animationOptions.easeOutBounce (1-t);
        },
        easeOutBounce: function (t) {
            if ((t/=1) < (1/2.75)) {
                return 1*(7.5625*t*t);
            } else if (t < (2/2.75)) {
                return 1*(7.5625*(t-=(1.5/2.75))*t + .75);
            } else if (t < (2.5/2.75)) {
                return 1*(7.5625*(t-=(2.25/2.75))*t + .9375);
            } else {
                return 1*(7.5625*(t-=(2.625/2.75))*t + .984375);
            }
        },
        easeInOutBounce: function (t) {
            if (t < 1/2) return animationOptions.easeInBounce (t*2) * .5;
            return animationOptions.easeOutBounce (t*2-1) * .5 + 1*.5;
        }
    };

    //Variables global to the chart
    var width = context.canvas.width;
    var height = context.canvas.height;


    //High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
    if (window.devicePixelRatio) {
        context.canvas.style.width = width + "px";
        context.canvas.style.height = height + "px";
        context.canvas.height = height * window.devicePixelRatio;
        context.canvas.width = width * window.devicePixelRatio;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }


    this.Doughnut = function(data,options){

        chart.Doughnut.defaults = {
            segmentShowStroke : true,
            segmentStrokeColor : "#fff",
            segmentStrokeWidth : 2,
            percentageInnerCutout : 50,
            animation : true,
            animationSteps : 100,
            animationEasing : "easeOutBounce",
            animateRotate : true,
            animateScale : false,
            onAnimationComplete : null
        };

        var config = (options)? mergeChartConfig(chart.Doughnut.defaults,options) : chart.Doughnut.defaults;

        return new Doughnut(data,config,context);
    };


    var clear = function(c){
        c.clearRect(0, 0, width, height);
    };

    var Doughnut = function(data,config,ctx){
        var segmentTotal = 0;

        //In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
        var doughnutRadius = Min([height/2,width/2]) - 5;

        var cutoutRadius = doughnutRadius * (config.percentageInnerCutout/100);

        for (var i=0; i<data.length; i++){
            segmentTotal += data[i].value;
        }

        animationLoop(config,null,drawPieSegments,ctx);

        function drawPieSegments (animationDecimal){
            var cumulativeAngle = -Math.PI/2,
                scaleAnimation = 1,
                rotateAnimation = 1;
            if (config.animation) {
                if (config.animateScale) {
                    scaleAnimation = animationDecimal;
                }
                if (config.animateRotate){
                    rotateAnimation = animationDecimal;
                }
            }
            for (var i=0; i<data.length; i++){
                var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
                ctx.beginPath();
                ctx.arc(width/2,height/2,scaleAnimation * doughnutRadius,cumulativeAngle,cumulativeAngle + segmentAngle,false);
                ctx.arc(width/2,height/2,scaleAnimation * cutoutRadius,cumulativeAngle + segmentAngle,cumulativeAngle,true);
                ctx.closePath();
                ctx.fillStyle = data[i].color;
                ctx.fill();

                if(config.segmentShowStroke){
                    ctx.lineWidth = config.segmentStrokeWidth;
                    ctx.strokeStyle = config.segmentStrokeColor;
                    ctx.stroke();
                }
                cumulativeAngle += segmentAngle;
            }
        }

    }

    function animationLoop(config,drawScale,drawData,ctx){
        var animFrameAmount = (config.animation)? 1/CapValue(config.animationSteps,Number.MAX_VALUE,1) : 1,
            easingFunction = animationOptions[config.animationEasing],
            percentAnimComplete =(config.animation)? 0 : 1;



        if (typeof drawScale !== "function") drawScale = function(){};

        requestAnimFrame(animLoop);

        function animateFrame(){
            var easeAdjustedAnimationPercent =(config.animation)? CapValue(easingFunction(percentAnimComplete),null,0) : 1;
            clear(ctx);
            if(config.scaleOverlay){
                drawData(easeAdjustedAnimationPercent);
                drawScale();
            } else {
                drawScale();
                drawData(easeAdjustedAnimationPercent);
            }
        }
        function animLoop(){
            //We need to check if the animation is incomplete (less than 1), or complete (1).
            percentAnimComplete += animFrameAmount;
            animateFrame();
            //Stop the loop continuing forever
            if (percentAnimComplete <= 1){
                requestAnimFrame(animLoop);
            }
            else{
                if (typeof config.onAnimationComplete == "function") config.onAnimationComplete();
            }
        }
    }


    // shim layer with setTimeout fallback
    var requestAnimFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    //Min value from array
    function Min( array ){
        return Math.min.apply( Math, array );
    };

    //Is a number function
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    //Apply cap a value at a high or low number
    function CapValue(valueToCap, maxValue, minValue){
        if(isNumber(maxValue)) {
            if( valueToCap > maxValue ) {
                return maxValue;
            }
        }
        if(isNumber(minValue)){
            if ( valueToCap < minValue ){
                return minValue;
            }
        }
        return valueToCap;
    }
}


