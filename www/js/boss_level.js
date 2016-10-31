
function f(a) { return document.getElementById(a); }

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//prevent selections while playing
document.addEventListener('mouseup', function(e) {var select = window.getSelection(); select.removeAllRanges(); });
document.addEventListener('keyup', function(e) {var select = window.getSelection(); select.removeAllRanges(); });


function getCookie(cname){
    var i,x,y;
    var QuickCookies= new Array();
    QuickCookies = document.cookie.split(";");
    for (i=0;i<QuickCookies.length;i++){
      x=QuickCookies[i].substr(0,QuickCookies[i].indexOf("="));
      y=QuickCookies[i].substr(QuickCookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==cname){
        return unescape(y);
      }
  }
}

function setCookie(cname,value,expiredays){
    var expiredate=new Date();
    expiredate.setDate(expiredate.getDate() + expiredays);
    var cvalue=escape(value) + ((expiredays==null) ? "" : "; expires="+expiredate.toUTCString());
    document.cookie=cname + "=" + cvalue;
}

    



var boss_level = boss_level||{};

boss_level.init = function(){
    f('page_body').setAttribute("onkeypress", "boss_level.ProcessKeyStroke(event)");
    f('page_body').setAttribute("onkeyup", "boss_level.clearCommand();");
    f('start').setAttribute("onclick", "boss_level.GoLeft();");
    boss_level.boss_hit_points = 101;
    boss_level.Score = parseInt(getCookie("score"));
    boss_level.ext = (new Audio().canPlayType("audio/ogg; codecs=vorbis"))?".ogg":".mp3";
    boss_level.MarbleScore = parseInt(getCookie("marbles"));
    boss_level.FoxHealth = (parseInt(getCookie("health"))>0) ? parseInt(getCookie("health")):100;
    boss_level.EffectsVolume = (parseFloat(getCookie("EffectVol"))>0.01) ? parseFloat(getCookie("EffectVol")) : 0.5;
    boss_level.MusicVolume = (parseFloat(getCookie("MusicVol"))>0.01) ? parseFloat(getCookie("MusicVol")) : 0.5;
    boss_level.WhatSong  = (parseInt(getCookie("WhatSong"))>0) ?   parseInt(getCookie("WhatSong")) : 1;
    boss_level.TimeOfSong = (parseFloat(getCookie("TimeOfSong"))>0.01) ? parseFloat(getCookie("TimeOfSong")) : 0.0;
    boss_level.SongType = null;
    boss_level.song = null;
    boss_level.boss_can_be_hurt = false;
    f('boss-health').style.width = boss_level.boss_hit_points;
    f('health').style.width = boss_level.FoxHealth;
    f('score').innerHTML = boss_level.Score;
    f('marble').innerHTML = boss_level.MarbleScore;
    boss_level.LastKeyPress = "";   
    boss_level.di = new Date();
    boss_level.timeAtStart = null;
    boss_level.cyc = 0;
    boss_level.list_of_arms = new Array("AlongForRide0", "AlongForRide1", "AlongForRide2", "AlongForRide3", "AlongForRide4", "AlongForRide5", "AlongForRide6", "AlongForRide7", "AlongForRide8", "AlongForRide9", "AlongForRide10", "AlongForRide11", "AlongForRide12", "AlongForRide13", "AlongForRide14", "AlongForRide15", "AlongForRide16", "AlongForRide17"); 
    boss_level.deltaTouch =0;
    boss_level.CountSpeed=1;
    boss_level.IntervalID = null;
    boss_level.w = 0; 
    boss_level.max_height_animation = 0;
    boss_level.wy = 0;
    boss_level.spin_velocity = 0;
    boss_level.g = 0;
    boss_level.hh = 10000;
    boss_level.intx = 0;
    boss_level.animation_height_constant = 260;
    boss_level.animation_return_id = null;
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
    boss_level.tentacle_z_index_mod = 0;
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
    boss_level.LastKeyPress = "aaaaa";
    boss_level.spin_velocity--;
    boss_level.IntervalID = setInterval(function(){
        boss_level.MovingX(boss_level.spin_velocity);
    }, 15);
};

boss_level.GoLeft = function(){
    boss_level.timeAtStart = boss_level.di.getTime();
    boss_level.StartMusic();
    f('start').style.display="none";
    boss_level.LevelUp();
};
            
boss_level.DisplayEnd = function(X){
    clearInterval(boss_level.IntervalID);
    //boss_level.song.stop();
    //boss_level.song.release();
    boss_level.TimeOfSong = Math.floor(f('audioTag').currentTime);
    f('audioTag').pause();
    f('endScreen').style.display="block";
    f("scoreTT").innerHTML = boss_level.Score;
    f("marblesTT").innerHTML = boss_level.MarbleScore;
    f("nextLevel").innerHTML = "<a href='story-028.html'> Next </a>";
    boss_level.setData();
    f('endScreen').style.display = "block";
    //window.location.reload();             
};

boss_level.WhatPosition = function(CurrentValue, Difference){ return ((CurrentValue + Difference)%360); };

boss_level.launchArm = function(y){

	boss_level.flailingArm[y] =   Math.ceil(((boss_level.FoxX - f('fox').offsetWidth/2)- (boss_level.WindowWidth - 0))/95); //Math.ceil(( boss_level.FoxX - boss_level.WindowWidth + (Math.ceil(boss_level.WindowWidth*0.01) ) )/50);
	boss_level.flailArmAwake[y] = 1; 
	setTimeout(function(){f("NewRide" + y).style.display="block";},25);
}; 
boss_level.animate_return = function(){
    boss_level.animation_return_id = setInterval(function(){
        for(var x=0;x<boss_level.NumberOfObjects;x++){
            if(boss_level.max_height_animation==0) boss_level.d[x].style.display = "block";
            var width_in_spin = boss_level.SizeOfFont[boss_level.WhatPosition(boss_level.w, (x*boss_level.Constant1))];
            if(typeof width_in_spin == "string") width_in_spin = width_in_spin.replace("px","");
            var nominal_height = Math.ceil( ( ((width_in_spin*1.37)/boss_level.animation_height_constant) * (boss_level.animation_height_constant-boss_level.max_height_animation) ));
            var string = "calc(50% + " + nominal_height + "px)";    
            boss_level.d[x].style.top = string;
            boss_level.eImage[x].style.maxHeight=boss_level.max_height_animation;// restarts cycle
        }
        boss_level.max_height_animation += Math.floor(boss_level.animation_height_constant/130);
        if(boss_level.max_height_animation>boss_level.animation_height_constant){
            for(x=0;x<boss_level.NumberOfObjects;x++){
                boss_level.eImage[x].style.maxHeight="1000";
                boss_level.d[x].style.top = "50%";
            }
            boss_level.max_height_animation=0;
            clearInterval(boss_level.animation_return_id);
            boss_level.cyc = 0;
            boss_level.boss_can_be_hurt = false;
        }
    },15);
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
        if(counter==0) boss_level.IsMusicOver();
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
            f("NewRide" + counter).style.zIndex=5 + (110- boss_level.flailArmTurn[counter]);

		    boss_level.flailArmTurn[counter] =  boss_level.flailArmTurn[counter] - boss_level.armFlySpeed;
		    var wider = (Math.floor(boss_level.WindowWidth * 0.12)) - boss_level.flailArmTurn[counter]; //0.12 estimated width of fox vs screen ... foxwidth/screenwidth
		    var hurtFox = 1;
		    if(boss_level.flailArmTurn[counter]<0){
			    boss_level.flailArmX[counter] = boss_level.WindowWidth-0;
			    boss_level.flailArmAwake[counter] = 0;
				f("NewRide" + counter).style.display="none";	        	
                var finished_flag = true;
				if(counter==1){
                    for(var r = 0;r<boss_level.flailArmTurn[counter].length;r++){
		               if(boss_level.flailArmTurn[r]>=0) finished_flag = false;
                    }
                    if(finished_flag) {
                        boss_level.boss_can_be_hurt = true;
                        setTimeout(function(){boss_level.animate_return();}, 1500);    
                    }
				}
			    boss_level.flailArmTurn[counter] = 110;		               
			    f("NewRide" + counter).style.zIndex=4;

			}
			if(boss_level.flailArmTurn[counter]==15){
			    f("NewRide" + counter).style.zIndex="600";
				if(boss_level.FoxX+f('fox').offsetWidth<boss_level.flailArmX[counter]) hurtFox = 0;						   
				else if(boss_level.FoxX>boss_level.flailArmX[counter]+f('NewRide'+counter).offsetWidth) hurtFox = 0;
			    if(hurtFox==1){
                    boss_level.FoxHealth -= 5;
                    f('health').style.width = boss_level.FoxHealth;
                    boss_level.hurt_red_haze();
                    boss_level.HurtFoxSound();
                } 
			    else {
                    window.console && console.log("[Planet Fox] avoided arm...");
                }
			}
			f("Img"+counter).style.width=55+wider;	        			            	

	    }
	} //end var counter
    if(Math.abs(boss_level.w)>359){
        boss_level.w=boss_level.w % 359;
        boss_level.cyc++;
    }
}; //end MovingX
 
boss_level.hurt_boss = function(){
    window.console && console.log("[Planet Fox] Boss was clicked");
    if(boss_level.boss_can_be_hurt){
        boss_level.boss_can_be_hurt = false;
        boss_level.boss_hit_points -= 5;
        f('boss-img').src = 'images/boss-hurt-animated.gif';
        f('boss-health').style.width = boss_level.boss_hit_points;
        setTimeout(function(){
            f('boss-img').src = 'images/boss.gif';
        }, 1500);
        if(boss_level.boss_hit_points%20==1){
            boss_level.LevelUp();
        }
        if(boss_level.boss_hit_points<0){
            boss_level.DisplayEnd("boss defeated!");
        }    
    }
}    

boss_level.setData = function(){
    var expiredays = 365;   
    setCookie("health",boss_level.FoxHealth,expiredays);
    setCookie("rotationSpeed",boss_level.rotationSpeed,expiredays);
    setCookie("EffectVol",boss_level.EffectsVolume,expiredays);
    setCookie("MusicVol",boss_level.MusicVolume,expiredays);
    setCookie("WhatSong",boss_level.WhatSong,expiredays);
    setCookie("TimeOfSong",Math.floor(f('audioTag').currentTime),expiredays);
};
    
boss_level.hurt_red_haze = function(){
    f('blastScreen').style.display = "block";
    var i = setTimeout(function(){
        f('blastScreen').style.display = "none";
    }, 100);

};

function onTouchStart(event) { boss_level.deltaTouch = event.touches[0].clientX - 71; }
function onTouchMove(event) { boss_level.deltaTouch = event.touches[0].clientX - 71; } 
function onTouchEnd(event) { boss_level.deltaTouch = 0; }



boss_level.queueMusic = function() {
    if(!boss_level.FiredOnce){
        try{ 
            window.console && console.log("[PF] Firing Current Time Setter");
            //oh firefox how I love thy bugs https://bugzilla.mozilla.org/show_bug.cgi?id=842500
            f('audioTag').currentTime = boss_level.TimeOfSong;        
            boss_level.FiredOnce = true;
        }catch(e){}
    }else{
        window.console && console.log("[PF] Firing else Statement");
        boss_level.TimeOfSong = 0;
        f('audioTag').removeEventListener("canplay", boss_level.queueMusic, true);
        window.console && console.log("[PF] Removed Event Listener");
    }
} 


f('audioTag').addEventListener("canplay", boss_level.queueMusic,true);
f('audioTag').play();   

boss_level.SetEffectVolume = function(){
    boss_level.EffectsVolume = parseFloat(f('EffVol').value);
    setCookie("EffectVol",x,365);
};
boss_level.SetMusicVolume = function(){
    var x = parseFloat(f('musVol').value);
    f('audioTag').volume = x;
    setCookie("MusicVol",x,365);
};

boss_level.StartMusic = function(){  
    var SongName;
    if(boss_level.WhatSong==7) boss_level.WhatSong = 1;
    if(boss_level.WhatSong==1) SongName="twisted";        
    if(boss_level.WhatSong==2) SongName="The-Night";
    if(boss_level.WhatSong==3) SongName="Radio";
    if(boss_level.WhatSong==4) SongName="Summertime";
    if(boss_level.WhatSong==5) SongName="superhero";  
    if(boss_level.WhatSong==6) SongName="stuck";
    
    if(boss_level.SongType && boss_level.SongType!=null && boss_level.SongType == "Sad") SongName = "Joanna";
        
    var FileName = "audio/"+ SongName +  boss_level.ext;  
    
    boss_level.song = f('audioTag');
    boss_level.song.src = FileName; // buffers automatically when created
    if(boss_level.MusicVolume==null){
        boss_level.MusicVolume=0.6;
        }
    boss_level.song.volume = parseFloat(boss_level.MusicVolume);
    
};
boss_level.IsMusicOver = function(){
    if(f('audioTag').paused){ 
        boss_level.WhatSong++;
        boss_level.StartMusic();
        f('audioTag').volume = boss_level.MusicVolume;
        setTimeout(function(){f('audioTag').play()},500);
        }
};

boss_level.HurtFoxSound = function(){
    var file = "audio/bop"+boss_level.ext;
    var painSound = new Audio(file);
    painSound.volume = boss_level.EffectsVolume;
    painSound.play();
};




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
    f('health').style.height = Math.round((boss_level.ScreenHeight/boss_level.six4constant)*(10/50));
    f('health').style.left = Math.round((boss_level.ScreenWidth/boss_level.nine6constant)*(20/50));
    f('health').style.height = Math.round((boss_level.ScreenHeight/boss_level.six4constant)*(10/50));
    f('health').style.top = Math.round((boss_level.ScreenHeight/boss_level.six4constant)*(10/50));

    f('boss-health').style.height = Math.round((boss_level.ScreenHeight/boss_level.six4constant)*(10/50));
    f('boss-health').style.left = Math.round((boss_level.ScreenWidth/boss_level.nine6constant)*(20/50));
    f('boss-health').style.height = Math.round((boss_level.ScreenHeight/boss_level.six4constant)*(10/50));
    f('boss-health').style.top = Math.round((boss_level.ScreenHeight/boss_level.six4constant)*(10/50)) + 20;
    
    f('score').style.left = Math.round((boss_level.ScreenWidth/boss_level.nine6constant)*(300/50));
    f('score').style.top = Math.round((boss_level.ScreenHeight/boss_level.six4constant)*(10/50));
    
    var fontS = Math.round((boss_level.ScreenHeight/boss_level.six4constant)*(12/50)) + "px";
    f('score').style.fontSize = fontS;
    f('marble').style.left =  Math.round((boss_level.ScreenWidth/boss_level.nine6constant)*(400/50));
    f('marble').style.top =  Math.round((boss_level.ScreenHeight/boss_level.six4constant)*(10/50));
    f('marble').style.fontSize = fontS;
    f('boss-img').setAttribute("onclick", "boss_level.hurt_boss();");

};

boss_level.last_load();
