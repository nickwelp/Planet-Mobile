function NewOpponents(){ //if our Fox's Z axis brings us close enough to a new world enemy, generate their image
for(t=0;t<Sprites.length;t++){
hold = Sprites[t];
if(hold.zq - 600 == FoxZ){
rz = hold.zq - FoxZ;
rw = 200/rz;
newO=document.createElement('div');
newO.setAttribute('id', "d" + hold.id);
if(hold.type=="rock" || hold.type=="widerock"){
newO.innerHTML = "<img id='" + hold.id + "' src='" + hold.src + "' style='pointer-events: none;'></div>";
}else if(hold.type=="redmarble"){
newO.setAttribute('ontouchstart', 'scoreMarble(' + t + ')');			
newO.setAttribute('onmouseover', 'scoreMarble(' + t + ')');			

newO.innerHTML = "<img id='" + hold.id + "' src='" + hold.src + "'></div>";
}else if(hold.type=="no-star"){
newO.innerHTML = "<img id='" + hold.id + "' src='" + hold.src + "'></div>";
newO.setAttribute('ontouchstart', 'javascript:starit("' + hold.id  + '")');	
newO.setAttribute('onmouseover', 'javascript:starit("' +  hold.id + '")');	

}else if(hold.type=="sunorb" || hold.type=="cthulu" || hold.type=="flyingfish"|| hold.type=="bluemarble" || hold.type=="bluewave"){
newO.innerHTML = "<img id='" + hold.id + "' src='" + hold.src + "'></div>";

}else if( hold.type=="seaweed" ){
newO.innerHTML = "<img id='" + hold.id + "' src='" + hold.src + "'><p id='p" + hold.id + "'></p></div>";				
}else{
newO.setAttribute('ontouchstart', 'javascript:killit(' + t + ')');	
newO.setAttribute('onmouseover', 'javascript:killit(' + t + ')');	
newO.innerHTML = "<img id='" + hold.id + "' src='" + hold.src + "'><p id='p" + hold.id + "'></p></div>";				
}
newO.style.width = Math.round(rw * hold.width);
dHeight = rw*hold.height;
newO.style.position = "absolute";
newO.style.left = (NormX + 125) + hold.x*rw;
if(hold.type=="bird"){newO.style.top = hold.y; 
	hold.util = Math.floor(Math.random()*30);
}
else if(hold.type=="no-star"){ 
	hold.y = -180 + Math.floor((Math.random()*360));
	newO.style.bottom =  hold.y;
	}
else{newO.style.bottom = window.goldenHorizon; }

newO.style.zIndex = hold.zq-701;
hold.oh = Math.round(rw * hold.height);
hold.ow = Math.round(rw * hold.width);
f('PlayScreen').appendChild(newO);
hold.flag = 1;
}
}
}