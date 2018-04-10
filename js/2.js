window.onload=function(){
	var selectAll=document.getElementById("selectAll");
	var inputs=document.querySelectorAll(".main input");
	var trs=document.querySelectorAll(".main tr");
	var selected=document.getElementById("selected");
	var selectedNum=0;			//选中的数量
	
	
	//全选功能
	selectAll.onclick=function(){
		/*
		 * 点击后要做的事情
		 * 	1、自己打勾了
		 * 		1、让所有的单选按钮打勾
		 * 		2、每行都加上背景色
		 * 		3、下边已选的数字要变化
		 * 	2、自己没的打勾
		 * 		1、让所有的单选按钮都不打勾
		 * 		2、每行都去掉背景色
		 * 		3、下边已选的数字要变化
		 */
		
		for(var i=0;i<inputs.length;i++){
			/*if(this.checked){
				inputs[i].checked=true;
				trs[i].className='active';
				selectedNum=inputs.length;
				selected.innerHTML='已选（'+selectedNum+'）';
			}else{
				inputs[i].checked=false;
				trs[i].className='';
				selectedNum=0;
				selected.innerHTML='已选（'+selectedNum+'）';
			}*/
			
			inputs[i].checked=this.checked;
			trs[i].className=this.checked?'active':'';
			selectedNum=this.checked?inputs.length:0;
			selected.innerHTML='已选（'+selectedNum+'）';
		}
	};
	
	
	//单选
	for(var i=0;i<inputs.length;i++){
		inputs[i].index=i;
		inputs[i].onclick=function(){
			/*
			 * 点击后要做的事情
			 * 	1、自己打勾了
			 * 		1、对应的tr加上背景色
			 * 		2、下边已选的数字要变化
			 * 		3、判断是否选中了所有的按钮，是的话，让上面的全选按钮选中
			 * 	2、自己没的打勾
			 * 		1、对应的tr去掉背景色
			 * 		2、下边已选的数字要变化
			 * 		3、让上面全选的按钮取消选中
			 */
			
			trs[this.index].className=this.checked?'active':'';
			this.checked?selectedNum++:selectedNum--;
			selected.innerHTML='已选（'+selectedNum+'）';
			selectAll.checked=selectedNum==inputs.length?true:false;
		};
	}
	
	
	//颜色功能
	var colorBtns=document.querySelectorAll(".color a");
	var colorCons=document.querySelectorAll(".color div");
	var bigImgs=document.querySelectorAll("label img");
	
	for(var i=0;i<colorBtns.length;i++){
		colorBtns[i].index=i;
		colorBtns[i].onclick=function(){
			changeColor(this.index);
		};
	}
	
	function changeColor(n){
		//弹出层显示或者隐藏
		var dis=colorCons[n].style.display;
		colorCons[n].style.display=dis=='block'?'none':'block';
		
		//操作弹出层里的功能
		var dt=colorCons[n].querySelector('dt');
		var dds=colorCons[n].querySelectorAll('dd');
		var imgs=colorCons[n].querySelectorAll('img');
		var curImgSrc=imgs[0].src;
		var sureBtn=colorCons[n].querySelector('span');
		
		for(var i=0;i<dds.length;i++){
			dds[i].index=i;
			dds[i].onclick=function(){
				/*
				 * 点击后要做的事情
				 * 	1、选项卡的原理让自己变为选中状态，其实不选中
				 * 	2、图片前面的标题要换
				 * 	3、存一下选中图片的地址
				 */
				for(var i=0;i<dds.length;i++){
					dds[i].className='';
				}
				this.className='active';
				
				dt.innerHTML=imgs[this.index].alt;
				curImgSrc=imgs[this.index].src;
			};
		}
		
		
		//点击确定按钮
		sureBtn.onclick=function(){
			/*
			 * 点击后要做的事情
			 * 	1、隐藏弹出层
			 * 	2、外面的颜色文字要变化
			 * 	3、外面的大图要变化
			 */
			colorCons[n].style.display='none';
			colorBtns[n].innerHTML=dt.innerHTML+'+';
			bigImgs[n].src=curImgSrc;
		};
	}
	
	
	//商品加减功能
	for(var i=0;i<trs.length;i++){
		count(i);
	}
	
	function count(n){
		var spans=trs[n].querySelectorAll('td:nth-of-type(4) span');
		var strong=trs[n].querySelector('td:nth-of-type(4) strong');
		var price=trs[n].querySelector('td:nth-of-type(3)');
		var subTotal=trs[n].querySelector('td:nth-of-type(5)');
		
		var num=0;		//已选商品的数量
		//加的功能
		spans[1].onclick=function(){
			/*
			 * 点击后要做的事情
			 * 	1、商品的数量要累加
			 * 	2、小计的值要累加
			 * 	3、改变下面tfoot标签里的内容
			 */
			
			num++;
			strong.innerHTML=num;
			subTotal.innerHTML=parseFloat(price.innerHTML)*num+'.00元';
			
			sum();
		};
		
		
		//减的功能
		spans[0].onclick=function(){
			num--;
			if(num<0){
				num=0;
			}
			
			strong.innerHTML=num;
			subTotal.innerHTML=parseFloat(price.innerHTML)*num+'.00元';
			
			sum();
		};
	}
	
	//求和功能
	function sum(){
		/*
		 * 这个函数需要做的事情
		 * 	1、算出一共多少钱
		 * 	2、算出最贵的
		 * 
		 */
		
		var td=document.querySelectorAll("tfoot td")[1];
		var expensive=0;		//最贵的价格
		var total=0;			//总价
		
		for(var i=0;i<trs.length;i++){
			var selectNum=trs[i].querySelector('strong').innerHTML;
			var price=trs[i].querySelector('td:nth-of-type(3)').innerHTML;
			var subTotal=trs[i].querySelector('td:nth-of-type(5)').innerHTML;
			
			total+=parseFloat(subTotal);
			
			if(selectNum>0){
				//console.log(expensive,price);
				if(expensive<parseFloat(price)){
					expensive=parseFloat(price);
				}
			}
		}
		
		td.innerHTML='<p>应付总额：<strong>'+total+'.00元</strong></p><p>最贵的商品为：'+expensive+'.00元</p>';
	}
};


/*console.log(0.1+0.2);		//0.30000000000000004
console.log(0.2+0.7);		//0.8999999999999999

var a=12.0987;
console.log(a.toFixed(2));

console.log(10/3);*/