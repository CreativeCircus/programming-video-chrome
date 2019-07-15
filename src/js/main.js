
let $video = document.querySelector('video'); // ideally, this would be more specific. What if there was more than one video?
let $playPause = document.querySelector('.play-pause');
let $muteUnmute = document.querySelector('.mute-unmute');
let $time = document.querySelector('.time');
let $progressBar = document.querySelector('.progress-bar');
let $fullScreen = document.querySelector('.full-screen');
let $back15 = document.querySelector('.back-15');
let $forward15 = document.querySelector('.forward-15');

if (!$video.requestFullscreen && !$video.webkitRequestFullscreen ) {
	$fullScreen.style.display = "none";
}
$back15.addEventListener("click", () => {
	$video.currentTime -= 15;
});
$forward15.addEventListener("click", () => {
	$video.currentTime += 15;	
});

$fullScreen.addEventListener("click", () => {
	if ($video.requestFullscreen) {
		$video.requestFullscreen()
	} else if ($video.webkitRequestFullscreen) {
		$video.webkitRequestFullscreen()
	} else if ($video.mozRequestFullscreen) {
		$video.mozRequestFullscreen()
	} else if ($video.oRequestFullscreen) {
		$video.oRequestFullscreen()
	}
})

$playPause.addEventListener('click', () => {
	if ($video.paused) {
		$video.play();
		$playPause.classList.add("active");
	} else { // it must be playing already
		$video.pause()
		$playPause.classList.remove("active");
	}
})


$muteUnmute.addEventListener('click', () => {
	if ($video.muted) {
		$video.muted = false;
		$muteUnmute.classList.remove("active");
	} else {
		$video.muted = true;
		$muteUnmute.classList.add("active");
	}
})

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
$video.addEventListener("timeupdate", () => {
	console.log("timeupdate", $video.currentTime)

	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
	$time.innerHTML = formatTime($video.currentTime) + " of " + formatTime($video.duration);

	$progressBar.style.width = ($video.currentTime / $video.duration) * 100 + "%"; 

})







let formatTime = function(s) {
	let m = 0;
	let h = 0;
	s = Math.floor(s);

	while (s >= 60) {
		s -= 60;
		m++;
	}
	while (m >= 60) {
		m -= 60;
		h++;
	}

	s = String(s);
	s = s.padStart(2, "0")

	if (h) {
		m = String(m);
		m = m.padStart(2, "0")
		return h + ":" + m  + ":" + s; 
	} else {
		return m  + ":" + s;
	}
}

