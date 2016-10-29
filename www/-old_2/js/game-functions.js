
PlanetFox.CreateWorldDefinitions(PlanetFox.Sprites);

function onTouchStart2(event){}
function onTouchStart(event) {
	PlanetFox.deltaTouch = event.touches[0].clientX - 71;
}
function onTouchMove(event) {
    PlanetFox.deltaTouch = event.touches[0].clientX - 71; 
} 
function onTouchEnd(event) { 
    PlanetFox.deltaTouch = 0;
}
	
