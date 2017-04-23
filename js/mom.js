var momObj =function()
{
	this.x;
	this.y;
	this.angle;


	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;//时间间隔，图片需要持续多长时间

	this.momBodyCount =0;
}
momObj.prototype.init = function()
{
	this.x =canWidth * 0.5;
	this.y =canHeight * 0.5;
	this.angle = 0;
}
momObj.prototype.draw = function()
{
	//lerp x,y
	this.x = lerpDistance(mx,this.x,0.98);//aim cur ratio
	this.y = lerpDistance(my,this.y,0.98);//aim cur ratio

	//delta angle;
	//math.atan2(y,x)//api反正切
	var deltaY = my -this.y;
	var deltaX = mx -this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;//-pi,pi

	//lerp angle
	this.angle = lerpAngle(beta,this.angle,0.6); 

	//mom tail count
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50)
	{
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}
	//mom eye
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer > this.momEyeInterval)//当时间计数器大于事件间隔
	{
		this.momEyeCount = (this.momEyeCount + 1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if(this.momEyeCount ==0)//当眯起眼睛时
		{
			this.momEyeInterval = Math.random()*1500+2000;//[2000-3500])]
		}else
		{//眨眼睛的时间
			this.momEyeInterval = 200;
		}
	}
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
	var momBodyCount = this.momBodyCount;
	if(deta.double ==1)//orange
	{
	ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width*0.5, -momBodyOra[momBodyCount].height*0.5);

	}else//blue
	{
	ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	}
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	ctx1.restore();
}