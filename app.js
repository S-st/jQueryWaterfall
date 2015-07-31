$(document).ready(function() {    //文档加载是否成功
	$(window).on("load",function(){  //监听window加载load事件
		imglocation();		//调用函数
		var dataImg = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};	//模拟网络获取图片数据 --json字符串
		window.onscroll = function(){ 	//监听鼠标滚动事件
			if(scrollside()){ 	//满足条件，加载图片
				$.each(dataImg.data,function(index,value){ 	//遍历数据进行加载，两个参数位置（index）和具体数值（value）
					var box = $("<div>").addClass("box").appendTo($("#container")); 	//动态创建div和img。<div class="box"></div>加载入container容器
					var content = $("<div>").addClass("content").appendTo(box); 	//<div class="content"></div>加载入box容器
					// console.log("./img/"+$(value).attr("src")); 	//打印要加载的图片对象
					$("<img>").attr("src","./img/"+$(value).attr("src")).appendTo(content); 	//加载img。获取图片对象加载入content
				});
				imglocation(); 	//使新加入的标签遵循函数设定的图片加载方式
			}
		};
	});
});

function scrollside(){ 	//最后一张图片显示一半时加载下一排图片
	var box = $(".box"); 	//获取盒子对象
	var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2); 	//获取整体高度（top到bottom）
	var documentHeight= $(document).width(); 	//获取当前容器高度
	var scrollHeight = $(window).scrollTop(); 	//获取鼠标滚动高度
	return (lastboxHeight<scrollHeight+documentHeight)?true:false; 	//整体高度<（鼠标滚动高度+当前容器高度）则允许滚动（true），否则不允许滚动（false）。
}


function imglocation(){  	//确定图片加载位置函数
	var box = $(".box"); 	//获取盒子对象
	var boxwidth = box.eq(0).width();	//获取盒子宽度
	var num = Math.floor($(window).width()/boxwidth);	//获取一排能放置照片个数：设备宽度/盒子宽度（取整）
	var boxArr = [];	//承载所有储存列中盒子的高度
	box.each(function(index,value){		//循环确定盒子摆放位置，index为确定放置位置，value为确定当前元素对象
		// console.log(index+"--"+value); 	//打印index和value
		var boxHeight = box.eq(index).height(); 	//获取盒子高度
		if(index<num){ 	//获取每张图片的高度放在数组当中
			boxArr[index]= boxHeight;
			// console.log(boxHeight); 	//打印盒子高度
		}else{ 	//设置图片摆放
			var minboxHeight = Math.min.apply(null,boxArr); 	//获取盒子中最小的高度
			// console.log(minboxHeight); 	//打印最小盒子的高度
			var minboxIndex = $.inArray(minboxHeight,boxArr); 	//获取最小盒子高度的位置
			// console.log(minboxIndex); 	//打印最小盒子位置
			// console.log(value); 	//打印value（各个div）
			$(value).css({ 	//获取对象进行样式更改
				"position" :"absolute", 	//绝对定位
				"top":minboxHeight, 	//顶端距离
				"left":box.eq(minboxIndex).position().left 	//距左边位置（找当前排最小盒子高度的位置）
			});
			boxArr[minboxIndex]+=box.eq(index).height(); 	//放置完毕重新计算高度
		}
	});
}