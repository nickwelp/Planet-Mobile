
function f(a) { return document.getElementById(a); }

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//prevent selections while playing
document.addEventListener('mouseup', function(e) {var select = window.getSelection(); select.removeAllRanges(); });
document.addEventListener('keyup', function(e) {var select = window.getSelection(); select.removeAllRanges(); });

var boss_level = boss_level||{};

boss_level.init = function(){
    f('page_body').setAttribute("onkeypress", "boss_level.ProcessKeyStroke(event)");
    f('page_body').setAttribute("onkeyup", "boss_level.clearCommand();");
    f('start').setAttribute("onclick", "boss_level.GoLeft();");
    boss_level.LastKeyPress = "";   
    boss_level.di = new Date();
    boss_level.timeAtStart = null;
    boss_level.cyc = 0;
    boss_level.list_of_arms = new Array("AlongForRide0", "AlongForRide1", "AlongForRide2", "AlongForRide3", "AlongForRide4", "AlongForRide5", "AlongForRide6", "AlongForRide7", "AlongForRide8", "AlongForRide9", "AlongForRide10", "AlongForRide11", "AlongForRide12", "AlongForRide13", "AlongForRide14", "AlongForRide15", "AlongForRide16", "AlongForRide17"); 
    boss_level.deltaTouch =0;
    boss_level.CountSpeed=1;
    boss_level.IntervalID = null;
    boss_level.w = 0; 
    boss_level.wy = 0;
    boss_level.spin_velocity = 0;
    boss_level.g = 0;
    boss_level.hh = 10000;
    boss_level.intx = 0;
    boss_level.flagHH = 1;
    boss_level.launchFlag = 0;
    boss_level.fkag11 = 1;
    boss_level.armFlySpeed = 1;
    boss_level.NumberOfObjects = 10;//9;//18;    
    boss_level.Sine = new Array();
    boss_level.Cose = new Array();
    boss_level.PiConvert = new Array();
    boss_level.Degrees = new Array();
    boss_level.SizeOfFont = new Array();
    boss_level.XPlace = new Array();
    boss_level.YPlace = new Array();
    boss_level.d = new Array();
    boss_level.Constant1 = 360/boss_level.NumberOfObjects;
    boss_level.WindowWidth = f('PlayScreen').offsetWidth - 70;
    boss_level.WindowHeight = f('PlayScreen').offsetHeight*1;
    boss_level.Velocity = 1;
    boss_level.eImage = new Array();
    boss_level.Opac = new Array();
    boss_level.FoxX = 125;   //Intial X value of the fox's sprite
    boss_level.flailingArm = new Array(); //will contain x-vector of attacking arms
    boss_level.flailArmAwake = new Array();
    boss_level.flailArmTurn = new Array();  
    boss_level.flailArmX = new Array();                    
    for(var counter=0;counter<=360;counter++){
        boss_level.PiConvert[counter] = counter * ( Math.PI/180);
        boss_level.Sine[counter] = Math.sin(boss_level.PiConvert[counter]);
        boss_level.Cose[counter] = Math.cos(boss_level.PiConvert[counter]);
        boss_level.SizeOfFont[counter] = ((Math.round(50 + (boss_level.Cose[counter]*25)) * 100)/100) + "px";//spinning objects width
        boss_level.XPlace[counter] = 20 + (Math.round((boss_level.Sine[counter] * ((boss_level.WindowWidth/2)) + ((boss_level.WindowWidth/2)))));
        boss_level.YPlace[counter] = (Math.round((boss_level.Sine[counter] * (boss_level.WindowHeight/2)+(boss_level.WindowHeight/2)))) + 20;
    }    

    for(var c=0;c<boss_level.NumberOfObjects;c++){ 
        boss_level.flailingArm.push(1);
        boss_level.flailArmAwake.push(0);
        boss_level.flailArmTurn.push(110);
        boss_level.d.push(f("AlongForRide" + c));
        boss_level.flailArmX.push(boss_level.WindowWidth - 0);
        boss_level.eImage.push(f("Images" + c));
    }
    var touchable = 'createTouch' in document;
    if(touchable) {
        f('leftButton').addEventListener( 'touchstart', onTouchStart, false );
        f('leftButton').addEventListener( 'touchmove', onTouchMove, false );
        f('leftButton').addEventListener( 'touchend', onTouchEnd, false );
        f('blastScreen').addEventListener( 'touchstart2', onTouchStart, false);
    }   
};
boss_level.init(); //establish values
 
boss_level.hidePreLoad = function(){};
boss_level.ProcessKeyStroke = function(e){    
    //Process Input at anytime, and set the universal variable LastKeyPres
    var keynum;
    var keychar;
    var numcheck;
    if(window.event) // IE
        keynum = e.keyCode;
    else if(e.which) // Netscape/Firefox/Opera
        keynum = e.which;
    keychar = String.fromCharCode(keynum)
    boss_level.LastKeyPress = keychar;
};

boss_level.clearCommand = function(){
    boss_level.LastKeyPress = "zzzz";
    boss_level.deltaTouch = 0;
};

function onTouchStart2(event){}        
function onTouchStart(event) {
    boss_level.deltaTouch = event.touches[0].clientX - 71;
    //boss_level.deltaTouch = 30;
}
function onTouchMove(event) {
    boss_level.deltaTouch = event.touches[0].clientX - 71; 
    //boss_level.deltaTouch=0;
} 
function onTouchEnd(event) { 
    boss_level.deltaTouch = 0;
}

boss_level.RepresentFox = function(){
    var moveScale = 0;
    moveScale = boss_level.deltaTouch + boss_level.deltaTouch;
    moveScale = moveScale/10;
    if(boss_level.LastKeyPress=="a") moveScale = -10;
    else if(boss_level.LastKeyPress == "d") moveScale = 10;
    boss_level.FoxX = boss_level.FoxX + moveScale;
    if(boss_level.FoxX<-80) boss_level.FoxX = -80;
    if(boss_level.FoxX>boss_level.WindowWidth) boss_level.FoxX = boss_level.WindowWidth;
    f('fox').style.left=boss_level.FoxX;
    if(moveScale<0){
        f('foxavatar').src = "images/fox-left.gif";
        boss_level.foxFlag = 1;
    }else if(moveScale>0){
        f('foxavatar').src = "images/fox-right.gif";
        boss_level.foxFlag = 1;
    }else if(boss_level.foxFlag==1){
        f('foxavatar').src = "images/fox.gif"; 
        boss_level.foxFlag = 0;
    }
    f('fox').style.zIndex=200;
}; //draws fox each frame he need it; motion left right and meta values there of
        

boss_level.LevelUp = function(){
    clearInterval(boss_level.IntervalID);
    boss_level.spin_velocity--;
    boss_level.IntervalID = setInterval(function(){
        boss_level.MovingX(boss_level.spin_velocity);
    }, 15);
};

boss_level.GoLeft = function(){
    boss_level.timeAtStart = boss_level.di.getTime();
    f('start').style.display="none";
    boss_level.LevelUp();
};
            
boss_level.DisplayEnd = function(X){
    clearInterval(boss_level.IntervalID);
    /*  song.stop();
    song.release(); */
    boss_level.setData();
    boss_level.callEndOfLevel("story-029.html");
    //window.location.reload();             
};
boss_level.setData = function(){};
boss_level.callEndOfLevel = function(a){};

boss_level.WhatPosition = function(CurrentValue, Difference){ return ((CurrentValue + Difference)%360); };

boss_level.launchArm = function(y){
	//the arms laucn from 408px to the right, aimed at foxX
	//left: 406 w: 55pxWindo
	boss_level.flailingArm[y] =  Math.ceil(( boss_level.FoxX - boss_level.WindowWidth + (Math.ceil(boss_level.WindowWidth*0.01) ))/50);
	boss_level.flailArmAwake[y] = 1;
	f("NewRide" + y).style.display="block";		
}; 
 
boss_level.MovingX = function(DirectionV){       
   	var timeDef = (new Date()) - boss_level.timeAtStart;
   	if(timeDef>(boss_level.hh*boss_level.flagHH)) boss_level.launchFlag = 1;   				
	if(boss_level.CountSpeed>10){
        boss_level.CountSpeed = 0;
        boss_level.SetSpeed(1);		
    }
    boss_level.RepresentFox();            
    if(boss_level.w<0){
        boss_level.w=boss_level.w+359;
        boss_level.cyc++;	
    }
    boss_level.w=boss_level.w + boss_level.Velocity*DirectionV;           
    for(var counter=0;counter<boss_level.NumberOfObjects;counter++){
        if(boss_level.flailArmAwake[counter]==0){
	        boss_level.d[counter].style.left = boss_level.XPlace[boss_level.WhatPosition(boss_level.w, (counter*boss_level.Constant1))];
            boss_level.eImage[counter].style.width = boss_level.SizeOfFont[boss_level.WhatPosition(boss_level.w, (counter*boss_level.Constant1))];
            boss_level.Ztracker =  Math.round(2 - boss_level.Cose[boss_level.WhatPosition(boss_level.w, counter*boss_level.Constant1)]);
            switch(boss_level.Ztracker){
                case 1:
                    boss_level.d[counter].style.zIndex = 3;
                    break;
                case 3:
                    boss_level.d[counter].style.zIndex = 1;
                    break;
                default:
                    boss_level.d[counter].style.zIndex = 2;
                    break;
            }        
            if (boss_level.WhatPosition(boss_level.w, counter*boss_level.Constant1) > 70 && boss_level.WhatPosition(boss_level.w, counter*boss_level.Constant1) < 140) boss_level.d[counter].style.zIndex = counter * -1;
	                 
	        if(boss_level.cyc==1){
	     	    if (boss_level.WhatPosition(boss_level.w, counter*boss_level.Constant1) > 60 && boss_level.WhatPosition(boss_level.w, counter*boss_level.Constant1) < 80  ){
		    	    if((counter % 2)==0){
		            	boss_level.launchArm(counter);
						boss_level.d[counter].style.display = "none";
		       	   	}                    	
	           }
	        }else if(boss_level.cyc==2){
		        if (boss_level.WhatPosition(boss_level.w, counter*boss_level.Constant1) > 60 && boss_level.WhatPosition(boss_level.w, counter*boss_level.Constant1) < 80 ){
		            if((counter%2)==1){
		       	    	boss_level.launchArm(counter);
						boss_level.d[counter].style.display = "none";
				   	}                    	
	           	}    
		    }else if(boss_level.cyc==4){} 		
            boss_level.Opac[counter] = 1.4 + boss_level.Cose[boss_level.WhatPosition(boss_level.w, counter*boss_level.Constant1)];
            if(Math.abs(boss_level.Velocity)>358) boss_level.Velocity=0;     
            if(boss_level.Opac[counter]>1) boss_level.Opac[counter]=1;
            //d[counter].style.opacity = Opac[counter];      
        }else{
	        boss_level.flailArmX[counter] = boss_level.flailArmX[counter] + boss_level.flailingArm[counter];
	    	f("NewRide" + counter).style.left=boss_level.flailArmX[counter];	        	
		    boss_level.flailArmTurn[counter] =  boss_level.flailArmTurn[counter] - boss_level.armFlySpeed;
		    var wider = (Math.floor(boss_level.WindowWidth * 0.12)) - boss_level.flailArmTurn[counter]; //0.12 estimated width of fox vs screen ... foxwidth/screenwidth
		    var hurtFox = 1;
		    if(boss_level.flailArmTurn[counter]<0){
			    boss_level.flailArmX[counter] = boss_level.WindowWidth-50;
			    boss_level.flailArmAwake[counter] = 0;
				f("NewRide" + counter).style.display="none";	        	
				if(counter==1){
		           for(var x=0;x<boss_level.NumberOfObjects;x++){
			            boss_level.d[x].style.display="block";// restarts cycle
			        }
			        boss_level.cyc = 1;
				}
			    boss_level.flailArmTurn[counter] = 110;		               
			    f("NewRide" + counter).style.zIndex="4";	        	
			}
			if(boss_level.flailArmTurn[counter]==56){
			    f("NewRide" + counter).style.zIndex="600";
				if(boss_level.FoxX+32<boss_level.flailArmX[counter]) hurtFox = 0;						   
				else if(boss_level.FoxX>boss_level.flailArmX[counter]+109) hurtFox = 0;
			    if(hurtFox==1) f('errorMonitor').innerHTML = "hurt";
			    else f('errorMonitor').innerHTML = "not hurt";       	 
			}
			f("Img"+counter).style.width=55+wider;	        			            	
	    }
	} //end var counter
    if(Math.abs(boss_level.w)>359){
        boss_level.w=boss_level.w - 359;
        boss_level.cyc++;
    }
}; //end MovingX
        

function onTouchStart(event) { boss_level.deltaTouch = event.touches[0].clientX - 71; }
function onTouchMove(event) { boss_level.deltaTouch = event.touches[0].clientX - 71; } 
function onTouchEnd(event) { boss_level.deltaTouch = 0; }

boss_level.last_load = function(){   
    boss_level.hidePreLoad();
    boss_level.ScreenWidth = window.innerWidth || e.clientWidth || g.clientWidth;
    boss_level.ScreenHeight = window.innerHeight || e.clientHeight|| g.clientHeight;
    boss_level.nine6constant = 9.6; //9.6 480/50
    boss_level.six4constant = 6.4;//   320/50
    f('leftButton').style.top = Math.round(boss_level.ScreenHeight * 0.85);//"85%";//Math.round((ScreenHeight/six4constant)*(20/50));
    f('leftButton').style.left = Math.round((boss_level.ScreenWidth/boss_level.nine6constant)*(13/50));
    f('leftButton').style.height = Math.round((boss_level.ScreenHeight/boss_level.six4constant)*(30/50));
    f('leftButton').style.width = Math.round((boss_level.ScreenWidth/boss_level.nine6constant)*(130/50));
    f('pause').style.top = "";
    f('pause').style.bottom = '0px';
    f('pause').style.left = Math.round((boss_level.ScreenWidth/boss_level.nine6constant)*(380/50));
};

boss_level.last_load();
