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

  $time.innerHTML = formatTime($video.currentTime) + " of " + formatTime($video.duration);
  $progressBar.style.width = $video.currentTime / $video.duration * 100 + "%";
});

var formatTime = function formatTime(s) {
  var m = 0;
  var h = 0;
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
  s = s.padStart(2, "0");

  if (h) {
    m = String(m);
    m = m.padStart(2, "0");
    return h + ":" + m + ":" + s;
  } else {
    return m + ":" + s;
  }
};
//# sourceMappingURL=main.js.map
