     
            function failed(){
              //  document.write('  FAAILed  ');
            }
                function requestTheAd(){
               // document.write(' ARRIVED ');
                     
                window.plugins.AdMob.requestAd({
                                               'isTesting': true,
                                               'extras': {
                                               'color_bg': 'AAAAFF',
                                               'color_bg_top': 'FFFFFF',
                                               'color_border': 'FFFFFF',
                                               'color_link': '000080',
                                               'color_text': '808080',
                                               'color_url': '008000'
                                               },
                                               },
                                               function(){
                                               // alert('success');
                                               }, //success call back
                                               function(){
                                                // alert('FAIL');
                                               } //failure call back
                                               );  
                     
            
            }
            function rws(){       
                               }


function resizeView(){
    
    alert('done');
    
}
function resizeViewFail(){
    
    alert('doneFail');
    
}

            function callCreate(  ){
                       window.plugins.AdMob.createBannerView(
                                                  {
                                                  'publisherId': 'a150e089b51b4a1',
                                                  'adSize': AdMob.AD_SIZE.SMART_BANNER
                                                  },
                                                  function() {
                                                  requestTheAd();
                                                    },
                                                  function() {
                                                    failed();
                                                    }
                                                   	);
              
            }
function hideTheAds(){
    window.plugins.AdMob.hideAd({
                                'isHidden': true
                                },
                                function(){
                                //
                                },
                                function(){
                                //alert('did not work');
                                }
                                );
}




