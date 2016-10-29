#import "AdMobPlugin.h"
#import "GADAdMobExtras.h"
#import "GADAdSize.h"
#import "GADBannerView.h"

@interface AdMobPlugin ()

- (void)createGADBannerViewWithPubId:(NSString *)pubId
                          bannerType:(GADAdSize)adSize;
- (void)requestAdWithTesting:(BOOL)isTesting
                      extras:(NSDictionary *)extraDict;
- (void)resizeViews;
- (void)moveViewOffScreen;
- (void)hideAd;
- (GADAdSize)GADAdSizeFromString:(NSString *)string;
- (void)deviceOrientationChange:(NSNotification *)notification;

@end

@implementation AdMobPlugin

@synthesize bannerView = bannerView_;

#pragma mark Cordova JS bridge

- (CDVPlugin *)initWithWebView:(UIWebView *)theWebView {
    self = (AdMobPlugin *)[super initWithWebView:theWebView];
    if (self) {
        positionAdAtTop_ = NO;
        // These notifications are required for re-placing the ad on orientation
        // changes. Start listening for notifications here since we need to
        // translate the Smart Banner constants according to the orientation.
        [[UIDevice currentDevice] beginGeneratingDeviceOrientationNotifications];
        [[NSNotificationCenter defaultCenter]
         addObserver:self
         selector:@selector(deviceOrientationChange:)
         name:UIDeviceOrientationDidChangeNotification
         object:nil];
    }
    return self;
}

// The javascript from the AdMob plugin calls this when createBannerView is
// invoked. This method parses the arguments passed in.
- (void)createBannerView:(NSMutableArray *)arguments
                withDict:(NSMutableDictionary *)options {
    CDVPluginResult *pluginResult;
    NSString *callbackId = [arguments pop];
    GADAdSize adSize = [self GADAdSizeFromString:
                        [options objectForKey:KEY_AD_SIZE_ARG]];
    // We don't need positionAtTop to be set, but we need values for adSize and
    // publisherId if we don't want to fail.
    if (![options objectForKey:KEY_PUBLISHER_ID_ARG]) {
        // Call the error callback that was passed in through the javascript
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                         messageAsString:@"AdMobPlugin:"
                        @"Invalid publisher Id"];
        [self writeJavascript:[pluginResult toErrorCallbackString:callbackId]];
        return;
    } else if (GADAdSizeEqualToSize(adSize, kGADAdSizeInvalid)) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                         messageAsString:@"AdMobPlugin:"
                        @"Invalid ad size"];
        [self writeJavascript:[pluginResult toErrorCallbackString:callbackId]];
        return;
    }
    if ([options objectForKey:KEY_POSITION_AT_TOP_ARG]) {
        positionAdAtTop_=
        (BOOL)[[options objectForKey:KEY_POSITION_AT_TOP_ARG] boolValue];
    }
    
    NSString *publisherId = [options objectForKey:KEY_PUBLISHER_ID_ARG];
    [self createGADBannerViewWithPubId:publisherId
                            bannerType:adSize];
    
    // Call the success callback that was passed in through the javascript.
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self writeJavascript:[pluginResult toSuccessCallbackString:callbackId]];
}

- (void)requestAd:(NSMutableArray *)arguments
         withDict:(NSMutableDictionary *)options {
    CDVPluginResult *pluginResult;
    NSString *callbackId = [arguments pop];
    
    if (!self.bannerView) {
        // Try to prevent requestAd from being called without createBannerView first
        // being called.
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                         messageAsString:@"AdMobPlugin:"
                        @"No ad view exists"];
        [self writeJavascript:[pluginResult toErrorCallbackString:callbackId]];
        return;
    }
    
    NSDictionary *extrasDictionary = nil;
    if ([options objectForKey:KEY_EXTRAS_ARG]) {
        extrasDictionary = [NSDictionary dictionaryWithDictionary:
                            [options objectForKey:KEY_EXTRAS_ARG]];
    }
    BOOL isTesting = (BOOL)[[options objectForKey:KEY_IS_TESTING_ARG] boolValue];
    [self requestAdWithTesting:isTesting
                        extras:extrasDictionary];
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self writeJavascript:[pluginResult toSuccessCallbackString:callbackId]];
}

- (void)hideAd:(NSMutableArray *)arguments
      withDict:(NSMutableDictionary *)options {
    CDVPluginResult *pluginResult;
    NSString *callbackId = [arguments pop];
    
    if (!self.bannerView) {
        // Try to prevent requestAd from being called without createBannerView first
        // being called.
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                         messageAsString:@"AdMobPlugin:"
                        @"No ad view exists"];
        [self writeJavascript:[pluginResult toErrorCallbackString:callbackId]];
        return;
    }
    BOOL isHidden = (BOOL)[[options objectForKey:@"isHidden"] boolValue];
    self.bannerView.hidden  = isHidden;
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self writeJavascript:[pluginResult toSuccessCallbackString:callbackId]];
    NSLog(@"MEssage hidden");
      [self resizeViews];
}
- (GADAdSize)GADAdSizeFromString:(NSString *)string {
    if ([string isEqualToString:@"BANNER"]) {
        return kGADAdSizeBanner;
    } else if ([string isEqualToString:@"IAB_MRECT"]) {
        return kGADAdSizeMediumRectangle;
    } else if ([string isEqualToString:@"IAB_BANNER"]) {
        return kGADAdSizeFullBanner;
    } else if ([string isEqualToString:@"IAB_LEADERBOARD"]) {
        return kGADAdSizeLeaderboard;
    } else if ([string isEqualToString:@"SMART_BANNER"]) {
        // Have to choose the right Smart Banner constant according to orientation.
        UIDeviceOrientation currentOrientation =
        [[UIDevice currentDevice] orientation];
        if (UIInterfaceOrientationIsPortrait(currentOrientation)) {
            return kGADAdSizeSmartBannerPortrait;
        }
        else {
            return kGADAdSizeSmartBannerLandscape;
        }
    } else {
        return kGADAdSizeInvalid;
    }
}

#pragma mark Ad Banner logic

- (void)createGADBannerViewWithPubId:(NSString *)pubId
                          bannerType:(GADAdSize)adSize {
    self.bannerView = [[[GADBannerView alloc] initWithAdSize:adSize] autorelease];
    self.bannerView.adUnitID = pubId;
    self.bannerView.delegate = self;
    self.bannerView.rootViewController = self.viewController;
}

- (void)requestAdWithTesting:(BOOL)isTesting
                      extras:(NSDictionary *)extrasDict {
    GADRequest *request = [GADRequest request];
    request.testing = isTesting;
    if (extrasDict) {
        GADAdMobExtras *extras = [[[GADAdMobExtras alloc] init] autorelease];
        NSMutableDictionary *modifiedExtrasDict =
        [[NSMutableDictionary alloc] initWithDictionary:extrasDict];
        [modifiedExtrasDict removeObjectForKey:@"cordova"];
        [modifiedExtrasDict setValue:@"1" forKey:@"cordova"];
        extras.additionalParameters = modifiedExtrasDict;
        [request registerAdNetworkExtras:extras];
    }
    [self.bannerView loadRequest:request];
    // Add the ad to the main container view, and resize the webview to make space
    // for it.
    [self.webView.superview addSubview:self.bannerView];
    [self resizeViews];
}



- (void)resizeViews {
    
    // If the banner hasn't been created yet, no need for resizing views.
    if ( self.bannerView.isHidden) {
        UIDeviceOrientation currentOrientation =
        [[UIDevice currentDevice] orientation];
        // Handle changing Smart Banner constants for the user.
        BOOL adIsSmartBannerPortrait =
        GADAdSizeEqualToSize(self.bannerView.adSize,
                             kGADAdSizeSmartBannerPortrait);
        BOOL adIsSmartBannerLandscape =
        GADAdSizeEqualToSize(self.bannerView.adSize,
                             kGADAdSizeSmartBannerLandscape);
        if ((adIsSmartBannerPortrait) &&
            (UIInterfaceOrientationIsLandscape(currentOrientation))) {
            self.bannerView.adSize = kGADAdSizeSmartBannerLandscape;
            //NSLog(@"1x");
        } else if ((adIsSmartBannerLandscape) &&
                   (UIInterfaceOrientationIsPortrait(currentOrientation))) {
            self.bannerView.adSize = kGADAdSizeSmartBannerPortrait;
            //NSLog(@"2x");
        }
        
        // Frame of the main Cordova webview.
        CGRect webViewFrame = self.webView.frame;
        // Frame of the main container view that holds the Cordova webview.
        CGRect superViewFrame = self.webView.superview.frame;
        CGRect bannerViewFrame = self.bannerView.frame;
        CGRect frame = bannerViewFrame;
        // The updated x and y coordinates for the origin of the banner.
        CGFloat yLocation = 00.0;
        CGFloat xLocation = 0.0;
        
        if (positionAdAtTop_) {
            // Move the webview underneath the ad banner.
            webViewFrame.origin.y = bannerViewFrame.size.height;
            // Center the banner using the value of the origin.
        } else {
            // Move the webview to the top of the screen.
            webViewFrame.origin.y = 0;
            // Need to center the banner both horizontally and vertically.
            if (UIInterfaceOrientationIsLandscape(currentOrientation)) {
                yLocation = 300;
                xLocation = 300;
             
            } else {
                yLocation = 300;
                xLocation = 300;
        
            }
        }
        
        frame.origin = CGPointMake(xLocation, yLocation);
        
        
        bannerView_.frame = frame;
        
        if (UIInterfaceOrientationIsLandscape(currentOrientation)) {
            // The super view's frame hasn't been updated so use its width
            // as the height.
            webViewFrame.size.height = superViewFrame.size.height -
            bannerViewFrame.size.height;
        } else {
            webViewFrame.size.height = superViewFrame.size.height -
            bannerViewFrame.size.height;
        }
        self.webView.frame = webViewFrame;
        return;
    }else{
    if (!self.bannerView || self.bannerView.isHidden) {
        NSLog(@"BannerView doesn't exist");
        //return;
    }
     NSLog(@"ResizeViews");
    
    UIDeviceOrientation currentOrientation =
    [[UIDevice currentDevice] orientation];
    // Handle changing Smart Banner constants for the user.
    BOOL adIsSmartBannerPortrait =
    GADAdSizeEqualToSize(self.bannerView.adSize,
                         kGADAdSizeSmartBannerPortrait);
    BOOL adIsSmartBannerLandscape =
    GADAdSizeEqualToSize(self.bannerView.adSize,
                         kGADAdSizeSmartBannerLandscape);
    if ((adIsSmartBannerPortrait) &&
        (UIInterfaceOrientationIsLandscape(currentOrientation))) {
        self.bannerView.adSize = kGADAdSizeSmartBannerLandscape;
    } else if ((adIsSmartBannerLandscape) &&
               (UIInterfaceOrientationIsPortrait(currentOrientation))) {
        self.bannerView.adSize = kGADAdSizeSmartBannerPortrait;
    }
    
    // Frame of the main Cordova webview.
    CGRect webViewFrame = self.webView.frame;
    // Frame of the main container view that holds the Cordova webview.
    CGRect superViewFrame = self.webView.superview.frame;
    CGRect bannerViewFrame = self.bannerView.frame;
    CGRect frame = bannerViewFrame;
    // The updated x and y coordinates for the origin of the banner.
    CGFloat yLocation = 00.0;
    CGFloat xLocation = 0.0;
    
    if (positionAdAtTop_) {
        // Move the webview underneath the ad banner.
        webViewFrame.origin.y = bannerViewFrame.size.height;
        // Center the banner using the value of the origin.
             } else {
        // Move the webview to the top of the screen.
        webViewFrame.origin.y = 0;
        // Need to center the banner both horizontally and vertically.
        if (UIInterfaceOrientationIsLandscape(currentOrientation)) {
            yLocation = superViewFrame.size.width -
            bannerViewFrame.size.height;
            xLocation = (superViewFrame.size.height -
                         bannerViewFrame.size.width) / 2.0;
        } else {
            yLocation = superViewFrame.size.height -
            bannerViewFrame.size.height;
            xLocation = (superViewFrame.size.width -
                         bannerViewFrame.size.width) / 2.0;
        }
    }
 
    frame.origin = CGPointMake(xLocation, yLocation);
     
    
    bannerView_.frame = frame;
    
    if (UIInterfaceOrientationIsLandscape(currentOrientation)) {
        // The super view's frame hasn't been updated so use its width
        // as the height.
        webViewFrame.size.height = superViewFrame.size.width -
        bannerViewFrame.size.height;
    } else {
        webViewFrame.size.height = superViewFrame.size.height -
        bannerViewFrame.size.height;
    }
    self.webView.frame = webViewFrame;
    }
}




- (void)deviceOrientationChange:(NSNotification *)notification {
    [self resizeViews];
}

#pragma mark GADBannerViewDelegate implementation

- (void)adViewDidReceiveAd:(GADBannerView *)adView {
    NSLog(@"%s: Received ad successfully.", __PRETTY_FUNCTION__);
    [self writeJavascript:@"cordova.fireDocumentEvent('onReceiveAd');"];
}

- (void)adView:(GADBannerView *)view
didFailToReceiveAdWithError:(GADRequestError *)error {
    NSLog(@"%s: Failed to receive ad with error: %@",
          __PRETTY_FUNCTION__, [error localizedFailureReason]);
    // Since we're passing error data back through Cordova, we need to set this
    // up.
    NSString *jsString =
    @"cordova.fireDocumentEvent('onFailedToReceiveAd',"
    @"{ 'error': '%@' });";
    [self writeJavascript:[NSString stringWithFormat:jsString,
                           [error localizedFailureReason]]];
}

- (void)adViewWillPresentScreen:(GADBannerView *)adView {
    [self writeJavascript:
     @"cordova.fireDocumentEvent('onPresentScreen');"];
}

- (void)adViewDidDismissScreen:(GADBannerView *)adView {
    [self writeJavascript:
     @"cordova.fireDocumentEvent('onDismissScreen');"];
}

- (void)adViewWillLeaveApplication:(GADBannerView *)adView {
    [self writeJavascript:
     @"cordova.fireDocumentEvent('onLeaveApplication');"];
}

#pragma mark Cleanup

- (void)dealloc  {
    
    [self writeJavascript:
     @"cordova.fireDocumentEvent('onclosead');"];

    [[UIDevice currentDevice] endGeneratingDeviceOrientationNotifications];
    [[NSNotificationCenter defaultCenter]
     removeObserver:self
     name:UIDeviceOrientationDidChangeNotification
     object:nil];
    bannerView_.delegate = nil;
    [bannerView_ release];
    
    [super dealloc];

}

@end
