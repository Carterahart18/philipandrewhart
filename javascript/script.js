var mobileNavIsOpen = false;

function animateClick(mobileBtnID, buttonID, clickDelay){
	if(!isMobile()){
		$("#"+buttonID).css('background-color', '#AAA');
		setTimeout(function(){
			$("#"+buttonID).css('background-color', '#EEE');
		}, clickDelay);
	} else {
		$("#mobileGalleryMenu").children().each(function(){
			if($(this).attr("id") == mobileBtnID) {
				$(this).attr('class', 'selectedMenuItem');
			} else {	
				$(this).removeAttr('class');
			}
		});
	}
}

function isMobile() {
	return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) 
	|| $(window).width() <= 1100;
}

function initWindow(){
	// Events
	$(window).resize(resizeWindow);
	$("#navBtn").click(navBtnClicked);

	// Init Functions
	resizeWindow();
	if(isMobile()) {
		loadMobileCss();
	}
}

function navBtnClicked(){
	console.log("Nav Clicked");
	if(!mobileNavIsOpen) {
		mobileNavIsOpen = true;
		$("#mobileMenu").css("top", "50px");
	} else {
		mobileNavIsOpen = false;
		$("#mobileMenu").css("top", "-170px");
	}
}

function resizeWindow() {
	if(isMobile()){
		loadMobileCss();
	} else {
		loadDesktopCss();
	}
}

function loadDesktopCss(){
	var screenWidth =  $(window).width() + "px";
	//	$("#debug").text("a: " + screenWidth);
	$("#title").removeAttr('style');
	$("#nav").removeAttr('style');
	$("main").removeAttr('style');
	$("p").removeAttr('style');
	$("#navBtn").hide();
	$("#menu").show();

}

function loadMobileCss() {
	var screenWidth =  $(window).width() + "px";
	//	$("#debug").text("a: " + screenWidth);
	$("#title").css("width", "200px");
	$("#title").css("text-align", "center");
	$("#title").css("position", "absolute");
	$("#title").css("left", "50%");
	$("#title").css("margin-left", "-100px");

	$("#nav").css("width", "100%");
	$("#nav").css("left", "0");
	$("#nav").css("margin-left", "0px");

	$("main").css("width", screenWidth);
	$("main").css("left", "0px");
	$("main").css("margin-left", "0px");

	$("p").css("font-size", "10px");

	$("#navBtn").show();
	$("#menu").hide();
}

