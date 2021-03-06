$(document).ready(function(){
	$(document).click(dropLetters);

	$(window).resize(function(){
		clearInterval(itv);
		isResized = true;
		
		$('.canvas').text('Please reload the page.');
		$('.canvas').addClass('show-info');		
	});
});

var settings = {
	letterArray: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	colorArray: ['lightpink','lightgreen','lightgray','plum', 'lightsalmon','lightskyblue'],
	interval: 50,			// after every such interval, a new letter is generated on screen
	minTravelTime: 500,
	travelTimeDiff: 4000,	// the difference between min travel time and max travel time
	minFontSize: 20,
	fontSizeDiff: 40,		// the difference between min font size and max font size
	videoUrl: 'https://www.youtube.com/embed/ZMJEbzfkze8?autoplay=1'
  //videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1'
}

var _settings = {
	letterArray: ['Cranbourne','Berwick','Narre Warren', 'Lymbrook', 'Kew', 'Albert Park', 'Caulfield', 'South Yarra', 'Ivanhoa', 'Cragiebourne', 'Lilydale', 'Lake Entrance'],
	colorArray: ['lightpink','lightgreen','lightgray','plum', 'lightsalmon','lightskyblue'],
	interval: 500,			// after every such interval, a new letter is generated on screen
	minTravelTime: 1000,
	travelTimeDiff: 7000,	// the difference between min travel time and max travel time
	minFontSize: 20,
	fontSizeDiff: 30,		// the difference between min font size and max font size
	videoUrl: 'https://www.youtube.com/embed/ZMJEbzfkze8?autoplay=1'
}

var isStarted = false;
var isResized = false;
var itv;
var id=0;

var maxHeight = (window.innerHeight-120).toString() +'px';
var maxWidth = window.innerWidth - 100;

function dropLetters(){
	if(isResized){
		return;  
	}
	
	var currColor = settings.colorArray[Math.floor(Math.random() * settings.colorArray.length)];
	
	if(!isStarted){
		$('#introduction').hide();
		$('#setting').hide();
		$('#scoreNum').show();

		$('iframe').show();

		if($('iframe').prop('src') != settings.videoUrl){
			$('iframe').prop('src', settings.videoUrl);
		}

		//$('iframe')[0].contentWindow.location.reload(true);


		itv = setInterval(function(){
			var currLetterIdx = Math.floor(Math.random()*settings.letterArray.length);
			var currLetter = settings.letterArray[currLetterIdx];
			
			var currLeft = Math.floor(Math.random() * maxWidth);
			var opacity = Math.random();
			
			var fontSize = Math.floor(Math.random()* settings.fontSizeDiff) + settings.minFontSize;
			
			var elemHtml = '<div id="letter_'+id+'" style="left:'+ currLeft +'px; opacity:'+opacity+'; font-size:'+fontSize+'px;color:'+currColor+'" class="letterDiv">'+currLetter+'</div>'
			$('.canvas').append(elemHtml);
			
			var randSpeed = Math.floor(Math.random() * settings.travelTimeDiff) + settings.minTravelTime;
			
			var newElem = $('#letter_'+id);
			
			newElem.animate({top:maxHeight},randSpeed,'linear', 
			function(){
				newElem.remove();
			});	
			
			id++;
		}, settings.interval );
		
	}
	else{
		clearInterval(itv);
		//$('iframe').prop('src', '');
		$('iframe').hide();
	}
	isStarted = !isStarted;

}



