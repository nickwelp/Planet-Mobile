
function RepresentFox(){
FoxZ++;
FoxZ++;
var moveScale = deltaTouch + deltaTouch;
moveScale = moveScale/10;
FoxX = FoxX + moveScale;
if(FoxX<-80){FoxX = -80;}  
    if(FoxX>450){FoxX = 450;}
    f('fox').style.left=FoxX;
    
    if(jumpFox){
    
    if(FoxJumpCounter==1){
    f('foxavatar').src = 'images/fox-flip.gif';
    }
    FoxJumpCounter++;
    if(FoxJumpCounter < 50){
        FoxY = 170 - FoxJumpCounter*2;
        
        }
        if(FoxJumpCounter>50&&FoxJumpCounter<100){
        FoxY = 70 + ((FoxJumpCounter*2)-100);
        
        }
        if(FoxJumpCounter>100){
        FoxJumpCounter = 0;
        jumpFox = false;
        f('foxavatar').src = "images/fox.gif"; 
        FoxY = 170;
        }
        f('fox').style.top = FoxY
        
        
        }else{
        if(moveScale<0){
            f('foxavatar').src = "images/fox-left.png";
            f('leftButton').style.background="url('images/arrow-left.png') no-repeat";
            window.foxFlag = 1;
            }else if(moveScale>0){
            f('foxavatar').src = "images/fox-right.png";
            f('leftButton').style.background="url('images/arrow-right.png') no-repeat";
            window.foxFlag = 1;
            }else if(window.foxFlag==1){
            f('foxavatar').src = "images/fox.gif"; 
            f('leftButton').style.background="url('images/leftButton.png') no-repeat";
            window.foxFlag = 0;
            }
            }
            f('fox').style.zIndex=LengthOfCourse-FoxZ;
            } //draws fox each frame he need it; motion left right and meta values there of
