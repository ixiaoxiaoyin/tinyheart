//判断大鱼和果实的距离
function momFruitsCollision()
{
	if(!deta.gameOver)
	{
		for(var i=0;i<fruit.num;i++ )
	{
		if(fruit.alive[i])
		{
			//calculate length
			var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			if(l<900)
			{
				//fruit eaten
				fruit.dead(i);
				deta.fruitNum++;
				mom.momBodyCount++;
				if(mom.momBodyCount>7)
					mom.momBodyCount=7;
				if(fruit.fruitType[i] =="blue")//blue
				{
					deta.double =2;
				}
				wave.born(fruit.x[i],fruit.y[i]);
			}
		}
	}
	}
	
}
//mom baby collision
function momBabyCollision()
{
	if(deta.fruitNum>0&&!deta.gameOver)//吃的果实大于零才能碰撞有效
	{
		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
		if (l<900)
		 {
		 	//baby recover
		 	baby.babyBodyCount = 0;//满血复活
		 	mom.momBodyCount = 0;
		 	//score 
		 	deta.addScore();
		 	//draw halo
		 	halo.born(baby.x,baby.y);
		 }
    }
}
	