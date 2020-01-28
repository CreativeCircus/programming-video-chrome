"use strict";

var videosData = [{
  name: 'City Arial fly over',
  video: 'dist/video/city.mp4',
  thumb: 'dist/img/city.png'
}, {
  name: 'Earth from ISS',
  video: 'dist/video/earth.mp4',
  thumb: 'dist/img/earth.png'
}, {
  name: 'Rain',
  video: 'dist/video/rain.mp4',
  thumb: 'dist/img/rain.png'
}, {
  name: 'VU Meters',
  video: 'dist/video/vu.mp4',
  thumb: 'dist/img/vu.png'
}];
var $video = document.querySelector('video');
var $playPause = document.querySelector('.play-pause');
var $muteUnmute = document.querySelector('.mute-unmute');
var $time = document.querySelector('.time');
var $progressBar = document.querySelector('.progress-bar');
var $fullScreen = document.querySelector('.full-screen');
var $back15 = document.querySelector('.back-15');
var $forward15 = document.querySelector('.forward-15');
var $playlist = document.querySelector('.playlist');
videosData.forEach(function (videoData) {
  var $thumb = document.createElement('img');
  $thumb.src = videoData.thumb;
  $playlist.appendChild($thumb);
  $thumb.addEventListener('click', function () {
    $video.src = videoData.video;
    $video.play();
  });
});

if (!$video.requestFullscreen && !$video.webkitRequestFullscreen) {
  $fullScreen.style.display = "none";
}

$back15.addEventListener("click", function () {
  $video.currentTime -= 15;
});
$forward15.addEventListener("click", function () {
  $video.currentTime += 15;
});
$fullScreen.addEventListener("click", function () {
  if ($video.requestFullscreen) {
    $video.requestFullscreen();
  } else if ($video.webkitRequestFullscreen) {
    $video.webkitRequestFullscreen();
  } else if ($video.mozRequestFullscreen) {
    $video.mozRequestFullscreen();
  } else if ($video.oRequestFullscreen) {
    $video.oRequestFullscreen();
  }
});
$playPause.addEventListener('click', function () {
  if ($video.paused) {
    $video.play();
    $playPause.classList.add("active");
  } else {
    // it must be playing already
    $video.pause();
    $playPause.classList.remove("active");
  }
});
$muteUnmute.addEventListener('click', function () {
  if ($video.muted) {
    $video.muted = false;
    $muteUnmute.classList.remove("active");
  } else {
    $video.muted = true;
    $muteUnmute.classList.add("active");
  }
}); // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events

$video.addEventListener("timeupdate", function () {
  console.log("timeupdate", $video.currentTime); // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

  $time.innerHTML = formatSecondsToTime($video.currentTime) + " of " + formatSecondsToTime($video.duration);
  $progressBar.style.width = $video.currentTime / $video.duration * 100 + "%";
});

var formatSecondsToTime = function formatSecondsToTime(s) {
  var minSegments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ':';
  var m = 0;
  var h = 0;
  var d = 0;
  s = Math.floor(s);

  while (s >= 60) {
    s -= 60;
    m++;
  }

  while (m >= 60) {
    m -= 60;
    h++;
  }

  while (h >= 24) {
    h -= 24;
    d++;
  }

  var tt = [d, h, m, s];
  tt = tt.map(function (seg) {
    return String(seg).padStart(2, '0');
  });

  while (tt[0] === '00' && tt.length > minSegments) {
    tt.shift();
  }

  return tt.join(separator);
}; // console.log( formatSecondsToTime(60*60*24+1) ) 	// 1 day and one second, outputs 1:00:00:01
// console.log( formatSecondsToTime(60*60*24-1) ) 	// 1 day minus one second, outputs 23:59:59 
// console.log( formatSecondsToTime(60*59) ) 		// 59 minutes, outputs 59:00
// console.log( formatSecondsToTime(75) ) 			// 75 seconds, aka 1 minute and 15 seconds, outputs 1:15 
// console.log( formatSecondsToTime(34) ) 			// 34 seconds, outputs 0:34
// console.log( formatSecondsToTime(34, 1) ) 		// 34 seconds, but with a minSegments of 1, outputs 34
// console.log( formatSecondsToTime(34, 3) ) 		// 34 seconds, but with a minSegments of 3, outputs 0:00:34
// console.log( formatSecondsToTime(34, 3) ) 		// 34 seconds, but with a minSegments of 4, outputs 0:00:00:34
// console.log( formatSecondsToTime(34, 3, ';') ) 	// 34 seconds, but with a minSegments of 4, and a separator of ';', outputs 0;00;00;34
//# sourceMappingURL=main.js.map
