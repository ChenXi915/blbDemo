//DOM元素加载成功之后触发
window.onload = function (){
	//开始按钮
	var startBtn = document.getElementById("start");
	//获取开始菜单
	var menu = document.getElementById("menu");
	//获取时间条
	var countDown = document.getElementById("countDown");
	var countDownWidth = countDown.offsetWidth;
	//得分
	var scoring = document.getElementById("scoring");
	var scores = 0;
	//创建倒计时计时器
	var countDownTimer;
	//获取游戏结束
	var gameOver = document.getElementById("gameOver");
	//创建灰太狼的定时器
	var creatWolfTimer;
	//存储九个洞口的位置
	var arrPosi = [
		{
			top: "115px",
			left: "100px"
		},
		{
			top: "160px",
			left: "20px"
		},
		{
			top: "221px",
			left: "18px"
		},
		{
			top: "294px",
			left: "32px"
		},
		{
			top: "274px",
			left: "121px"
		},
		{
			top: "296px",
			left: "209px"
		},
		{
			top: "212px",
			left: "201px"
		},
		{
			top: "142px",
			left: "189px"
		},
		{
			top: "192px",
			left: "105px"
		}
	];
	//存储上一次随机洞口所在的数组下标
	var preIndex = -3;
	
	//---------------------------------
	//倒计时函数
	function countDownFnu(){
		countDownTimer = setInterval(function (){
			countDownWidth --;
			//剩余时间为零时，清除定时器
			if (countDownWidth == 0) {
				clearInterval(countDownTimer);
				//显示游戏结束
				gameOver.style.display = "block";
				//清除创建灰太狼或者小灰灰的定时器
				clearInterval(createWolfTimer);
			}
			countDown.style.width = countDownWidth + "px";
		},50);
	}
	//创建随机数字
	function random(m,n){
		return Math.floor(Math.random() * (n - m + 1 ) + m);
	}
	
	//开始按钮的点击事件
	startBtn.onclick = function (){
		//1、开始菜单隐藏
		menu.style.display = "none";
		//2、处理倒计时
		countDownFnu();
		//3、处理创建灰太狼或者小灰灰的操作
		creatWolfTimer = setInterval(function (){
			var wolf = document.createElement("img");
			//随机小灰灰还是灰太狼---'h'灰太狼--'x'小灰灰
			wolf.type = random(1,100) > 80 ? "x" : "h";
			//设置狼出现时，此时的图片位置（第一张h0或者x0）
			wolf.index = 0;
			//设置图片路径  "img/h5.png"
			wolf.src = "img/" + wolf.type + wolf.index + ".png";
			//随机狼出现的位置
			var r = random(0, arrPosi.length - 1);
			//防止连续两次不能在相同位置
			while (r == preIndex){
				r = random(0, arrPosi.length - 1);
			}
			
			//插入节点到父级wolfs中
			wolf.style.left = arrPosi[r].left;
			wolf.style.top = arrPosi[r].top;
			wolfs.appendChild(wolf);
			//记录上一次的下标
			preIndex = r;
			//狼上升的定时器
			wolf.upTime = setInterval(function(){
				wolf.index++;
				if (wolf.index > 4) {
					//清除狼上升定时器
					clearInterval(wolf.upTimer);
					//启动狼下降的定时器
					wolf.downFn();
				}
				wolf.src = "img/" + wolf.type + wolf.index + ".png";
			},150);
			//狼下降的函数
			wolf.downFn = function (){
				//狼下降的定时器
				wolf.downTimer = setInterval(function (){
					wolf.index--;
					if (wolf.index == 0) {
						//清除狼下降的定时器
						clearInterval(wolf.downTimer);
						//移除狼的节点
						wolfs.removeChild(wolf);
					}
					wolf.src = "img/" + wolf.type + wolf.index + ".png";
				},150);
			}
			//记录该狼节点是否是第一次击打
			wolf.clickBol = true;
			//添加点击事件
			wolf.onclick = function(){
				if (this.clickBol == false) {
					return;
				}
				//每次点击之后，修改状态
				this.clickBol = false;
				//清除狼下降定时器
				clearInterval(wolf.downTimer);
				//清除狼上升的定时器
				clearInterval(wolf.upTime);
				//处理得分还是失分
				if (this.type == "h") {
					scores += 10;
					scoring.innerHTML = scores;
				} else{
					scores -= 10;
					scoring.innerHTML = scores;
				}
				//击打后，修改为被击打动画
				this.index = 5;
				//记录点击的wolf节点的狼对象
				var _this = this;
				//击打后的狼动画
				this.clickTimer = setInterval(function(){
					_this.index++;
					if (_this.index == 9) {
						clearInterval(_this.clickTimer);
						wolfs.removeChild(_this);
					}
					_this.src = "img/" + _this.type + _this.index + ".png";
				},150);
				
			}
		},1000);
		
		
	}
	
	
	
}
