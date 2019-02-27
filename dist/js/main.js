
let $video = document.querySelector('video'); // ideally, this would be more specific. What if there was more than one video tag on the page?

document.querySelector('.play-pause').addEventListener('click', function () {
	$video.play();
});
//# sourceMappingURL=main.js.map
