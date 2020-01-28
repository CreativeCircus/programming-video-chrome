let videosData = [{
		name: 'City Arial fly over',
		video: 'dist/video/city.mp4',
		thumb: 'dist/img/city.png',
	},
	{
		name: 'Earth from ISS',
		video: 'dist/video/earth.mp4',
		thumb: 'dist/img/earth.png',
	},
	{
		name: 'Rain',
		video: 'dist/video/rain.mp4',
		thumb: 'dist/img/rain.png',
	},
	{
		name: 'VU Meters',
		video: 'dist/video/vu.mp4',
		thumb: 'dist/img/vu.png',
	},
]

let $video = document.querySelector('video')
let $playPause = document.querySelector('.play-pause')
let $muteUnmute = document.querySelector('.mute-unmute')
let $time = document.querySelector('.time')
let $progressBar = document.querySelector('.progress-bar')
let $fullScreen = document.querySelector('.full-screen')
let $back15 = document.querySelector('.back-15')
let $forward15 = document.querySelector('.forward-15')
let $playlist = document.querySelector('.playlist')

videosData.forEach((videoData) => {
	let $thumb = document.createElement('img')
	$thumb.src = videoData.thumb
	$playlist.appendChild($thumb)
	$thumb.addEventListener('click', () => {
		$video.src = videoData.video
		$video.play()
	})
})


if (!$video.requestFullscreen && !$video.webkitRequestFullscreen) {
	$fullScreen.style.display = "none"
}
$back15.addEventListener("click", () => {
	$video.currentTime -= 15
})
$forward15.addEventListener("click", () => {
	$video.currentTime += 15
})

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
		$video.play()
		$playPause.classList.add("active")
	} else { // it must be playing already
		$video.pause()
		$playPause.classList.remove("active")
	}
})


$muteUnmute.addEventListener('click', () => {
	if ($video.muted) {
		$video.muted = false
		$muteUnmute.classList.remove("active")
	} else {
		$video.muted = true
		$muteUnmute.classList.add("active")
	}
})

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
$video.addEventListener("timeupdate", () => {
	console.log("timeupdate", $video.currentTime)

	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
	$time.innerHTML = formatSecondsToTime($video.currentTime) + " of " + formatSecondsToTime($video.duration)

	$progressBar.style.width = ($video.currentTime / $video.duration) * 100 + "%"

})







let formatSecondsToTime = function (s, minSegments = 2, separator = ':') {
	let m = 0
	let h = 0
	let d = 0
	s = Math.floor(s)

	while (s >= 60) {
		s -= 60
		m++
	}
	while (m >= 60) {
		m -= 60
		h++
	}
	while (h >= 24) {
		h -= 24
		d++
	}

	let tt = [d, h, m, s]
	tt = tt.map(seg => String(seg).padStart(2, '0'))
	while (tt[0] === '00' && tt.length > minSegments) tt.shift()
	
	return tt.join(separator)
}

// console.log( formatSecondsToTime(60*60*24+1) ) 	// 1 day and one second, outputs 1:00:00:01
// console.log( formatSecondsToTime(60*60*24-1) ) 	// 1 day minus one second, outputs 23:59:59 
// console.log( formatSecondsToTime(60*59) ) 		// 59 minutes, outputs 59:00
// console.log( formatSecondsToTime(75) ) 			// 75 seconds, aka 1 minute and 15 seconds, outputs 1:15 
// console.log( formatSecondsToTime(34) ) 			// 34 seconds, outputs 0:34
// console.log( formatSecondsToTime(34, 1) ) 		// 34 seconds, but with a minSegments of 1, outputs 34
// console.log( formatSecondsToTime(34, 3) ) 		// 34 seconds, but with a minSegments of 3, outputs 0:00:34
// console.log( formatSecondsToTime(34, 3) ) 		// 34 seconds, but with a minSegments of 4, outputs 0:00:00:34
// console.log( formatSecondsToTime(34, 3, ';') ) 	// 34 seconds, but with a minSegments of 4, and a separator of ';', outputs 0;00;00;34