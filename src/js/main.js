
let $video = document.querySelector('video'); // ideally, this would be more specific. What if there was more than one video?

document.querySelector('.play-pause').addEventListener('click', () => {
	$video.play()
})