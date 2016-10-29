$(document).ready(function(){
	function StartDialog(c){
			$(c[0].target).writeText(c[0].dialog,0,c);
			
	}
    document.addEventListener('touchmove', function (e) {
                              e.preventDefault();
                              }, false);
    var song; 
    function callMusic(){
        song = new Media('audio/superhero.mp3').play();
    }
    function stopMusic(){
               }

	(function($) {
		    $.fn.writeText = function(content,indx, dlcontent) {
			    window.console && console.log("$.Write indx: " + indx);
			    var finished = false;
			    if(dlcontent[indx].dialog == "[css]"&&!finished){
				    for (c=0;c<dlcontent[indx].command.length;c++){
    					$(dlcontent[indx].command[c].target).css(dlcontent[indx].command[c].attribute,dlcontent[indx].command[c].order); 
    				}
    				indx++;
    				finished=true;
    				$(dlcontent[indx].target).writeText(dlcontent[indx].dialog,indx,dlcontent);        		
    				
				}
				else if(dlcontent[indx].dialog == "[clear]"&&!finished){
					$(dlcontent[indx].target).html("");
					indx++;
					finished=true;
    				$(dlcontent[indx].target).writeText(dlcontent[indx].dialog,indx,dlcontent);        		
    				
					}
				
		        var contentArray = content.split(""),
		            current = 0,
		            elem = this;
		        $(this).html("");    
		        var localint = indx;
		        setInterval(function() {
		            if(current < contentArray.length) {
		                elem.text(elem.text() + contentArray[current++]);
		            }else{
			          	localint++;
			            if(localint<dlcontent.length&&!finished){
				        	finished = true; 
				          	$(dlcontent[localint].target).writeText(dlcontent[localint].dialog,localint,dlcontent);        		
			            }else if(localint==dlcontent.length&&!finished){
				            finished=true;
				            skip();
				        }			           
		        	}
		        }, 100);
		        
		    };
		
		})(jQuery);  
	
 
	 StartDialog(dialogcontent);
});
	function skip(){
		 $('#next').css('display','block');
	} 