var redMarbDeathIndex = 0;
var birdieDeathIndex = 0;
var turtleDeathIndex = 0;
var starfishDeathIndex = 0;

function DeathAnimation(a){
    hold = Sprites[a];
    if(hold.type=="bird"){
        // cordova.exec("SoundPlug.play", "Roland-GR-1-Trumpet-C5.wav");
        //soundManager.play('craw')
        //  my_media.play();
        new Media('audio/craw.mp3').play();
        // craw.play();
        if(birdieDeathIndex==0){
        	f(hold.id).src = "images/birdie-die.gif";}
    	else if(birdieDeathIndex==1){
	    	f(hold.id).src = "images/birdie-die-1.gif";}
        else if(birdieDeathIndex==2){
        	f(hold.id).src = "images/birdie-die-2.gif";}
	    else if(birdieDeathIndex==3){
        	f(hold.id).src = "images/birdie-die-3.gif";}
        else if(birdieDeathIndex==4){
        	f(hold.id).src = "images/birdie-die-4.gif";}
        else if(birdieDeathIndex==5){
        	f(hold.id).src = "images/birdie-die-5.gif";
	        birdieDeathIndex = -1;
    	}
    	birdieDeathIndex++;
        ScorePts(20);
        f(hold.id).className += " disabled";
        fd = "d"+hold.id
        f(fd).removeAttribute('onmouseover');
     
        return 20;
    }else if(hold.type=="turtle"){
        if(turtleDeathIndex==0){
	    	f(hold.id).src = "images/turtle-die.gif";
    	}
	    if(turtleDeathIndex==1){
			f(hold.id).src = "images/turtle-die-1.gif";
    	}
	    if(turtleDeathIndex==2){
			f(hold.id).src = "images/turtle-die-2.gif";
		}
		if(turtleDeathIndex==3){
			f(hold.id).src = "images/turtle-die-3.gif";	
		}
		if(turtleDeathIndex==4){
			f(hold.id).src = "images/turtle-die-4.gif";
			}
		if(turtleDeathIndex==5){
			f(hold.id).src = "images/turtle-die-5.gif";
    		turtleDeathIndex=-1;
    	}
    	turtleDeathIndex++;
	    new Media('audio/craw.mp3').play();
        f(hold.id).className += " disabled";
        fd = "d"+hold.id;
        f(fd).removeAttribute('ontouchstart');
        f(fd).removeAttribute('onmouseover');
     	ScorePts(30);
        return 60;
    }else if(hold.type=="starfish"){
        if(starfishDeathIndex==0){
	    	f(hold.id).src = "images/starfish-die.gif";
    	}
	    if(starfishDeathIndex==1){
			f(hold.id).src = "images/starfish-die-1.gif";
    	}
	    if(starfishDeathIndex==2){
			f(hold.id).src = "images/starfish-die-2.gif";
		}
		if(starfishDeathIndex==3){
			f(hold.id).src = "images/starfish-die-3.gif";	
		}
		if(starfishDeathIndex==4){
			f(hold.id).src = "images/starfish-die-4.gif";
			}
		if(starfishDeathIndex==5){
			f(hold.id).src = "images/starfish-die-5.gif";
    		starfishDeathIndex=-1;
    	}
    	starfishDeathIndex++;
	    //new Media('audio/craw.mp3').play();
        f(hold.id).className += " disabled";
        fd = "d"+hold.id;
        f(fd).removeAttribute('ontouchstart');
        f(fd).removeAttribute('onmouseover');
     	ScorePts(30);
        return 60;
    }
    else if(hold.type=="cthulu"){
        f(hold.id).src = "images/cthulu-die.gif";
        f(hold.id).className += " disabled";
        ScorePts(30);
        return 50;
    }
    else if(hold.type=="redmarble"||hold.type=="bluemarble"){
	    if(redMarbDeathIndex==0){
        	f(hold.id).src = "images/red-marble-die.gif";}
    	else if(redMarbDeathIndex==1){
	    	f(hold.id).src = "images/red-marble-die-1.gif";}
    	else if(redMarbDeathIndex==2){
	    	f(hold.id).src = "images/red-marble-die-2.gif";}
    	else if(redMarbDeathIndex==3){
	    	f(hold.id).src = "images/red-marble-die-3.gif";}
    	else if(redMarbDeathIndex==4){
	    	f(hold.id).src = "images/red-marble-die-4.gif";}
    	else if(redMarbDeathIndex==5){
	    	f(hold.id).src = "images/red-marble-die-5.gif";
	    	redMarbDeathIndex=-1;
	    	}
	    redMarbDeathIndex++;
        f(hold.id).className += " disabled";
	    fd = "d"+hold.id
        f(fd).removeAttribute('onmouseover');
        f(fd).removeAttribute('ontouchstart');
        return 50;
    }	
    else{return 50;
        
    }
}
function killit(a){ //end the sprite's run
    hold = Sprites[a];
    var timetodie = DeathAnimation(a);
    hold.death = FoxZ + timetodie;	
}	
function kill(a){
    hold = Sprites[a];
    f("d"+hold.id).style.display = "none";
    f(hold.id).style.display = "none";
    hold.flag = 0;
    
}
