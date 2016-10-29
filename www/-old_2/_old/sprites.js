
for(r=0;r<Sprites.length;r++){    //this part takes our level's input and generates the x,y, and z coords of objects in thw world
hold = Sprites[r];
hold.id = hold.type + "-" + r;
hold.die = 1;
hold.death = 0;
hold.flag=0;
if(hold.type=="bird"){
hold.src="images/birdie.gif";
hold.width=50;
hold.height=50;
BirdSizeVariance = 35 + Math.floor((Math.random()*30));

hold.width= BirdSizeVariance;
hold.height=BirdSizeVariance;
hold.y = 0;

}else if(hold.type=="turtle"){
hold.src="images/turlte.gif";
hold.width=162;
hold.height=93;
hold.y = -8;

}else if(hold.type=="no-star"){
hold.src="images/stars-none.gif";
StarSizeVariance = 50 + Math.floor((Math.random()*100));

hold.width= StarSizeVariance
hold.height=StarSizeVariance;
hold.y = 0;

}

else if(hold.type=="cthulu"){
hold.src="images/cthulu.gif";
hold.width=73;
hold.height=100;
hold.y = 10;
}
else if(hold.type=="snow"){
hold.src="images/snowglobe.gif";
hold.width=20;
hold.height=20;
hold.y = 0;
}else if(hold.type=="ishtar"){
hold.src="images/you-win.gif";
hold.width=300;
hold.height=200;
hold.y = 0;
}else if(hold.type=="thanks"){
hold.src="images/thanks.gif";
hold.width=300;
hold.height=200;
hold.y = 00;
}else if(hold.type=="code"){
hold.src="images/code.gif";
hold.width=300;
hold.height=200;
hold.y = 00;
}
else if(hold.type=="sunorb"){
hold.src="images/sunorb.gif";
hold.width=50;
hold.height=50;
hold.y = 5;
}
else if(hold.type=="rock"){
hold.src="images/rock.gif";
hold.width=100;
hold.height=84;
hold.y = 5;
}else if(hold.type=="redmarble"){
hold.src="images/red-marble.gif";
hold.width=50;
hold.height=50;
hold.y = 10;
}else if(hold.type=="bluemarble"){
hold.src="images/blue-marble.gif";
hold.width=50;
hold.height=50;
hold.y = 10;
}else if(hold.type=="castle"){
hold.src="images/castle.gif";
hold.width=600;
hold.height=00;
hold.y=0;
}else if(hold.type=="welcome"){
hold.src="images/welcome.gif";
hold.width=507;
hold.height=123;
hold.y = 0;

}else if(hold.type=="left"){
hold.src="images/goleft.gif";
hold.width=425;
hold.height=141;
hold.y = 0;

}else if(hold.type=="right"){
hold.src="images/goright.gif";
hold.width=425;
hold.height=141;
hold.y = 0;

}else if(hold.type=="forward"){
hold.src="images/goforward.gif";
hold.width=425;
hold.height=141;
hold.y = 0;

}else if(hold.type=="zap"){
hold.src="images/zapthisbird.gif";
hold.width=425;
hold.height=141;
hold.y = 00;

}else if(hold.type=="getem"){
hold.src="images/gitem.gif";
hold.width=369;
hold.height=190;
hold.y = 00;

}
else if(hold.type=="shark"){
hold.src="images/shark-forward.gif";
hold.width=100;
hold.height=100;
hold.y = -8;
}
else if(hold.type=="tornado"){
hold.src="images/tornado.gif";
hold.width=200;
hold.height=320;
hold.y = -10;
}
else if(hold.type=="lightening"){
hold.src="images/storm-cloud.gif";
hold.width=200;
hold.height=300;
hold.y = -10;
}
else if(hold.type=="seaweed"){
hold.src="images/seaweed.gif";
hold.width=200;
hold.height=77;
hold.y = -21;
}
else if(hold.type=="widerock"){
hold.src="images/wide-rock.gif";
hold.width=200;
hold.height=100;
hold.y = 0;
}


else if(hold.type=="flyingfish"){
hold.src="images/flying-fish-forward.gif";
hold.width=100;
hold.height=100;
hold.y = 5;
}


else if(hold.type=="bluewave"){
    hold.src="images/wave.gif";
    hold.width=100;
    hold.height=40;
    hold.y = -25;
}



}// tags each object with height, img src 

