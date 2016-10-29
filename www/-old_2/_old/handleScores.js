function ScorePts(d){
    Score = Score + d;
    f('score').innerHTML = Score;
}  //manipulates score
function scoreMarble(t){
     new Media('audio/bell.mp3').play();
    
    killit(t);
    window.MarbleScore++;
    f('marble').innerHTML = window.MarbleScore;
    ScorePts(10);
    window.FoxHealth++;//heal fox 1 pt every marble
}

function starit(a){
	ScorePts(40);
	
	fvx = (Score/10%5);
	if(fvx==0){
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
	document.getElementById(da).setAttribute('onmouseover', '');	
	f(da).className += " disaled";
	f(da).removeAttribute("onmouseover");
		//p2.parentNode.removeChild(p2); 
    
}
	
	