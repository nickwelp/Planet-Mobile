
function Spine(){ // this is our systemic update sequencer. 
    NormX = FoxX - 240;
   	kk = new Date();
    RepresentFox();//depending on last key press, vary fox's X, Y and Z... if 'w' make Z accelerate
    NewOpponents();//see where we are in level, add new enimies in distance
    timerTo1000 = kk.getTime();
    speedRegulator = speedConstant;
    timeDif = timerTo1000 - timeAtStart;
    timeAtStart = timerTo1000;
    fps = 1000/timeDif;
    fps2 = fps.toFixed(2);
    if (fps2>15){speedRegulator = 15;}
 	
	if(window.blast==2){
		f('blastScreen').style.display = "none";
		window.blast = 0;
		}
	if(window.blast>0){
		window.blast++;
		}
	   
  //f('error').innerHTML = fps2;
   
     for(zt=0;zt<Sprites.length;zt++){
        hold = Sprites[zt];
        if(hold.flag==1){
            moveThing(zt);
        }
        
        if(hold.death>0){
            if(hold.death==FoxZ){
                kill(zt);
            }
        }  	
        if(FoxZ==LengthOfCourse){
            DisplayEnd(FoxZ);
            
        }   
    }
    if(FoxZ>=500&&!alreadyDone){
        
        alreadyDone = true;
        
        
        //alert(timeDif);
    }//6756
    //4561, 4493, 3795
   //	f('errorMonitor').innerHTML = FoxX;
    if(FoxZ<=LengthOfCourse){
      //  intervalID = setInterval("Spine()", speedRegulator);
      
      if(window.pause==true){}else{ 
       intervalID = setTimeout("Spine()", speedRegulator);
    }
    }
}
function PauseGame(){
	window.pause = true;
	f('pause-screen').style.display="block";
	}
function ResumeGame(){
	window.pause = false;
	f('pause-screen').style.display="none";
	intervalID = setTimeout("Spine()", speedConstant);
	
	}
function onTouchStart2(event){
    
}

function onTouchStart(event) {
    window.deltaTouch = event.touches[0].clientX - 71;
    
}

function onTouchMove(event) {
    window.deltaTouch = event.touches[0].clientX - 71; 
    
} 

function onTouchEnd(event) { 
    window.deltaTouch = 0;
}