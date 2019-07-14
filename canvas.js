var canvas=document.getElementById('canvas');
var cxt=canvas.getContext('2d');

	// 获取方法工具
	var Brush=document.getElementById('meansBrush');
	var Eraser=document.getElementById('meansEraser');
	var Paint=document.getElementById('meansPaint');
	var Straw=document.getElementById('meansStraw');
	var Text=document.getElementById('meansText');
	var Magnifier=document.getElementById('meansMagnifier');
	var meansFill=document.getElementById('meansFill');
	var meansStroke=document.getElementById('meansStroke');
	
	// 获取形状工具
	var Line=document.getElementById('shapeLine');
	var Arc=document.getElementById('shapeArc');
	var Poly=document.getElementById('shapePoly');
	var Arcfill=document.getElementById('shapeArcfill');
	var Rectfill=document.getElementById('shapeRectfill');
	var Rect=document.getElementById('shapeRect');
	var snowFlake=document.getElementById('shapeSnow');
	var shapeShan=document.getElementById('shapeShan');
	var shapeQu=document.getElementById('shapeQu');

	// 获取线宽按钮
	var lineWidth_1=document.getElementById("lineWidth1");
	var lineWidth_2=document.getElementById("lineWidth2");
	var lineWidth_3=document.getElementById("lineWidth3");
	var lineWidth_4=document.getElementById("lineWidth4");

	// 获取颜色按钮
	var red=document.getElementById("red");//$("#red");
	var green=document.getElementById("green");//$("#green");
	var blue=document.getElementById("blue");//$("#blue");
	var yellow=document.getElementById("yellow");//$("#yellow");
	var cyan=document.getElementById("cyan");//$("#cyan");
	var pink=document.getElementById("pink");//$("#pink");
	var purple=document.getElementById("purple");//$("#purple");
	var black=document.getElementById("black");//$("#black");
	var white=document.getElementById("white");//$("#white");
	var gray=document.getElementById("gray");//$("#gray");

	//创建颜色数组
	var colors=[red,green,blue,yellow,cyan,pink,purple,black,white,gray];
	// 创建线宽数组
	var widths=[lineWidth_1,lineWidth_2,lineWidth_3,lineWidth_4];
	// 创建操作数组
	var actions=[Brush,Eraser,Paint,Straw,Text,Magnifier,Line,Arc,Poly,
	             Rect,snowFlake,shapeShan,shapeQu,shapeLiu];
	var setfills=[meansFill,meansStroke];

   	// 设置初始值，默认调用画笔工具
   	var isFill=false;
   	var flag=0;	
   	var deg=Math.PI/180;
   	var lineWidthSelect =document.getElementById("lineWidthSelect");//选择线宽下拉菜单
   	lineWidthSelect.value = 3;
    lineWidthSelect.addEventListener("change", test(lineWidthSelect), false);

    var colorSelect=document.getElementById("colorSelect");//选择颜色
    colorSelect.value ="#000" ;
    colorSelect.addEventListener("change", test1(colorSelect), false);

	drawBrush(0);
	drawStroke(1);
	//setlineWidth(0);	
	//setColor(red,0);



	//P634,绘制雪花函数
	function snowflake(c,n,x,y,len){
		//alert("snowFlake");
		c.save();
		c.translate(x,y);
		c.beginPath();
		c.moveTo(0,0);
		leg(n);
		c.rotate(-120*deg);
		leg(n);
		c.rotate(-120*deg);
		leg(n);
		c.closePath();
		c.restore();
		function leg(n){
			c.save();
			if(n==0){
				c.lineTo(len,0);
			}else{
				c.scale(1/3,1/3);
				leg(n-1);
				c.rotate(60*deg);
				leg(n-1);
				c.rotate(-120*deg);
				leg(n-1);
				c.rotate(60*deg);
				leg(n-1);	
			}
			c.restore();
			c.translate(len,0);
		}
	}
	// 状态设置函数
	function setStatus(Arr,num,type){
		for (var i = 0; i < Arr.length; i++) {
			if(i==num){
				if (type==1) {//1改背景色，2改边框
					Arr[i].style.background="#E2DD1E";
				}else{
					Arr[i].css({border:"1px solid #fff"});
				}
			}else{//未选中
				if (type==1) {
					Arr[i].style.background="#AADEF2";
				}else{
					Arr[i].css({border:"1px solid #000"});
				}				
			}
		}
	}
	// 设置线宽函数
	function setlineWidth(num){
		setStatus(widths,num,1);
		 switch(num){
			case 0:
		 		cxt.lineWidth=1;
		 		break;
			case 1:
				cxt.lineWidth=3;
				break;
			case 2:
				cxt.lineWidth=5;
				break;
			case 3:
				cxt.lineWidth=8;
				break;
			default:
				cxt.lineWidth=1;
				break;
		}
	}
	// 设置图像功能函数保存图像
	function saveimg(){
// 		var imgdata=canvas.toDataURL();
// 		var b64=imgdata.substring(22);
// 		// alert(imgdata);
// 		//将隐藏表单赋值
// 		var data=document.getElementById('data');
// 		data.value=b64;
// 		// 将表单提交到后台
// 		var form=document.getElementById('myform');
// 		form.submit();
		var imgDataUrl=canvas.toDataURL();
		var aLink = document.createElement("a");
		    aLink.download = '';// 设置下载的文件名，默认是'下载'
		    aLink.href = imgDataUrl;
		    document.body.appendChild(aLink);
		    aLink.click();
		    aLink.remove(); // 下载之后把创建的元素删除
	}
	function clearimg(){//清空画布
		cxt.clearRect(0,0,880,430);
	}
	// 列出所有的按钮所对应的函数
	function drawBrush(num){//画笔
		setStatus(actions,num,1);
		//Brush.css({background:"yellow"})
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			var startX=evt.pageX-this.offsetLeft;
			var startY=evt.pageY-this.offsetTop;
			//alert(startX+","+startY);
			//cxt.scale(2,2);
			cxt.beginPath();
			cxt.moveTo(startX,startY);
			flag=1;
		}
		canvas.onmousemove=function(){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			if (flag==1) {
				cxt.lineTo(endX,endY);
				cxt.stroke();
			}
		}
		// 结束绘图路径
		canvas.onmouseup=function(){
			flag=0;
		}
		canvas.onmouseout=function(){
			flag=0;
		}
	}
	function drawEraser(num){//橡皮擦
		var flag=0;
		setStatus(actions,num,1);
		canvas.onmousedown=function(evt){
			flag=1;
			var startX=evt.pageX-this.offsetLeft;
			var startY=evt.pageY-this.offsetTop;
			cxt.clearRect(startX-cxt.lineWidth/2,startY-cxt.lineWidth/2,cxt.lineWidth,cxt.lineWidth);
			
		}
		canvas.onmousemove=function(){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			if (flag==1){
				cxt.clearRect(endX-cxt.lineWidth/2,endY-cxt.lineWidth/2,cxt.lineWidth,cxt.lineWidth);
			}
		}
		// 结束绘图路径
		canvas.onmouseup=function(){
			flag=0;
		}
		canvas.onmouseout=function(){
			flag=0
		}
	}
	function drawPaint(num){//油漆桶
		setStatus(actions,num,1);
		canvas.onmousedown=function(evt){
			cxt.fillRect(0,0,880,430);
		}
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;
	}
	function drawStraw(num){//吸管函数
		setStatus(actions,num,1);
		canvas.onmousedown=function(evt){
			var startX=evt.pageX-this.offsetLeft;
			var startY=evt.pageY-this.offsetTop;
			//获取该点处的颜色信息
			var obj=cxt.getImageData(startX,startY,1,1);
			var color='rgb('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';
			cxt.strokeStyle=color;
			cxt.fillStyle=color;
			 drawBrush(0);
		}
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;
	}
	function drawText(num){//文字
		setStatus(actions,num,1);
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标点击的位置
			var startX=evt.pageX-this.offsetLeft;
			var startY=evt.pageY-this.offsetTop;
			// 获取用户输入的信息
			var val=window.prompt('请输入文字','默认文字');
			// 将用户的信息写到画板上
			if(val!=null){
				cxt.fillText(val,startX,startY);
			}
			
		}
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;
	}
	function drawMagnifier(num){//放大镜
		setStatus(actions,num,1);
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取用户输入数据
			var val=window.prompt('请输入放大百分比','100');
			// 把数据转成相应的画布大小
			var scaleW=880*val/100;
			var scaleH=430*val/100;
			// 将数据设置到对应的标签上
			canvas.style.width=parseInt(scaleW)+'px';
			canvas.style.height=parseInt(scaleH)+'px';
			drawBrush(0);
		}
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;

	}
	function drawFill(num){
		setStatus(setfills,num,1);
		isFill=true;
		cxt.fill();
	}
	function drawStroke(num){
		setStatus(setfills,num,1);
		isFill=false;
		cxt.stroke();
	}
	// 线形状函数
	function drawLine(num){
		setStatus(actions,num,1);
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			var startX=evt.pageX-this.offsetLeft;
			var startY=evt.pageY-this.offsetTop;
			// if (flag==0){
				cxt.beginPath();
				cxt.moveTo(startX,startY);
			// 	flag=!flag;
			// }
		}
		canvas.onmousemove=null;
		// 结束绘图路径
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			// if (flag==1) {
				cxt.lineTo(endX,endY);
				cxt.closePath();
				cxt.stroke();
				// flag=!flag;
			// }
		}
		canvas.onmouseout=null;
	}
	function drawArc(num){//画圆
		setStatus(actions,num,1);
		var startX;
		var startY;
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;
			
		}
		// 结束绘图路径
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			//算出两点之间的距离
			var r=Math.sqrt((endX-startX)*(endX-startX)+(endY-startY)*(endY-startY));
			cxt.beginPath();
			cxt.arc(startX,startY,r,0,360,false);
			cxt.closePath();
			//cxt.stroke();
			if(isFill){
				cxt.fill();
			}else{
				cxt.stroke();
			}
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	function drawPoly(num){
		setStatus(actions,num,1);
		var startX;
		var startY;
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;			
		}
		// 结束绘图路径
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			//算出两点之间的距离
			
			cxt.beginPath();
			cxt.moveTo(startX,startY);
			cxt.lineTo(endX,endY);
			var X2=2*startX-endX;
			var Y2=endY;
			
			cxt.lineTo(X2,Y2);
			cxt.lineTo(startX,startY);
			cxt.closePath();
			//cxt.stroke();
			if(isFill){
				cxt.fill();
			}else{
				cxt.stroke();
			}
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	function drawArcfill(num){
		setStatus(actions,num,1);
		var startX;
		var startY;
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;
			
		}
		// 结束绘图路径
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			//算出两点之间的距离
			var r=Math.sqrt((endX-startX)*(endX-startX)+(endY-startY)*(endY-startY));
			cxt.beginPath();
			cxt.arc(startX,startY,r,0,360,false);

			cxt.closePath();
			cxt.fill();
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	function drawRectfill(num){
		setStatus(actions,num,1);
		var startX;
		var startY;
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;
			
		}
		// 结束绘图路径
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			//算出两点之间的距离
			var w=endX-startX;
			var h=endY-startY;
			cxt.beginPath();
			cxt.rect(startX,startY,w,h);

			cxt.closePath();
			cxt.fill();
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	function drawRect(num){
		setStatus(actions,num,1);
		var startX;
		var startY;
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;
			
		}
		// 结束绘图路径
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			//算出两点之间的距离
			var w=endX-startX;
			var h=endY-startY;
			cxt.beginPath();
			cxt.rect(startX,startY,w,h);
			cxt.closePath();
			//cxt.stroke();
			if(isFill){
				cxt.fill();
			}else{
				cxt.stroke();
			}
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	function drawSnowFun(num){//绘制雪花
		setStatus(actions,num,1);
		var startX;
		var startY;
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;
			
		}	
		
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			var r=Math.sqrt((endX-startX)*(endX-startX)+(endY-startY)*(endY-startY));
			snowflake(cxt,3,startX,startY,r);
			if(isFill){
				cxt.fill();
			}else{
				cxt.stroke();
			}
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	function rads(x){
		return Math.PI*x/180;
	}
	function drawShan(num){//绘制扇形
		setStatus(actions,num,1);
		var startX;
		var startY;
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;
			cxt.beginPath();
			cxt.moveTo(startX,startY);
			
		}	
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			var r=Math.sqrt((endX-startX)*(endX-startX)+(endY-startY)*(endY-startY));
			var h=endY-startY; 

			cxt.arc(startX,startY,r,rads(-135),rads(-45),false);
			cxt.lineTo(startX,startY);
			if(isFill){
				cxt.fill();
			}else{
				cxt.stroke();
			}
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	function drawQu(num){//绘制曲线
		setStatus(actions,num,1);
		var startX;
		var startY;
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;
			cxt.beginPath();
			cxt.moveTo(startX,startY);			
		}
		canvas.onmousemove=null;
		// 结束绘图路径
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
				cxt.quadraticCurveTo(endX,endY,startX+100,startY);
				cxt.fillRect(endX+15,endY-15,3,3);
				cxt.closePath();
				if(isFill){
					cxt.fill();
				}else{
					cxt.stroke();
				}
		}
		canvas.onmouseout=null;
	}
	function drawWu(num){//绘制五角星
		setStatus(actions,num,1);
		var startX;
		var startY;
		var a=2*Math.PI/360;
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;
			cxt.beginPath();
						
		}
		canvas.onmousemove=null;
		// 结束绘图路径
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			var r=Math.sqrt((endX-startX)*(endX-startX)+(endY-startY)*(endY-startY));
			var x=(endX+startX)/2;
			var y=(endY+startY)/2; 
				cxt.save();
				cxt.translate(x,y);
				cxt.moveTo(0,0);
				
				cxt.lineTo(r*Math.sin(a*18),-r*Math.cos(a*18));
				cxt.lineTo(2*r*Math.sin(a*18),0);
				for(var i=0;i<4;i++){
				//cxt.save();
					cxt.translate(2*r*Math.sin(a*18),0);
					cxt.rotate(72*a);

				
				cxt.moveTo(0,0);
				cxt.lineTo(r*Math.sin(a*18),-r*Math.cos(a*18));
				cxt.lineTo(2*r*Math.sin(a*18),0);}
				cxt.restore();
					
				// cxt.closePath();
				if(isFill){
					cxt.fill();
				}else{
					cxt.stroke();
				}
		}
		canvas.onmouseout=null;
	}
	function drawLiu(num){//绘制六边形
		setStatus(actions,num,1);
		var startX;
		var startY;
		var n;
		n = prompt("请输入多边形的边数", "");
		if(n<3){
			n =prompt("请输入大于等于3的数值", "");
		}
		canvas.onmousedown=function(evt){
			// 获取当前鼠标相对于canvas起始点（0.0）的坐标
			// 整合鼠标事件
			evt=window.event||evt;
			// 获取鼠标相对于页面顶端的距离  alert(evt.pageX+","+evt.pageY);
			// 获取当前对象（标签）相对于页面顶端的距离  alert(this.offsetLeft+","+this.offsetTop);
			startX=evt.pageX-this.offsetLeft;
			startY=evt.pageY-this.offsetTop;
			cxt.beginPath();
		}	
		canvas.onmouseup=function(evt){
			evt=window.event||evt;
			var endX=evt.pageX-this.offsetLeft;
			var endY=evt.pageY-this.offsetTop;
			var x=(endX+startX)/2;
			var y=(endY+startY)/2; 
			var r=Math.sqrt((endX-startX)*(endX-startX)+(endY-startY)*(endY-startY));
			polygon(cxt,n,x,y,r);
			if(isFill){
				cxt.fill();
			}else{
				cxt.stroke();
			}
		}
		canvas.onmouseout=null;
		canvas.onmousemove=null;
	}
	function polygon(c,n,x,y,r,angle,counterclockwise){
		angle=angle||0;
		counterclockwise=counterclockwise||false;
		c.moveTo(x+r*Math.sin(angle),y-r*Math.cos(angle));
		var delta=2*Math.PI/n;
		for(var i=1;i<n;i++){
			angle+=counterclockwise?-delta:delta;
			c.lineTo(x+r*Math.sin(angle),y-r*Math.cos(angle));
		}
		c.closePath();
	}
	function setWidth(num){//设置线宽
		setlineWidth(widths,num,1);
	}
	function setColor(obj,num){
		setStatus(colors,num,2);
		cxt.strokeStyle=obj.id;
		cxt.fillStyle=obj.id;
	}

	function test(obj){
		cxt.lineWidth=obj.value;
	}
	function test1(obj){
			cxt.fillStyle=obj.value;
			drawFill(0);
	}
	function test2(obj){
			cxt.strokeStyle=obj.value;
			drawStroke(1);
	}
