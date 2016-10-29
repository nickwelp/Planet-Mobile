GameCenter();
document.addEventListener('touchmove', function (e) {
e.preventDefault();
}, false);





function f(name){   //Simplify getElementById
var g;
g = document.getElementById(name);
return g;
}


//Instantiate the constants our game world runs on
var browserName  = navigator.appName; 
//iOS iPhones have 320X480; or 640X960
var FoxX = 125;   //Intial X value of the fox's sprite
var FoxY = 170;  //initial Y value of fox
var FoxZ = 0;  //Z is Fox's depth in the world. As we simulate moving forward, we increase the value of Z
var NormX = 0; 
var FoxHealth,MarbleScore,Score;
Sounds = 0; 
var secondElement;
var deltaTouch = 0;
var intialTouch = 0;
var foxFlag = 0;
var goldenHorizon = 184;
var speedConstant = 15;//5;
var timerTo1000 = 0;
var d = new Date();
var blast = 0;
var timeAtStart;
var foxXtranslator = 530; //-80 to 450  -- 530
var jumpFox = false;
var FoxJumpCounter = 1;
function clickit(){
if (Sounds==1){
//Do nothing right now. Trigger a go music in the future.
}
}

var song;
var alreadyDone;

function callEndOfLevel(lev){

a = document.getElementById('endScreen');
a.style.display="block";
document.getElementById("scoreTT").innerHTML = Score;
document.getElementById("marblesTT").innerHTML = MarbleScore;
document.getElementById("nextLevel").innerHTML = "<a href='" + lev + "'>Next </a>";
}


function Start(){ //Start initiates game play; Spine() is the systemic update of world locations
alreadyDone = false;
f('start').style.display="none";
f('joyStick').style.display="block";
f('health').style.width = FoxHealth;
intervalID = setTimeout("Spine()", speedConstant);
Sounds=1;


// cordova.exec("SoundPlug.play", "audio/twisted.mp3");
 song = new Media('audio/twisted.mp3');
 song.play(); 
timeAtStart = d.getTime();
if(FoxZ<=LengthOfCourse){

}
}
