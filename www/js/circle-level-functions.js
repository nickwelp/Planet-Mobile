document.addEventListener('touchmove', function (e) {
                                      e.preventDefault();
                                      }, false);                         
document.addEventListener('mouseup', function(e) {var select = window.getSelection(); select.removeAllRanges(); });
document.addEventListener('keyup', function(e) {var select = window.getSelection(); select.removeAllRanges(); });

function f(a){
	return document.getElementById(a);
}
function getCookie (c_name){
	var i,x,y;
	var GameCookies = new Array();
	GameCookies = document.cookie.split(";");
	for (i=0;i<GameCookies.length;i++){
		x=GameCookies[i].substr(0,GameCookies[i].indexOf("="));
 		y=GameCookies[i].substr(GameCookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		   	return unescape(y);
	}
}
function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
     
var CircleLevel = {
	TimerRun : 20, //20 seconds of play    
	Score : parseInt(getCookie("score")),
	MarbleScore : parseInt(getCookie("marbles")),
	FoxHealth : parseInt(getCookie("health")),
	EffectsVolume :(parseFloat(getCookie("EffectVol"))>0.01) ? parseFloat(getCookie("EffectVol")) : 0.5,
	MusicVolume : (parseFloat(getCookie("MusicVol"))>0.01) ? parseFloat(getCookie("MusicVol")) : 0.5,
	WhatSong  : (parseInt(getCookie("WhatSong"))>0) ?	parseInt(getCookie("WhatSong")) : 1, 
	TimeOfSong : (parseFloat(getCookie("TimeOfSong"))>0.01) ? parseFloat(getCookie("TimeOfSong")) : 0.0,
	WhatSong : (parseInt(getCookie("WhatSong"))>0) ? parseInt(getCookie("WhatSong")) : 1,
	Velocity : (parseInt(getCookie("rotationSpeed"))>0) ? parseInt(getCookie("rotationSpeed")) : 1,
	
    ext : (new Audio().canPlayType("audio/ogg; codecs=vorbis"))? "ogg" : "mp3",	//ogg's for firefox  
	SetEffectVolume:function(x){
		CircleLevel.EffectsVolume = x;
		this.setCookie("EffectVol",x,365);
	},
	SetMusicVolume:function(x){
		f('audioTag').volume = x;
		setCookie("MusicVol",x,365);
	},
	song:null,

	SongType:null,
	StartMusic:function(){
		var SongName;
		if(this.WhatSong==7)  this.WhatSong = 1;
		else if(this.WhatSong==1)  SongName = "twisted";
		else if(this.WhatSong==2)  SongName="The-Night";
		else if(this.WhatSong==3)  SongName="Radio";	
		else if(this.WhatSong==4)  SongName="Summertime";
		else if(this.WhatSong==5)  SongName="superhero";	
		else if(this.WhatSong==6)  SongName="stuck";	
		else {this.WhatSong=1; SongName = "twisted";} 
		if(this.SongType!=null){
			if(this.SongType == "Sad"){
				SongName = "Joanna";
				}
			}
		
		var FileName = "audio/" + SongName +"."+ this.ext;	
		
		this.song = f('audioTag');
		this.song.src = FileName; // buffers automatically when created
		if(this.MusicVolume==null)	this.MusicVolume=0.50;
		this.song.volume = this.MusicVolume;
    },
	IsMusicOver:function(){
			if(f('audioTag').paused){ 
				this.WhatSong++;
				this.StartMusic();
				f('audioTag').volume = this.MusicVolume;
				setTimeout(function(){f('audioTag').play()},500);
			}
	},
	BellSoundC : 0,	
	BellSound:function(){
		this.BellSoundC++;
		var soundCall = "bell" + this.BellSoundC +"."+ this.ext;
		soundCall = "audio/" + soundCall;
		if(this.BellSoundC==9) this.BellSoundC=0;
		return soundCall;
	},
	rotationSpeed : (getCookie("rotationSpeed")==null)? 0 : parseInt(getCookie("rotationSpeed")),
	TheScore : (getCookie("score")==null)? 0 : parseInt(getCookie("score")),
	MarbleScore : (getCookie("marbles")==null)? 0 : parseInt(getCookie("marbles")),	
	FoxHealth : (getCookie("health")==null)? 0 : parseInt(getCookie("health")),
	setData:function(){
		var exdays = 365;
		setCookie("score",this.TheScore,exdays);
		setCookie("marbles",this.MarbleScore,exdays);
		setCookie("health",this.FoxHealth,exdays);
		setCookie("rotationSpeed",this.Velocity,exdays);
		setCookie("WhatSong",this.WhatSong,exdays);
		setCookie("EffectVol",this.EffectsVolume,exdays);
		setCookie("MusicVol",this.MusicVolume, exdays); 
		setCookie("TimeOfSong",Math.floor(f('audioTag').currentTime),exdays);
	},
	
	
	IntervalID:null,
 	numberOfMovingWords:null,
	thePots :[],
 	thePotsIndex:0,
 	counterLN:null,
 	CompassPoint:null,
 	WordToReplace:null,
 	MarbleCounter : 36,
    start : new Date().getTime(),  
	elapsed : '0.0',
    HideTheChosenDivs:function(a){},
	scoreRedMarble:function(n){
		this.MarbleScore++;
    	var snd = new Audio(this.BellSound()); // buffers automatically when created
		snd.volume=this.EffectsVolume;
    	snd.play();
    	f('MarbleScore').innerHTML = this.MarbleScore; 
    	this.TheScore = this.TheScore + 30;
    	f('score').innerHTML = this.TheScore; 
    	var fg = 'AlongForRide' + n;
    	var fi = 'Image' + n;
    	f(fg).style.display="none";
    	if(this.MarbleScore%36==0&&this.MarbleScore>5){
        	for(var i=0;i<=35;i++){
            	fg = 'AlongForRide' + i;    
                f(fg).style.display="block";
             }
             this.SetSpeed(1);
        }
    },
	LoadNewSuggestWords:function(Indx, a){},
	debug:function(str) {
    	this.NewWords[this.counterLN]=str;
    	this.counterLN++;
	},
    StipulateIndex:function(cp, wtr){
        this.CompassPoint = cp;
        this.WordToReplace = wtr;
	},
	GoRight:function(){
        this.IntervalID = setInterval(function(){
	    	CircleLevel.MovingX(1);
	    	}, 1);
	},
	FiredOnce:false,
    StartLeftSpin:function(){
	    this.StartMusic();
		function queueMusic() {
    	    	if(!CircleLevel.FiredOnce){
					try{ 
						window.console && console.log("[CL] Firing Current Time Setter");
						//oh firefox how I love thy bugs https://bugzilla.mozilla.org/show_bug.cgi?id=842500
    	    			f('audioTag').currentTime = CircleLevel.TimeOfSong;        
    	    			CircleLevel.FiredOnce = true;
					}catch(e){}
				}else{
					window.console && console.log("[CL] Firing else Statement");
					CircleLevel.TimeOfSong = 0;
					f('audioTag').removeEventListener("canplay",	queueMusic, true);
					window.console && console.log("[CL] Removed Event Listener");
				}
		}	
		f('audioTag').addEventListener("canplay", queueMusic,true);
		f('audioTag').play();

	    
	    
	    
	    
	    
	    f('MarbleScore').innerHTML = this.MarbleScore; 
		f('score').innerHTML = this.TheScore; 
	    window.console && console.log("[CL] Start Left Spin ENGAGED");
        this.IntervalID = setInterval(function(){CircleLevel.MovingX(-1);}, 40);
        return true;
	},
	WhatPosition:function(CurrentValue, Difference){
        var Butcher = CurrentValue + Difference;
        if(Butcher<360 && Butcher>0)
            return Butcher;	  
        else if(Butcher>360){
            Butcher=Butcher-360;
            return Butcher;
        }
        else if(Butcher<0){
            Butcher=Butcher+360;
            return Butcher;
        }	  
    },
    NumberOfObjects : 36,    
    Sine : [],
    Cose : [],
    PiConvert : [],
    Degrees : [],
    WidthOfImage : [],
    XPlace : [],
    YPlace : [],
    d : [],
    MovingDiv : [],
    Opac : [],
    Constant1 : 10, //360/ number of objects
    WindowWidth : f('content').offsetWidth - 70,
    WindowHeight : f('content').offsetHeight * 1,
    http_request : false,
    ColorCounter:1,
    eImage : [],
    setPreValues : function(){
    	for(var l=0;l<=360;l++){
    	    this.PiConvert[l] = l * ( Math.PI/180);
    	    this.Sine[l] = Math.sin(this.PiConvert[l]);
    	    this.Cose[l] = Math.cos(this.PiConvert[l]);
    	    this.WidthOfImage[l] = ((Math.round(50 + (this.Cose[l]*25)) * 100)/100) + "px";//spinning objects width
    	    this.XPlace[l] = 20 + (Math.round((this.Sine[l] * ((this.WindowWidth/2)) + ((this.WindowWidth/2)))));
    	    this.YPlace[l] = (Math.round((this.Sine[l] * (this.WindowHeight/2)+(this.WindowHeight/2)))) + 20;
    	    this.d[l] = f("AlongForRide" + l);
    	    this.eImage[l] = f("Image" + l);
    	}
    return true;	
	},
	initPreValues : null,
	LevelOver : false,
	w : 0,
    wy : 0,
	SetSpeed:function(Change){
		this.Velocity=this.Velocity + Change;
	},
	SetMedusa:function(){
		return true;
		},
	MovingY:function(DirectionV){
		if(this.wy<0) this.wy=this.wy+359;	
        this.wy=this.wy + this.Velocity*DirectionV;
        for(var counter=0;counter<=(this.NumberOfObjects-1);counter++){
            this.d[counter].style.top = (this.YPlace[this.WhatPosition(this.wy, (counter*this.Constant1))])  + "px"; 
            this.d[counter].style.width = this.WidthOfImage[this.WhatPosition(this.wy, (counter*this.Constant1))];
            this.d[counter].style.zIndex = 2.000001 - (this.Cose[this.WhatPosition(this.wy, counter*this.Constant1)]);
            this.Opac[counter] = this.Cose[this.WhatPosition(this.wy, counter*this.Constant1)];
            if(this.Opac[counter]>1)
               this.Opac[counter]=1;
        }
        if(Math.abs(this.wy)>359) this.wy = this.wy - 359;
        return true;
	},
    CountSpeed : 0,
	testEndRun : 0,
	setTimer:function(){
    	var time = new Date().getTime() - this.start;  
        this.elapsed = Math.round(Math.floor(time / 100) / 10);  
		try{if(f('timer'))	f('timer').innerHTML = this.elapsed; }
		catch(e){}
        if(this.elapsed>this.TimerRun){
	    	if(this.testEndRun==0){
	        	this.testEndRun++;
	        	this.LevelOver = this.callEndOfLevel();
			}
			this.StopMoving();
    	}
	},

	callEndOfLevel:function(){
		try{CircleLevel.TimeOfSong = Math.floor(f('audioTag').currentTime);
			f('audioTag').pause();
		}
		catch(e){}
		f('endScreen').style.display="block";
		this.setData();
		f("scoreTT").innerHTML = this.TheScore;
		f("marblesTT").innerHTML = this.MarbleScore;
		var s = window.location.href;
  		s = s.split("/");
  		s = s[s.length-1].replace("level-0","");
  		s = s.replace(".html","");
  		s = parseInt(s);
  		s++;
  		s = (s < 10) ? ("0" + s) : s;
  		var u = "story-0"+s+".html";
		f("nextLevel").innerHTML = "<a href='" + u + "'>Next </a>";
		this.scoreRedMarble = null;
		return true;
	},
	
	MovingX:function(DirectionV){
		if(this.CountSpeed>10){
    		this.CountSpeed = 0;
            this.SetSpeed(1);		
		}
		this.setTimer();
		if(this.w<0)	this.w=this.w+359;	
        this.w=this.w + this.Velocity*DirectionV;
        var Ztracker;
		for(var counter=0;counter<=(this.NumberOfObjects-1);counter++){
        	this.d[counter].style.left = this.XPlace[this.WhatPosition(this.w, (counter*this.Constant1))]; 
        	this.eImage[counter].style.width = this.WidthOfImage[this.WhatPosition(this.w, (counter*this.Constant1))];
        	//window.console && console.log("[PF] counter: "+ counter);
        	
        	Ztracker = Math.round(2 - this.Cose[this.WhatPosition(this.w, (counter*this.Constant1))]);
        	switch(Ztracker)
        	{
        	    case(Ztracker = 1) : 
        	    	this.d[counter].style.zIndex = 3;
        	    	break;
        	    case(Ztracker = 3) : 
        	    	this.d[counter].style.zIndex = 1;
        	    	break;
        	    default : 
        	    	this.d[counter].style.zIndex = 2;
        	    	break;
        	}
        	if (this.WhatPosition(this.w, counter*this.Constant1) > 70 && this.WhatPosition(this.w, counter*this.Constant1) < 140)
        	    this.d[counter].style.zIndex = counter * -1;
        	this.Opac[counter] = 1.4 + this.Cose[this.WhatPosition(this.w, counter*this.Constant1)];
        	if(Math.abs(this.Velocity)>358) this.Velocity=0;
        	if(this.Opac[counter]>1) this.Opac[counter]=1;
        }
        if(Math.abs(this.w)>359) this.w = this.w - 359;
        return true;
	},
	StopMoving:function(){
                clearInterval(this.IntervalID);
	},
	setXAxis : false,
	setYAxis : false,
	setMarquee : false,
	StartTheGame : false
};

CircleLevel.initPreValues = CircleLevel.setPreValues();
CircleLevel.setXAxis = CircleLevel.MovingX(-1);
CircleLevel.setYAxis = CircleLevel.MovingY(-1);
CircleLevel.setMarquee = CircleLevel.SetMedusa();
CircleLevel.StartTheGame = CircleLevel.StartLeftSpin();
             

