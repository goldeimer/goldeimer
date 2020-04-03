<?php

/*
* Add your own functions here. You can also copy some of the theme functions into this file.
* Wordpress will use those functions instead of the original functions then.
*/
			add_filter('avf_logo','av_change_logo');
			function av_change_logo($logo)
			{
			    if(is_page(13893))  {
			    $logo = "http://www.goldeimer.de/wp-content/uploads/2019/06/P-Bank_Logo-y.png";
			    }
			    return $logo;
			}

			add_filter('avf_logo_link','av_change_logo_link');
function av_change_logo_link($link)
{
    if(is_page(13893)){
    $link = "#welcome";
    }
    return $link;
}
