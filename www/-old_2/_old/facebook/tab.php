<?php

require './facebook.php';

$facebook = new Facebook(array(
  'appId'  => 'd05bb8633e7f3af946f6222ee7003a9c',
  'secret' => '0238bef305e4cf3aba7f32682fef6d44',
  'cookie' => true, // enable optional cookie support
));
echo "tra la la";

//THIS REQUESTS PERMISSION TO POST CONTENT TO USER'S WALL (AND MAYBE APPS?)
echo "<a href=\"https://graph.facebook.com/oauth/authorize?client_id=d05bb8633e7f3af946f6222ee7003a9c&redirect_uri=http://apps.facebook.com/futurepost/&scope=publish_stream,offline_access,user_groups,user_photos\">Authorize More</a>";


