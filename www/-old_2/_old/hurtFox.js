function hurtFox(){ //Calls when Fox's body intersects another entity
    FoxHealth = FoxHealth - 10;
    f('health').style.width = FoxHealth;
    //soundManager.play('bop');
     //new Media('audio/bop.mp3').play();
     if(window.blast==0){window.blast = 1;}
     f('blastScreen').style.display = "block";
    new Media('audio/bop.mp3').play();
    if (FoxHealth <= 0){
        clearInterval(intervalID);
        alert('Planet needs a nap. Game Over');
        song.stop();
        song.release();
        window.location = "index.html";
    }
}// called when fox is hurt