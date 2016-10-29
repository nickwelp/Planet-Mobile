
function moveThing(t){ //handles AI
HurtX = 0;
hold = Sprites[t]; //Treat a Javascript Object like an Array through this stellar deception
hold.z = hold.zq - FoxZ;

if(hold.z>30){
dW = 100/hold.z;
}if(hold.z==30){
kill(t);	
}
	
var Width = Math.round(dW * hold.width);
var Height = Math.round(dW * hold.height);
f(hold.id).style.width = Width;
if(hold.type=="bird" && hold.z-60>FoxZ){
hold.z--;
}
if(hold.type=="bird" && hold.z-200<FoxZ){
if((hold.y+Height)<(FoxY-30)){
hold.y++;
}
}

if(hold.type=="flyingfish"){
    hold.zq--;
}


if(hold.type!="bird"){
var MidHeight = Height/2;
f(hold.id).style.bottom = window.goldenHorizon - MidHeight;
}
f("d"+hold.id).style.zIndex = (LengthOfCourse - hold.zq)+60;
Leftx =  (240 +(NormX*dW*-1)) + hold.x*dW - (Width - hold.ow)/2;	
if(hold.type=="nothing"){
Topy = hold.y;
f("d"+ hold.id).style.top = Topy;	
}else{
Topy = (hold.y - (Height - hold.oh)/2);	
if(hold.type=="bird"){f("d"+ hold.id).style.top = Topy;
}
else{
f("d"+hold.id).style.bottom = window.goldenHorizon - MidHeight +hold.y;          
}

}
if(hold.type=="bluewave"){
hold.zq--;  
}

if(hold.type=="turtle"){
    if(Leftx < FoxX){
        hold.x = hold.x + 1;
    }else if(Leftx > FoxX){
        hold.x = hold.x -1;
    }
    
}
if(hold.type=="bird"){ //BIRD'S HORIZONTAL STUFF
       hold.util++;
       if(hold.util<30){
           hold.x =  hold.x+3;
       }else if(hold.util<60){
           hold.x = hold.x -3;        
       }else{
           hold.util=0;
           }
   }
if(hold.type=="shark"){
    hold.zq++;
    if(hold.zq-90<FoxZ){ 
        //nom nom
    }else if(hold.zq-100<FoxZ){
        f(hold.id).src = "images/shark-attack.gif";
    }else if(Leftx < FoxX){
        hold.x = hold.x + 5;
        f(hold.id).src = "images/shark-right.gif";
    }else if(Leftx > FoxX){
        hold.x = hold.x -5;
        f(hold.id).src = "images/shark-left.gif";
    }else{
        f(hold.id).src="images/shark-forward.gif";
    }
}
    
    if(hold.type=="tornado"){
        if(hold.z<450){
        hold.zq = FoxZ + 450;                    }
        //on a timer, send flying fish and sharks
    }
    if((((LengthOfCourse - hold.zq)+70)>=LengthOfCourse-FoxZ)&&hold.type=="bluewave"){
        f("d"+hold.id).style.zIndex =   (LengthOfCourse-FoxZ) - 20;
        
        if(FoxX<Leftx && Leftx<(FoxX + 50)){
            window.jumpFox = true;
            }
        if(Leftx<FoxX && FoxX<(Leftx+Width)){
            window.jumpFox = true;
            }
        if(FoxX>Leftx && (FoxX +50)<(Leftx + Width)){
            window.jumpFox = true;
            }
        }    
        if(hold.type=="flyingfish"){
            
            if((((LengthOfCourse - hold.zq)+60)==LengthOfCourse-FoxZ ||((LengthOfCourse - hold.zq)+60)==LengthOfCourse-FoxZ+1 )&&hold.death==0){
            if(FoxX<Leftx && Leftx<(FoxX + 50)){
                hurtFox();
            }
            if(Leftx<FoxX && FoxX<(Leftx+Width)){
                hurtFox();
                }
            if(FoxX>Leftx && (FoxX +50)<(Leftx + Width)){
                hurtFox();
                }
            }
        }   
            
        if((((LengthOfCourse - hold.zq)+60)==LengthOfCourse-FoxZ)&&hold.death==0){
            if(FoxX<Leftx && Leftx<(FoxX + 50)){
            HurtX = 1;
            } 
            if(Leftx<FoxX && FoxX<(Leftx+Width)){
                HurtX = 1;
                }
            if(FoxX>Leftx && (FoxX +50)<(Leftx + Width)){
                HurtX = 1;
                }
                
                if(HurtX==1){// && FoxY<(Topy + Height) && Topy<FoxY){
                if(hold.type == "redmarble" || (hold.type == "bluemarble" && window.jumpFox) ){
                scoreMarble(t);
                }else if(hold.type == "seaweed" && window.jumpFox){
                
            	}else if(hold.type =="castle" || hold.type == "welcome" || hold.type =="left" || hold.type =="right" ||hold.type=="bluewave" ||	hold.type =="forward" ||	hold.type =="zap"  || hold.type =="getem"){}
                else{
                hurtFox();
                }
                }
                if(1==0){//HurtX==1 && (FoxY + 200)<(Topy + Height) && Topy<(FoxY + 200)){
                if(hold.type == "redmarble"){
                scoreMarble(t);
                }else if(hold.type =="castle"|| hold.type == "welcome" || hold.type =="left" || hold.type =="right" ||	hold.type =="forward" ||	hold.type =="zap"  || hold.type =="getem"){}
                
                else{
                hurtFox();
                }
                }	
                }
                f("errorMonitor").innerHTML = MarbleScore;
                f("d"+ hold.id).style.left = Leftx;
                
                } //handles non fox motion
                
