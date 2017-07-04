var imgContainerLength = 200;
var imgWidth = 250;
var imgHoverWidth = 275;
var isCurrentlyMobile = true;

function initGallery() {

	clearImages();
	loadAll();
	$(window).resize(galleryResize);
	$("#navBtn").click(navBtnClicked);
	
	if(isMobile()) {
		loadMobileCss();
		isCurrentlyMobile = false;
	}
	galleryResize();
	
}

function galleryResize() {
	if(isMobile()){
		if(!isCurrentlyMobile){
			isCurrentlyMobile = true;
			initMobileEvents();
		}
		loadMobileCss();
		initMobileGallery();
		
		// TODO: THIS IS A TERRIBLE SOLUTION!!!
//		setTimeout(initMobileGallery, 250);
//		setTimeout(initMobileGallery, 250);
	} else {
		if(isCurrentlyMobile) {
			isCurrentlyMobile = false;
			initDesktopEvents();
			loadDesktopCss();
			initDesktopGallery();
		}
	}
}

function initDesktopEvents(){
	console.log("Turning on desktop events");
	$("#allBtn").click(filterByAll);
	$("#portraitsBtn").click(filterByPortraits);
	$("#animalsBtn").click(filterByAnimals);
	$("#otherBtn").click(filterByOther);
	$("#mobileGalleryMenu").hide();
	$("#galleryMenu").show();
}

function initDesktopGallery(){

	console.log("Hello");
	
	$("#gallery").removeAttr("style");
	$("h1").removeAttr("style");
	$("#mobileGalleryMenu").hide();


	//	$(".painting").css("width", imgContainerLength + "px");
	//	$(".painting").css("height", imgContainerLength + "px");
	//	$(".image").css("width", imgWidth + "px");
}

function initMobileEvents(){
	console.log("Turning on mobile events");
	$("#mobileAllBtn").click(filterByAll);
	$("#mobilePortraitsBtn").click(filterByPortraits);
	$("#mobileAnimalsBtn").click(filterByAnimals);
	$("#mobileOtherBtn").click(filterByOther);
	$("#mobileGalleryMenu").show();
	$("#galleryMenu").hide();
}

function initMobileGallery () {

	console.log("hello2");
	
	$("#gallery").css("width", 280 + "px");
	$("#gallery").css("position", "absolute");
	$("#gallery").css("left", "50%");
	$("#gallery").css("margin-left", "-140px");
	$("#gallery").css("padding-bottom", "70px");
	$("#gallery").css("top", "50px");
	$(".painting").css("margin", "25px 40px");
	
	$("h1").css("margin-top", "75px");

	// TODO: remove this shit

//	$(".painting").css("width", imgContainerLength + "px");
//	$(".painting").css("height", imgContainerLength + "px");
//	$(".image").css("width", imgWidth + "px");
}

function clearImages() {
	$("#gallery").children().each(function(){
		$(this).remove();
	});
}

function loadAll() {
	
	if(isMobile()){
		animateClick("mobileAllBtn", "buttonID", 125);
	}
	loadPortraits();
	loadAnimals();
	loadOthers();
	$("#pageTitle").text("All Paintings");
}

function loadPortraits() {
	$("#pageTitle").text("Portraits");
	var images = [
		"portrait1.png",
		"portrait2.png",
		"portrait3.png"
	];
	loadImages(images, "portrait");
}

function loadAnimals() {
	$("#pageTitle").text("Animals");
	var images = [
		"animal1.png",
		"animal2.png",
		"animal3.png"
	];
	loadImages(images, "animal");
}

function loadOthers() {
	$("#pageTitle").text("Other");
	var images = [];
	loadImages(images, "other");
}


function loadImages(images, type) {
	for(var i = 0; i < images.length; i++){
		addImage(images[i], type);
	}
	$(".painting").css("width", imgContainerLength + "px");
	$(".painting").css("height", imgContainerLength + "px");
	$(".image").css("width", imgWidth + "px");

}

function addImage(imageName, type) {

	var $container = $("<div>", {class : 'painting'});
	var $image = $("<img>", 
				   {src : "images/" + imageName, class : "image"});
	$image.hide();
	adjust($image, imageName);
	$container.data("type", type);
	$image.data("type", type);

	$image.appendTo($container);
	$container.appendTo("#gallery");
}

function adjust($image, imageName) {
	var widthOffset = (imgWidth-imgContainerLength)/2;
	$image.css("left", "-" + widthOffset + "px");


	var img = new Image();
	img.onload = function() {
		var scale = imgWidth/this.width;
		var heightOffset = ((this.height*scale)-imgContainerLength)/2;
		$image.css("top", "-" + heightOffset + "px");


		$image.hover(function() {
			$image.css("width", imgHoverWidth + "px");
			var widthHoverOffSet = (imgHoverWidth-imgContainerLength)/2;
			$image.css("left", "-" + widthHoverOffSet + "px");
			var scale = imgHoverWidth/this.width;
			var heightOffset = ((this.height*scale)-imgContainerLength)/2;
			$image.css("top", "-" + heightOffset + "px");
		}, function(){
			$image.css("width", imgWidth + "px");
			$image.css("left", "-" + widthOffset + "px");
			var scale = imgWidth/this.width;
			var heightOffset = ((this.height*scale)-imgContainerLength)/2;
			$image.css("top", "-" + heightOffset + "px");
		});
		$image.show();
	}
	img.src = 'images/' + imageName;

	$image.click(function(){
		console.log("Click!");
	});
}

function filterByAll() {
	$("#pageTitle").text("All paintings");
	animateClick("mobileAllBtn", "allBtn",125);
	filterByType();
}

function filterByPortraits() {
	$("#pageTitle").text("Portraits");
	animateClick("mobilePortraitsBtn","portraitsBtn", 125);
	filterByType("portrait");
}

function filterByAnimals() {	
	$("#pageTitle").text("Animals");
	animateClick("mobileAnimalsBtn", "animalsBtn", 125);
	filterByType("animal");
}

function filterByOther() {
	$("#pageTitle").text("Other");
	animateClick("mobileOtherBtn", "otherBtn", 125);
	filterByType("other");
}

function filterByType(type) {
	$("#gallery").children().each(function(){
		if (typeof type == 'undefined' || 
			$(this).data("type") == type) {
			$(this).show();
		}
		else if ($(this).data("type") != type) {
			$(this).hide();
		}	
	});
}


$( document ).ready(function() {

	console.log( "Inside artwork.js" );

	//	initGalleryWindow();

	initGallery();
	//	if(isMobile()){
	//		initMobileGallery();
	//	} else {
	//		initDesktopGallery();
	//	}
});