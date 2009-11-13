
function submit(initialSearchString) {
	
	searchString = initialSearchString.value;
	searchString = searchString.replace("\'","%apostrophe");
	searchString = searchString.replace("\(","%oper");
	searchString = searchString.replace("\)","%cloper");


	if (searchString == "help?") {open_help();}
	if (searchString == "?help") {open_help();}

	if (searchString != "") {
      
		var scriptBase = "/usr/bin/osascript symphonic.scpt "+searchString+"";
		var outputTime = widget.system(scriptBase, null).outputString;
		var field = document.getElementById('searchField');

  		if (outputTime.length > 1) {
 	
			document.getElementById("info_wrap").innerHTML=(outputTime);

			animate_there();
			window.setTimeout('clear_search()',1000);
			window.setTimeout('animate_back()',2500);

		}

		if (outputTime.length <= 1) {
			field.value=("");
		}
	}
}


function animate_there() {

	document.getElementById("info_wrap").style.opacity=1;
	document.getElementById("info_box").style.display="block";
	document.getElementById("info_wrap").style.display="block";

	conStartAnimationInDirection(1);

}

function animate_back() {

	conStartAnimationInDirection(0);

}

function clear_search() {

	document.getElementById('searchField').value=("");

}

function show_search() {


	var front = document.getElementById("search_area");
	var back = document.getElementById("info_box");



	front.style.display="block";
	back.style.display="none";

	document.getElementById('searchField').focus()

}

function hide_search() {


	var front = document.getElementById("search_area");
	var back = document.getElementById("info_box");

	back.style.display="block";
	front.style.display="none";

}

function clear_search() {

	var field = document.getElementById('searchField');

	field.value=("");
	field.focus();
}

function open_homepage() {
	widget.openURL("http://mindquirk.com/")
}

function open_help() {
	widget.openURL("http://mindquirk.com/apps/symphonic/manual")
}

function body_load() {

	// MINDQUIRK VERSION CHECKER

	// var scriptBase = "/usr/bin/osascript vercheck.scpt";
	// var outputTime = widget.system(scriptBase, null).outputString;
	//  	document.getElementById('info_wrap').innerHTML=(outputTime);
	// var pos=outputTime.indexOf("New");
	// if (pos>=0) {
	// 	var field = document.getElementById('searchField');
	// 	hide_search()
	// 	field.value=("");
	// 	window.setTimeout('show_search()',3500);
	// 	field.focus();
	// }
	
	// END OF THAT STUFF
}



	
var conAnimator={
	fromValue: 0.0,
	toValue: 1.0,
	currentValue: 0.0,
	duration: 500,
	direction: 0,
	startTime: 0,
	frameRate: 13,
	timer: null
};

//  1 - search >   info
//  0 - info   >   search

function conStartAnimationInDirection(direction){
	if(direction != conAnimator.direction){
		conStopAnimate();
		conAnimator.startTime=(new Date).getTime() -conAnimator.frameRate;
		conAnimator.fromValue=conAnimator.currentValue;
		direction == 0 ? conAnimator.toValue=0.0 : conAnimator.toValue=1.0;
		conAnimator.direction=direction;
		if(conAnimator.direction==1)document.getElementById("info_box").style.display="block";
		else document.getElementById("searchField").style.display="block";
		conAnimator.timer=setInterval("conStepNextFrame();",conAnimator.frameRate);
	}
}

function conStopAnimate(){
	if(conAnimator.timer){
		clearInterval(conAnimator.timer);
		conAnimator.timer=null;
	}
}

function conStepNextFrame(){
	var _elapsed=(new Date).getTime() -conAnimator.startTime;
	if(_elapsed < 0) _elapsed=0;
	if(_elapsed > conAnimator.duration) _elapsed=conAnimator.duration;
	if(_elapsed >= conAnimator.duration){
		conStopAnimate();
		conAnimator.currentValue=conAnimator.toValue;
		if(conAnimator.direction==1)document.getElementById("search_field").style.display="none";
		else document.getElementById("info_box").style.display="none";
	}
	else {
		var _scale=0.5 -(0.5*Math.cos(Math.PI*_elapsed/conAnimator.duration));
		conAnimator.currentValue=conComputeNextFloat (conAnimator.fromValue,conAnimator.toValue,_scale);
	}
	document.getElementById("info_box").style.opacity=conAnimator.currentValue;
	document.getElementById("searchField").style.opacity=1-conAnimator.currentValue;
}

function conComputeNextFloat (from,to,ease){
		return from+(to -from)*ease;
}



