jQuery(function(){

//顶部功能菜单
$(".mTop_moreIcon").click(function(){
	$(".mLayerMenu,.mLayerBg").fadeIn(300);
	});
$(".mLayerBg").click(function(){
	$(".mLayerMenu,.mLayerBg").fadeOut(300);
	$(".perLayer").removeClass("perLayerIn");
	});
	
$(".mTop_perIcon").click(function(){
	$(".mLayerBg").fadeIn(300);
	$(".perLayer").addClass("perLayerIn");
	});
	
//消息关闭
$(".m2topMes i").click(function(){
	$(".m2topMes").fadeOut(200);
	});



})

//屏蔽页面错误
jQuery(window).error(function(){
  return true;
});
jQuery("img").error(function(){
  $(this).hide();
});