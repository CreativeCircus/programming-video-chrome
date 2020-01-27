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


let videoElement = document.querySelector('video') // ideally, this would be more specific. What if there was more than one video tag on the page?

document.querySelector('.play-pause').addEventListener('click', function () {
	videoElement.play()
})