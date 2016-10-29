function getCookie(c_name)
{
	//alert("Get Cookie");
var i,x,y;
var ARRcookies= new Array();
ARRcookies = document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
	//  alert("Get Cookie 1");
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
 // alert("Get Cookie 2");
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
  //  alert(y);
    }
  }
}


function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}


var scoreC=getCookie("score");
var marble=getCookie("marbles");
var health=getCookie("health");
var rotationSpeedC=getCookie("rotationSpeed");


function setUpFox()
{
if (scoreC!=null && scoreC!="")
  {
	//alert(scoreC);
	 Score = parseInt(scoreC);
  }
if(marble!=null && marble !=""){
	MarbleScore = parseInt(marble);
	}  
if(health!=null && health !=""){
	FoxHealth = parseInt(health);
}
  

}

function setData(){
	exdays = 365;
	setCookie("score",window.Score,exdays);
	setCookie("marbles",window.MarbleScore,exdays);
	setCookie("health",window.FoxHealth,exdays);
	setCookie("rotationSpeed",window.rotationSpeed,exdays);
	}
setUpFox();