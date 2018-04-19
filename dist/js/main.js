'use strict';

var $video = document.querySelector('video'); // ideally, this would be more specific. What if there was more than one video?

document.querySelector('.play-pause').addEventListener('click', function () {
	$video.play();
});
//# sourceMappingURL=main.js.map
