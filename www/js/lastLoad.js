
window.console && console.log("[PF] LastLoad is loading...");

var touchable = 'createTouch' in document;
if(touchable) {
    f('leftButton').addEventListener( 'touchstart', onTouchStart, false );
    f('leftButton').addEventListener( 'touchmove', onTouchMove, false );
    f('leftButton').addEventListener( 'touchend', onTouchEnd, false );
    f('blastScreen').addEventListener( 'touchstart2', onTouchStart, false);
}   
            
            
f('foxavatar').style.width = Math.round(PlanetFox.ScreenWidth/PlanetFox.nine6constant);

f('fox').style.top = PlanetFox.FoxY;
f('foxavatar').style.height = Math.round((PlanetFox.ScreenHeight/PlanetFox.six4constant)*(94/50));

f('health').style.height = Math.round((PlanetFox.ScreenHeight/PlanetFox.six4constant)*(10/50));
f('health').style.left = Math.round((PlanetFox.ScreenWidth/PlanetFox.nine6constant)*(20/50));
f('health').style.height = Math.round((PlanetFox.ScreenHeight/PlanetFox.six4constant)*(10/50));
f('health').style.top = Math.round((PlanetFox.ScreenHeight/PlanetFox.six4constant)*(10/50));
f('score').style.left = Math.round((PlanetFox.ScreenWidth/PlanetFox.nine6constant)*(300/50));
f('score').style.top = Math.round((PlanetFox.ScreenHeight/PlanetFox.six4constant)*(10/50));
fontI = Math.round((PlanetFox.ScreenHeight/PlanetFox.six4constant)*(12/50));
fontS = fontI + "px";
f('score').style.fontSize = fontS;
f('marble').style.left =  Math.round((PlanetFox.ScreenWidth/PlanetFox.nine6constant)*(400/50));
f('marble').style.top =  Math.round((PlanetFox.ScreenHeight/PlanetFox.six4constant)*(10/50));
f('marble').style.fontSize = fontS;
ScreenH = Math.round(PlanetFox.ScreenHeight * 0.85);
f('leftButton').style.top = ScreenH;//"85%";//Math.round((ScreenHeight/six4constant)*(20/50));
f('leftButton').style.left = Math.round((PlanetFox.ScreenWidth/PlanetFox.nine6constant)*(13/50));
f('leftButton').style.height = Math.round((PlanetFox.ScreenHeight/PlanetFox.six4constant)*(30/50));
f('leftButton').style.width = Math.round((PlanetFox.ScreenWidth/PlanetFox.nine6constant)*(130/50));
f('error').style.top = Math.round((PlanetFox.ScreenHeight/PlanetFox.six4constant)*(270/50));
f('error').style.left = Math.round((PlanetFox.ScreenWidth/PlanetFox.nine6constant)*(300/50));
f('blastScreen').style.width = '100%';
f('blastScreen').style.height = '100%';
f('pause').style.top = "";

f('pause').style.bottom = '0px';

f('pause').style.left = Math.round((PlanetFox.ScreenWidth/PlanetFox.nine6constant)*(380/50));
//f('pauseImage').style.width = Math.round((ScreenWidth/nine6constant)*(34/50));

