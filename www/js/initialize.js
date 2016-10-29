document.addEventListener('touchmove', function (e) {
	e.preventDefault();
	}, false);
document.addEventListener('mouseup', function(e) {var select = window.getSelection(); select.removeAllRanges(); });
document.addEventListener('keyup', function(e) {var select = window.getSelection(); select.removeAllRanges(); });

function f(name){   //Simplify getElementById because it is used so much; faster than jQuery library
	return document.getElementById(name);
}

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


var PlanetFox = {
	ext : (new Audio().canPlayType("audio/ogg; codecs=vorbis"))?".ogg":".mp3",
	rotationSpeedC:getCookie("rotationSpeed"),
	Score : parseInt(getCookie("score")),
	MarbleScore : parseInt(getCookie("marbles")),
	FoxHealth : (parseInt(getCookie("health"))>0) ? parseInt(getCookie("health")):100,
	EffectsVolume :(parseFloat(getCookie("EffectVol"))>0.01) ? parseFloat(getCookie("EffectVol")) : 0.5,
	MusicVolume : (parseFloat(getCookie("MusicVol"))>0.01) ? parseFloat(getCookie("MusicVol")) : 0.5,
	WhatSong  : (parseInt(getCookie("WhatSong"))>0) ?	parseInt(getCookie("WhatSong")) : 1, 
	TimeOfSong : (parseFloat(getCookie("TimeOfSong"))>0.01) ? parseFloat(getCookie("TimeOfSong")) : 0.0,
	setData:function(){
		var expiredays = 365;	
		setCookie("health",PlanetFox.FoxHealth,expiredays);
		setCookie("rotationSpeed",PlanetFox.rotationSpeed,expiredays);
		setCookie("EffectVol",PlanetFox.EffectsVolume,expiredays);
		setCookie("MusicVol",PlanetFox.MusicVolume,expiredays);
		setCookie("WhatSong",PlanetFox.WhatSong,expiredays);
		var ff = Math.floor(f('audioTag').currentTime);
		setCookie("TimeOfSong",ff,expiredays);
	},
	

	



//Instantiate the constants the world of Planet Fox runs on

FoxMove : 2,
FiredOnce : false,
ScreenWidth : window.innerWidth || e.clientWidth || g.clientWidth,    
ScreenHeight : window.innerHeight || e.clientHeight|| g.clientHeight,
nine6constant : 9.6, //9.6 480/50
six4constant : 6.4,//   320/50
FoxX : Math.round((this.ScreenWidth/this.nine6constant)*2.5),   //Intial X value of the fox's sprite
FoxY : Math.round((this.ScreenHeight/this.six4constant)*(190/50)),  //initial Y value of fox//170 was original constant
FoxZ : 3000,  //Z is Fox's depth in the world. As we simulate moving forward, we increase the value of Z
NormX : 0, 
FoxHealth: 0,
MarbleScore: 0,
Score: 0,
Sounds : 0, 
secondElement:null,
deltaTouch : 0,
intialTouch : 0,
foxFlag : 0,
goldenHorizon : Math.round((this.ScreenHeight/this.six4constant)*(184/50)),
OneTwentyFiveConstant : Math.round(this.ScreenWidth*(125/480)),
TwoFourtyConstant : Math.round(this.ScreenWidth/2),
speedConstant : 15,//5,
timerTo1000 : 0,
d : new Date(),
blast : 0,
timeAtStart:null,
foxXtranslator : Math.round((this.ScreenWidth/this.nine6constant)*(530/50)), //-80 to 450  -- 530
jumpFox : false,
FoxJumpCounter : 1,
clickit:function(){
	if (this.Sounds==1){
		//Do nothing right now. Trigger a go music in the future.
	}
},
song:null,
alreadyDone:"",
callEndOfLevel:function(lev){
	PlanetFox.TimeOfSong = Math.floor(f('audioTag').currentTime);
	f('audioTag').pause();
	f('endScreen').style.display="block";
	this.setData();
	f("scoreTT").innerHTML = this.Score;
	f("marblesTT").innerHTML = this.MarbleScore;
	f("nextLevel").innerHTML = "<a href='" + lev + "'>Next </a>";
},

LastKeyPress:"",

ProcessKeyStroke:function(e){    //Process Input at anytime, and set the universal variable LastKeyPress
	
	var keynum;
	var keychar;
	var numcheck;
	if(window.event) // IE
		keynum = e.keyCode;
	else if(e.which) // Netscape/Firefox/Opera
		keynum = e.which;
	keychar = String.fromCharCode(keynum)
	this.LastKeyPress = keychar;
},	

Start:function(){ //Start initiates game play; Spine() is the systemic update of world locations
	PlanetFox.Score = parseInt(getCookie("score")),
	PlanetFox.MarbleScore = parseInt(getCookie("marbles"));
	ext = (new Audio().canPlayType("audio/ogg; codecs=vorbis"))?".ogg":".mp3";
	PlanetFox.FoxHealth = (parseInt(getCookie("health"))>0) ? parseInt(getCookie("health")):100;
	PlanetFox.EffectsVolume = (parseFloat(getCookie("EffectVol"))>0.01) ? parseFloat(getCookie("EffectVol")) : 0.5;
	PlanetFox.MusicVolume = (parseFloat(getCookie("MusicVol"))>0.01) ? parseFloat(getCookie("MusicVol")) : 0.5;
	PlanetFox.WhatSong  = (parseInt(getCookie("WhatSong"))>0) ?	parseInt(getCookie("WhatSong")) : 1;
	PlanetFox.TimeOfSong = (parseFloat(getCookie("TimeOfSong"))>0.01) ? parseFloat(getCookie("TimeOfSong")) : 0.0;
	PlanetFox.FoxX = Math.round((PlanetFox.ScreenWidth/PlanetFox.nine6constant)*2.5);
	PlanetFox.FoxY = Math.round((this.ScreenHeight/this.six4constant)*(190/50));
	PlanetFox.FoxZ = 000;
	PlanetFox.OneTwentyFiveConstant = Math.round(this.ScreenWidth*(125/480));
	PlanetFox.TwoFourtyConstant = Math.round(this.ScreenWidth/2);
	PlanetFox.NormX = 0;
	PlanetFox.widthMod = this.ScreenWidth/480;
	PlanetFox.goldenHorizon = Math.round((this.ScreenHeight/this.six4constant)*(184/50));
	PlanetFox.TwoFourtyConstant = Math.round(this.ScreenWidth/2);
	PlanetFox.speedConstant = 15;
	PlanetFox.FoxMove = 2;
	PlanetFox.ScreenWidth = window.innerWidth || e.clientWidth || g.clientWidth;    
	PlanetFox.ScreenHeight = window.innerHeight || e.clientHeight|| g.clientHeight;
	PlanetFox.nine6constant = 9.6; //9.6 480/50
	PlanetFox.six4constant = 6.4;//   320/50
	PlanetFox.secondElement=null;
	PlanetFox.deltaTouch = 0;
	PlanetFox.intialTouch = 0;
	PlanetFox.foxFlag = 0;
	PlanetFox.timerTo1000 = 0;
	PlanetFox.d = new Date();
	PlanetFox.blast = 0;
	PlanetFox.lightening_counter = 0;
	PlanetFox.timeAtStart=null;
	PlanetFox.foxXtranslator = Math.round((this.ScreenWidth/this.nine6constant)*(530/50)); //-80 to 450  -- 530
	PlanetFox.jumpFox = false;
	PlanetFox.FoxJumpCounter = 1;
	f('health').style.width = this.FoxHealth;
	f('fox').style.top = this.FoxY;
	
	this.StartMusic();
	function queueMusic() {
        	if(!PlanetFox.FiredOnce){
				try{ 
					window.console && console.log("[PF] Firing Current Time Setter");
					//oh firefox how I love thy bugs https://bugzilla.mozilla.org/show_bug.cgi?id=842500
        			f('audioTag').currentTime = PlanetFox.TimeOfSong;        
        			PlanetFox.FiredOnce = true;
				}catch(e){}
			}else{
				window.console && console.log("[PF] Firing else Statement");
				PlanetFox.TimeOfSong = 0;
				f('audioTag').removeEventListener("canplay",	queueMusic, true);
				window.console && console.log("[PF] Removed Event Listener");
			}
	}	
	f('audioTag').addEventListener("canplay", queueMusic,true);
	f('audioTag').play();	
	
	this.alreadyDone = false;
	f('start').style.display="none";
	f('joyStick').style.display="block";
	f('health').style.width = PlanetFox.FoxHealth;
	intervalID = setTimeout(function(){PlanetFox.GameTurn();}, this.speedConstant);
	this.Sounds=1;
	this.timeAtStart = this.d.getTime();
},

Sprites : [],
widthMod : this.ScreenWidth/480,
hurtFox:function(){ //Called when Fox's body intersects another entity
    this.FoxHealth = this.FoxHealth - 5;
    f('health').style.width = this.FoxHealth;
    if(PlanetFox.blast==0){PlanetFox.blast = 1;}
    f('blastScreen').style.display = "block";
    this.HurtFoxSound();
    if (this.FoxHealth <= 0){
        clearInterval(intervalID);
        f('audioTag').pause();
        this.setData();
        alert('Planet needs a nap. Game Over');
        setCookie("health",100,365);	
        setTimeout(function(){window.location.reload()},1000);
    }
},
ScorePts:function(d){
    this.Score = this.Score + d;
    f('score').innerHTML = this.Score;
    setCookie("score",this.Score,365);
			
},  
scoreMarble:function(t){
    snd = new Audio(PlanetFox.BellSound()); // buffers automatically when created
	snd.volume=PlanetFox.EffectsVolume;
    snd.play();
    this.killit(t);
    this.MarbleScore++;
    f('marble').innerHTML =PlanetFox.MarbleScore;
    setCookie("marbles",PlanetFox.MarbleScore,365);
    this.ScorePts(10);
    this.FoxHealth = (this.FoxHealth>500?500:this.FoxHealth+5); //heal fox  every marble
},
starit:function(a){
	this.ScorePts(40);	
	fvx = (this.Score/10%5);
	if(fvx==0){ //the animations of the same gif are locked when called at multiple spots in the document. To prevent mechanical rubbish cycle through 6 similar animations
		f(a).src = "images/stars.gif";
	}else if(fvx==1){
	    f(a).src = "images/star-blue.gif";
	}else if(fvx==2){	
	    f(a).src = "images/stars-red.gif";
    }else if(fvx==3){
		f(a).src = "images/star-orbit.gif";
	}else if(fvx==4){
	f(a).src = "images/star-red-orbit.gif";
	}else{
		f(a).src = "images/stars.gif";
	} 
	da = "d"+a;
	f(da).setAttribute('onmouseover', '');	
	f(da).className += " disaled";
	f(da).removeAttribute("onmouseover");
},

/* Sprite Creation */
CreateWorldDefinitions:function(Sprites){
	PlanetFox.widthMod = this.ScreenWidth/480;
	for(r=0;r<Sprites.length;r++){    //this part takes our level's input and generates the x,y, and z coords of objects in thw world
		var sprite = Sprites[r];
		sprite.id = sprite.type + "-" + r;
		sprite.isAlreadyAlive =  false;
		sprite.die = 1;
		sprite.death = 0;
		sprite.flag=0;
		sprite.x = parseInt(sprite.x) + 740;
		sprite.x = sprite.x * this.widthMod;
		sprite.x = Math.round(sprite.x - (740 * this.widthMod));
		if(sprite.type=="bird"){
			sprite.src="images/birdie.gif";
			sprite.width=50;
			sprite.height=50;
			BirdSizeVariance = 35 + Math.floor((Math.random()*30));
			sprite.width = Math.round((this.ScreenWidth/this.nine6constant)*(BirdSizeVariance/50));
			sprite.height = Math.round((this.ScreenHeight/this.six4constant)*(BirdSizeVariance/50));
			sprite.y = 0;
		
		}else if(sprite.type=="turtle"){
			sprite.src="images/turlte.gif";
			sprite.zq = sprite.zq-5;
			sprite.z = sprite.z - 5;
			sprite.width=Math.round((this.ScreenWidth/this.nine6constant)*(162/50));
			sprite.height=Math.round((this.ScreenWidth/this.nine6constant)*(93/50));
			sprite.y = Math.round((this.ScreenHeight/this.six4constant)*(20/50));
		
		}else if(sprite.type=="no-star"){
			sprite.src="images/stars-none.gif";
			StarSizeVariance = 50 + Math.floor((Math.random()*100));
			sprite.width= Math.round((this.ScreenWidth/this.nine6constant)*(StarSizeVariance/50));
			sprite.height=Math.round((this.ScreenHeight/this.six4constant)*(StarSizeVariance/50));
			sprite.y = 0;		
		}
		else if(sprite.type=="cthulu"){
			sprite.src="images/cthulu.gif";
			sprite.width=Math.round((this.ScreenWidth/this.nine6constant)*(73/50));
			sprite.height=Math.round((this.ScreenWidth/this.nine6constant)*(100/50));
			sprite.y = Math.round((this.ScreenHeight/this.six4constant)*(10/50));
			sprite.util = 0 + Math.floor((Math.random()*180));
		}
		else if(sprite.type=="snow"){
			sprite.src="images/snowglobe.gif";
			sprite.width=20;
			sprite.height=20;
			sprite.y = 0;
		}else if(sprite.type=="ishtar"){
			sprite.src="images/you-win.gif";
			sprite.width=300;
			sprite.height=200;
			sprite.y = 0;
		}else if(sprite.type=="thanks"){
			sprite.src="images/thanks.gif";
			sprite.width=300;
			sprite.height=200;
			sprite.y = 00;
		}else if(sprite.type=="code"){
			sprite.src="images/code.gif";
			sprite.width=300;
			sprite.height=200;
			sprite.y = 00;
		}
		else if(sprite.type=="sunorb"){
			sprite.src="images/sunorb.gif";
			sprite.width=Math.round(this.ScreenWidth/this.nine6constant);
			sprite.height=Math.round(this.ScreenHeight/this.six4constant);
			sprite.y = Math.round((this.ScreenHeight/this.six4constant)*(5/50));
		}
		else if(sprite.type=="rock"){
			sprite.src="images/rock.gif";
			sprite.width=Math.round((this.ScreenWidth/this.nine6constant)*(100/50));
			sprite.height=Math.round((this.ScreenHeight/this.six4constant)*(84/50));
			sprite.y = Math.round((this.ScreenHeight/this.six4constant)*(5/50));
		}else if(sprite.type=="redmarble"){
			sprite.src="images/red-marble.gif";
			sprite.width=Math.round(this.ScreenWidth/this.nine6constant);
			sprite.height=Math.round(this.ScreenHeight/this.six4constant);
			sprite.y = Math.round((this.ScreenHeight/this.six4constant)*(10/50));
		}else if(sprite.type=="bluemarble"){
			sprite.src="images/blue-marble.gif";
			sprite.width=Math.round(this.ScreenWidth/this.nine6constant);
			sprite.height=Math.round(this.ScreenHeight/this.six4constant);
			sprite.y = 10;
		}else if(sprite.type=="castle"){
			sprite.src="images/castle.gif";
			sprite.width=600;
			sprite.height=00;
			sprite.y=0;
		}else if(sprite.type=="welcome"){
			sprite.src="images/welcome.gif";
			sprite.width=507;
			sprite.height=123;
			sprite.y = 0;
		
		}else if(sprite.type=="left"){
			sprite.src="images/goleft.gif";
			sprite.width=425;
			sprite.height=141;
			sprite.y = 0;
		
		}else if(sprite.type=="right"){
			sprite.src="images/goright.gif";
			sprite.width=425;
			sprite.height=141;
			sprite.y = 0;
		
		}else if(sprite.type=="forward"){
			sprite.src="images/goforward.gif";
			sprite.width=425;
			sprite.height=141;
			sprite.y = 0;
		
		}else if(sprite.type=="zap"){
			sprite.src="images/zapthisbird.gif";
			sprite.width=425;
			sprite.height=141;
			sprite.y = 00;
		
		}else if(sprite.type=="getem"){
			sprite.src="images/gitem.gif";
			sprite.width=369;
			sprite.height=190;
			sprite.y = 00;
		
		}
		else if(sprite.type=="shark"){
			sprite.src="images/shark-forward.gif";
			sprite.width=100;
			sprite.height=100;
			sprite.y = 10;
		}
		else if(sprite.type=="tornado"){
			sprite.src="images/tornado.gif";
			sprite.width=200;
			sprite.height=320;
			sprite.y = -10;
		}
		else if(sprite.type=="lightening"){
			sprite.src="images/storm-cloud-large.gif";
			sprite.width=600;
			sprite.height=600;
			sprite.y = -20;
			sprite.util = 0;
			sprite.hurt_flag = false;
			sprite.random_int = Math.floor(Math.random() * (250 - 50)) + 50;
			sprite.random_length = Math.floor(Math.random() * 50) + 50;
		}
		else if(sprite.type=="seaweed"){
			sprite.src="images/seaweed.gif";
			sprite.width=Math.round((this.ScreenWidth/this.nine6constant) * (200/50));
			sprite.height=Math.round((this.ScreenHeight/this.six4constant)*(77/50));
			sprite.y = 10;
		}
		else if(sprite.type=="widerock"){
			sprite.src="images/wide-rock.gif";
			sprite.width=Math.round((this.ScreenWidth/this.nine6constant) * (200/50));
			sprite.height=Math.round((this.ScreenHeight/this.six4constant)* (100/50));
			sprite.y = 0;
		}
		else if(sprite.type=="flyingfish"){
			sprite.src="images/flying-fish-forward.gif";
			sprite.width=Math.round((this.ScreenWidth/this.nine6constant) * (100/50));
			sprite.height=Math.round((this.ScreenHeight/this.six4constant) * (100/50));
			sprite.y = 5;
		}
		else if(sprite.type=="bluewave"){
		    	sprite.src="images/wave.gif";
		    	sprite.width=Math.round((this.ScreenWidth/this.nine6constant) * (100/50));
		    	sprite.height=Math.round((this.ScreenHeight/this.six4constant) * (40/50));
		    	sprite.y = Math.round((this.ScreenHeight/this.six4constant) * (-20/50));
		}
	}
},

/*  Representing Fox */

RepresentFox:function(){
	if(this.FoxMove==2){
		this.FoxZ++;
		this.FoxZ++;
	}
	else if(this.FoxMove==1){
		this.FoxZ++;
		this.FoxMove=0;
	}
	var moveScale = this.deltaTouch + this.deltaTouch;
	moveScale = moveScale/10;
	if(this.LastKeyPress=='a'){
		moveScale = -10;	
	}else if(this.LastKeyPress=='d'){
		moveScale = 10;	
	}else if(this.LastKeyPress=='s'){
		moveScale = 0;	
	}
	
	
    this.FoxX = this.FoxX + moveScale;
    if(this.FoxX< -80 ) this.FoxX = -80; 								/* This sets the maximum limit to Fox's motion to the left */  
    if(this.FoxX > this.ScreenWidth)this.FoxX = this.ScreenWidth;       /* This sets the maximum limit to Fox's motion to the right */
    f('fox').style.left = this.FoxX;
    if(this.jumpFox){
    	if(this.FoxJumpCounter==1)	f('foxavatar').src = 'images/fox-flip.gif';
    	this.FoxJumpCounter++;
    	if(this.FoxJumpCounter < 50)
        	this.FoxY = Math.round((this.ScreenWidth/this.nine6constant)*(170/50)) - Math.round((this.ScreenWidth/this.nine6constant)*(this.FoxJumpCounter/50))*2;
        if(this.FoxJumpCounter>50&&this.FoxJumpCounter<100)
        	this.FoxY = Math.round((this.ScreenWidth/this.nine6constant)*(70/50)) + ((Math.round((this.ScreenWidth/this.nine6constant)*(this.FoxJumpCounter/50))*2)-Math.round((this.ScreenWidth/this.nine6constant)*(100/50)));
        if(this.FoxJumpCounter>100){
        	this.FoxJumpCounter = 0;
        	this.jumpFox = false;
        	f('foxavatar').src = "images/fox.gif"; 
        	//////////this.FoxY = Math.round((this.ScreenWidth/this.nine6constant)*(170/50));
        	this.FoxY = Math.round((this.ScreenHeight/this.six4constant)*(190/50));
        }
        f('fox').style.top = this.FoxY;
    }else{
        if(moveScale<0){
              f('foxavatar').src = "images/fox-left.gif";
              this.foxFlag = 1;
            }else if(moveScale>0){
              f('foxavatar').src = "images/fox-right.gif";
             this.foxFlag = 1;
            }else if(PlanetFox.foxFlag==1&&moveScale==0){
          	  f('foxavatar').src = "images/fox.gif"; 
           	  this.foxFlag = 0;
            }
    }
    f('fox').style.zIndex=PlanetFox.LengthOfCourse-PlanetFox.FoxZ;
}, //draws fox each frame he need it; motion left right & added the jump a while ago



/* Functions that handle scoring and removing sprites from play */
redMarbDeathIndex : 0,
birdieDeathIndex : 0,
turtleDeathIndex : 0,
starfishDeathIndex : 0,

DeathAnimation:function(a){
    h = this.Sprites[a];
    if(h.type=="bird"){
        snd = new Audio(this.BirdSound()); // buffers automatically when created
		snd.volume =this.EffectsVolume;
        snd.play();
        f(h.id).src = "images/birdie-die-"+this.birdieDeathIndex+".gif";
    	if(this.birdieDeathIndex==5)	this.birdieDeathIndex=-1;
        this.birdieDeathIndex++;
        this.ScorePts(20);
        f(h.id).className += " disabled";
        fd = "d"+h.id
        f(fd).removeAttribute('onmouseover');
        return 20;
    }else if(h.type=="turtle"){  
        f(h.id).src = "images/turtle-die-"+this.turtleDeathIndex+".gif";
    	if(this.turtleDeathIndex==5) this.turtleDeathIndex = -1;
	    this.turtleDeathIndex++;
        f(h.id).className += " disabled";
        fd = "d"+h.id;
        f(fd).removeAttribute('ontouchstart');
        f(fd).removeAttribute('onmouseover');
     	this.ScorePts(30);
        return 60;
    }else if(h.type=="starfish"){
        f(h.id).src = "images/starfish-die-"+this.starfishDeathIndex+".gif";
        if(this.starfishDeathIndex==5) this.starfishDeathIndex = -1;
        this.starfishDeathIndex++;
        f(h.id).className += " disabled";
        fd = "d"+h.id;
        f(fd).removeAttribute('ontouchstart');
        f(fd).removeAttribute('onmouseover');
     	ScorePts(30);
        return 60;
    }
    else if(h.type=="cthulu"){
        f(h.id).src = "images/cthulu-die.gif";
        f(h.id).className += " disabled";
        this.ScorePts(30);
        return 50;
    }
    else if(h.type=="redmarble"||h.type=="bluemarble"){
	    f(h.id).src = "images/red-marble-die-"+this.redMarbDeathIndex+".gif";
    	if(this.redMarbDeathIndex==6)  this.redMarbDeathIndex=-1;
	    this.redMarbDeathIndex++;
        f(h.id).className += " disabled";
	    fd = "d"+h.id
        f(fd).removeAttribute('onmouseover');
        f(fd).removeAttribute('ontouchstart');
        return 50;
    }	
    else{
	    return 50;
    }
},

killit:function(a){ //end the sprite's run
    var h = this.Sprites[a];
    var timetodie = this.DeathAnimation(a);
    h.death = this.FoxZ + timetodie;	
},	
kill:function(a){
    var h = this.Sprites[a];
    f("d"+h.id).style.display = "none";
    f(h.id).style.display = "none";
    h.flag = 0;
    
},

/* These functions handle new sprites arriving on the screen */

NewOpponents:function(){ //if our Fox's Z axis brings us close enough to a new world enemy, generate their image
	for(t=0;t<this.Sprites.length;t++){
		var sprite = this.Sprites[t];
		if(sprite.zq - 600 <= this.FoxZ && sprite.isAlreadyAlive!=true){
			sprite.isAlreadyAlive = true;	
			rz = sprite.zq - this.FoxZ;
			rw = 200/rz;
			newO=document.createElement('div');
			newO.setAttribute('id', "d" + sprite.id);
			if(sprite.type=="rock" || sprite.type=="widerock"){
				newO.innerHTML = "<img  class='noselect' id='" + sprite.id + "' src='" + sprite.src + "' style='pointer-events: none;'></div>";
			}else if(sprite.type=="redmarble"){
				newO.setAttribute('ontouchstart', 'PlanetFox.scoreMarble(' + t + ')');			
				newO.setAttribute('onmouseover', 'PlanetFox.scoreMarble(' + t + ')');			
				newO.innerHTML = "<img class='noselect' id='" + sprite.id + "' src='" + sprite.src + "'></div>";
			}else if(sprite.type=="no-star"){
				newO.innerHTML = "<img  class='noselect' id='" + sprite.id + "' src='" + sprite.src + "'></div>";
				newO.setAttribute('ontouchstart', 'javascript:PlanetFox.starit("' + sprite.id  + '")');	
				newO.setAttribute('onmouseover', 'javascript:PlanetFox.starit("' +  sprite.id + '")');	
			}else if(sprite.type=="sunorb" || sprite.type=="cthulu" || sprite.type=="flyingfish"|| sprite.type=="turtle"|| sprite.type=="shark"|| sprite.type=="bluemarble" || sprite.type=="bluewave"){
				newO.innerHTML = "<img  class='noselect' id='" + sprite.id + "' src='" + sprite.src + "'></div>";
			}else if( sprite.type=="seaweed" || sprite.type=="lightening" || sprite.type == "ishtar"){
				newO.innerHTML = "<img  class='noselect' id='" + sprite.id + "' src='" + sprite.src + "'><p id='p" + sprite.id + "'></p></div>";				
			}else{
				newO.setAttribute('ontouchstart', 'javascript:PlanetFox.killit(' + t + ')');	
				newO.setAttribute('onmouseover', 'javascript:PlanetFox.killit(' + t + ')');	
				newO.innerHTML = "<img  class='no select' id='" + sprite.id + "' src='" + sprite.src + "'><p id='p" + sprite.id + "'></p></div>";				
			}
			newO.style.width = Math.round(rw * sprite.width);
			dHeight = rw*sprite.height;
			newO.style.position = "absolute";
			newO.style.left = (this.NormX + this.OneTwentyFiveConstant) + sprite.x*rw;
			var temp= (this.NormX + this.OneTwentyFiveConstant) + sprite.x*rw;
			
			
			if(sprite.type=="bird"){newO.style.top = sprite.y; 
				sprite.util = Math.floor(Math.random()*60);
			}
			else if(sprite.type=="no-star"){ 
				sprite.y = -180 + Math.floor((Math.random()*360));
				newO.style.bottom =  sprite.y;
				}
			else{newO.style.bottom = PlanetFox.goldenHorizon; 
				}
			
			newO.style.zIndex = sprite.zq-701;
			sprite.oh = Math.round(rw * sprite.height);
			sprite.ow = Math.round(rw * sprite.width);
			f('PlayScreen').appendChild(newO);
			sprite.flag = 1;
		}
	}
},


/* sets end of level */
DisplayEnd:function(X){
  clearInterval(intervalID);
  this.setData();
  var s = window.location.href;
  s = s.split("/");
  s = s[s.length-1].replace("level-0","");
  s = s.replace(".html","");
  s = parseInt(s);
  s++;
  s = (s < 10) ? ("0" + s) : s;
  var u = "story-0"+s+".html";
  this.callEndOfLevel(u);
},
       
/* Handles Motion, AI */

moveThing:function(t){ //handles AI
	var HurtX = 0;
	var dW = 0;
	var sprite = this.Sprites[t];
	var Topy, Leftx;
	sprite.z = sprite.zq - this.FoxZ;
	if(sprite.z>30){
		dW = 100/sprite.z;
	}else if(sprite.z==30||sprite.z<30){
		this.kill(t);
		dW=1;	
	}else{
		dW=1;
	}
	f(sprite.id).style.zindex = sprite.z;
	var Width = Math.round(dW * sprite.width);
	var Height = Math.round(dW * sprite.height);
	f(sprite.id).style.width = Width;
	//if(sprite.type=="lightening") f(sprite.id).style.height = Height;
	if(sprite.type=="bird" && sprite.z-60>this.FoxZ)
		sprite.z--;
	if(sprite.type=="bird" && sprite.z-200<this.FoxZ){
		if((sprite.y+Height)<(this.FoxY-50)){

			sprite.y++;
		}
	}
	if(sprite.type=="flyingfish"){
    	sprite.zq--;
	}
	if(sprite.type!="bird"){
		var MidHeight = Height/2;
		f(sprite.id).style.bottom = PlanetFox.goldenHorizon - Height;//once MidHeight
	}
	f("d"+sprite.id).style.zIndex = (this.LengthOfCourse - sprite.zq)+60;
	Leftx =  (this.TwoFourtyConstant +(this.NormX*dW*-1)) + sprite.x*dW - (Width - sprite.ow)/2;	
	if(sprite.type=="nothing"){
		Topy = sprite.y;
		f("d"+ sprite.id).style.top = Topy;	
	}else{
		
		Topy = (sprite.y - (Height - sprite.oh)/2);	
		
		if(sprite.type=="bird"){
			f("d"+ sprite.id).style.top = Topy;
		}else{
			var zscale = Math.round((sprite.z/10) -10);
			var zs = zscale + "%"; //zs looks like tidal wave
			var dws = 49 - Math.round(dW*49);
			var dwsp = dws + "%";
			var d48 = Math.round(48 + (sprite.y*dW));
			var d48p = d48 + "%"; //straight 48 works pretty good, I want to mod it though from the sprite.y var
			if(sprite.type=="bluewave"){
				f("d"+sprite.id).style.top = PlanetFox.goldenHorizon - sprite.y;
			}else{
				f("d"+sprite.id).style.top = PlanetFox.goldenHorizon - MidHeight + sprite.y;          
			}
		}	
	}
	if(sprite.type=="bluewave")
		sprite.zq--;  
	if(sprite.type=="turtle"){
    	if(Leftx < this.FoxX)
        	sprite.x = sprite.x + 2;
    	else if(Leftx > this.FoxX)
    	    sprite.x = sprite.x -2;
	}
	if(sprite.type=="bird"){ //Bird's Horizontal Stuff
	   sprite.util++;
	   if(sprite.zq-150==this.FoxZ){f(sprite.id).src = "images/bird-attack.gif";}
       if(sprite.zq-150<this.FoxZ){
       		sprite.y++;
	        if(Leftx < this.FoxX){
        		sprite.x = sprite.x + 7;
       		}else if(Leftx > this.FoxX){
        		sprite.x = sprite.x -7;
       		}
   		}else{
	       	if(sprite.util<30){
           		sprite.x =  sprite.x+3;
       		}else if(sprite.util<60){
         		sprite.x = sprite.x -3;        
       		}else{
           		sprite.util=0;
           	}
	    }
   }
	if(sprite.type=="cthulu"){
	    sprite.util++;
	    if(sprite.util<90)
		    sprite.x =sprite.x+3;
	 	else if(sprite.util<180)
			sprite.x = sprite.x-3; 	
		else sprite.util=0;
	}
    if(sprite.type=="shark"){
    	sprite.zq++;
    	if(sprite.zq-90<this.FoxZ){ 
    	    //nom nom
    	}else if(sprite.zq-100<this.FoxZ){
    	    f(sprite.id).src = "images/shark-attack.gif";
    	}else if(Leftx < this.FoxX){
    	    sprite.x = sprite.x + 5;
    	    f(sprite.id).src = "images/shark-right.gif";
    	}else if(Leftx > this.FoxX){
    	    sprite.x = sprite.x -5;
    	    f(sprite.id).src = "images/shark-left.gif";
    	}else{
    	    f(sprite.id).src="images/shark-forward.gif";
    	}
	}
	if(sprite.type=="lightening"){
    	sprite.util++;
    	if(sprite.util == sprite.random_int){ 
    	    f(sprite.id).src = "images/storm-cloud-erupting-"+PlanetFox.lightening_counter+".gif";
    	    PlanetFox.lightening_counter++;
    	    PlanetFox.lightening_counter = PlanetFox.lightening_counter%5;	
    	    sprite.hurt_flag = true;
    	}
    	if(sprite.util == sprite.random_int + sprite.random_length) {
    		sprite.hurt_flag = false;
    		sprite.util = 0;
    		f(sprite.id).src = "images/storm-cloud-large.gif";
    	}
    }
    if(sprite.type=="tornado"){
        if(sprite.z<450){
        sprite.zq = this.FoxZ + 450;                    }
        //on a timer, send flying fish and sharks
    }
    if((((this.LengthOfCourse - sprite.zq)+70)>=this.LengthOfCourse-this.FoxZ)&&sprite.type=="bluewave"){
        f("d"+sprite.id).style.zIndex =   (this.LengthOfCourse-this.FoxZ) - 20;   
        if(this.FoxX<Leftx && Leftx<(this.FoxX + 50)){
            PlanetFox.jumpFox = true;
            }
        if(Leftx<this.FoxX && this.FoxX<(Leftx+Width)){
            PlanetFox.jumpFox = true;
            }
        if(this.FoxX>Leftx && (this.FoxX +50)<(Leftx + Width)){
            PlanetFox.jumpFox = true;
            }
        }    
        if(sprite.type=="flyingfish"){
            if((((this.LengthOfCourse - sprite.zq)+60)==this.LengthOfCourse-this.FoxZ ||((this.LengthOfCourse - sprite.zq)+60)==this.LengthOfCourse-this.FoxZ+1 )&&sprite.death==0){
            if(this.FoxX<Leftx && Leftx<(this.FoxX + 50)){
                this.hurtFox();
            }
            if(Leftx<this.FoxX && this.FoxX<(Leftx+Width)){
                this.hurtFox();
                }
            if(this.FoxX>Leftx && (this.FoxX +50)<(Leftx + Width)){
                this.hurtFox();
                }
            }
        }   
            
        if((((this.LengthOfCourse - sprite.zq)+60)==this.LengthOfCourse-this.FoxZ)&&sprite.death==0){
            if(this.FoxX<Leftx && Leftx<(this.FoxX + 50)){
            HurtX = 1;
            } 
            if(Leftx<this.FoxX && this.FoxX<(Leftx+Width)){
                HurtX = 1;
                }
            if(this.FoxX>Leftx && (this.FoxX +50)<(Leftx + Width)){
                HurtX = 1;
                }
            if(HurtX==1){ 
                if(sprite.type == "redmarble" || (sprite.type == "bluemarble" && PlanetFox.jumpFox) )
                	this.scoreMarble(t);
                else if(sprite.type == "seaweed" && PlanetFox.jumpFox){}
                else if((sprite.type=="lightening"&&sprite.hurt_flag==false) || sprite.type =="castle" || sprite.type == "welcome" || sprite.type =="left" || sprite.type =="right" ||sprite.type=="bluewave" ||	sprite.type =="forward" ||	sprite.type =="zap"  || sprite.type =="getem"){
                	
                }
                else if(sprite.type =="castle"|| sprite.type == "welcome" || sprite.type =="left" || sprite.type =="right" ||	sprite.type =="forward" ||	sprite.type =="zap"  || sprite.type =="getem" || sprite.type == "ishtar"){}
                else
                	this.hurtFox();
        	}
			f("errorMonitor").innerHTML = this.MarbleScore;
		}
            f("d"+ sprite.id).style.left = Leftx;
                
      
},         

/* These functions relate to the games timer, the motor that calls the events into action */

GameTurn:function(){ // systemic update sequencer 
    this.NormX = this.FoxX - this.TwoFourtyConstant;
   	kk = new Date();
    this.RepresentFox();//depending on last key press, vary fox's X, Y and Z... if 'w' make Z accelerate
    this.NewOpponents();//see where we are in level, add new enimies in distance
    this.timerTo1000 = kk.getTime();
    var speedRegulator = this.speedConstant;
    timeDif = this.timerTo1000 - this.timeAtStart;
    this.timeAtStart = this.timerTo1000;
    fps = 1000/timeDif;
    fps2 = fps.toFixed(2);
    if (fps2>15){speedRegulator = 15;} /* The real problem with Planet Fox Frames Per Second in the 21st century: it's too fast */
 	
	if(PlanetFox.blast==2){
		f('blastScreen').style.display = "none";
		PlanetFox.blast = 0;
		}
	if(PlanetFox.blast>0){
		PlanetFox.blast++;
		}

   for(zt=0;zt<this.Sprites.length;zt++){
        var sprite = this.Sprites[zt];
        if(sprite.flag==1){
            this.moveThing(zt);
        }
        
        if(sprite.death>0){
            if(sprite.death==this.FoxZ){
                this.kill(zt);
            }
        }  	
        if(this.FoxZ==this.LengthOfCourse){
            this.DisplayEnd(this.FoxZ);
            
        }   
    }
    if(this.FoxZ>=500&&!this.alreadyDone){
        this.alreadyDone = true;
    
    }
    if(this.FoxZ<=this.LengthOfCourse){
      if(this.FoxZ%500==0){this.IsMusicOver();} 
      if(PlanetFox.pause==true){}else{ 
       intervalID = setTimeout(function(){PlanetFox.GameTurn()}, speedRegulator);
    }
    }
},
PauseGame:function(){
	PlanetFox.pause = true;
	f('pause-screen').style.display="block";
	PlanetFox.song.pause();
},
ResumeGame:function(){
	PlanetFox.pause = false;
	f('pause-screen').style.display="none";
	intervalID = setTimeout("PlanetFox.GameTurn()", this.speedConstant);
	PlanetFox.song.play();
},
hidePreLoad:function(){
	f('preload').style.display="none";
},
/* Sounds */
BirdSoundC : 0,
BirdSound:function(){
	this.BirdSoundC++;
	var soundCall = "craw" + this.BirdSoundC + ext;
	soundCall = "audio/" + soundCall;
	if(this.BirdSoundC==6)	this.BirdSoundC=0;
	return soundCall;
},
SetEffectVolume:function(){
	this.EffectsVolume = parseFloat(f('EffVol').value);
	setCookie("EffectVol",x,365);
},
SetMusicVolume:function(){
	var x = parseFloat(f('musVol').value);
	f('audioTag').volume = x;
	setCookie("MusicVol",x,365);
	},
SongType:null,
song:null,
StartMusic:function(){	
	var SongName;
	if(this.WhatSong==7)this.WhatSong = 1;
	if(this.WhatSong==1) SongName="twisted";		
	if(this.WhatSong==2) SongName="The-Night";
	if(this.WhatSong==3) SongName="Radio";
	if(this.WhatSong==4) SongName="Summertime";
	if(this.WhatSong==5) SongName="superhero";	
	if(this.WhatSong==6) SongName="stuck";
	
	if(this.SongType!=null){
		if(this.SongType == "Sad"){
			SongName = "Joanna";
			}
		}
	
	var FileName = "audio/"+ SongName +  this.ext;	
	
	this.song = f('audioTag');
	this.song.src = FileName; // buffers automatically when created
	if(this.MusicVolume==null){
		this.MusicVolume=0.6;
		}
	this.song.volume = parseFloat(this.MusicVolume);
	
},
IsMusicOver:function(){
	if(f('audioTag').paused){ 
		this.WhatSong++;
		this.StartMusic();
		f('audioTag').volume = this.MusicVolume;
		setTimeout(function(){f('audioTag').play()},500);
		}
},	
BellSoundC:0,	
BellSound:function(){
	this.BellSoundC++;
	var soundCall = "bell" + this.BellSoundC +  PlanetFox.ext;
	soundCall = "audio/" + soundCall;
	if(this.BellSoundC==9){PlanetFox.BellSoundC=0;}
	return soundCall;
},
HurtFoxSound:function(){
	var file = "audio/bop"+PlanetFox.ext;
	painSound = new Audio(file);
	painSound.volume = PlanetFox.EffectsVolume;
    painSound.play();
}



};