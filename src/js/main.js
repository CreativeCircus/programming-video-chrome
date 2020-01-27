let videosData = [{
		name: 'City Arial fly over',
		video: 'dist/video/city.mp4',
		thumb: 'dist/img/city.mp4',
	},
	{
		name: 'Earth from ISS',
		video: 'dist/video/earth.mp4',
		thumb: 'dist/img/earth.mp4',
	},
	{
		name: 'Rain',
		video: 'dist/video/rain.mp4',
		thumb: 'dist/img/rain.mp4',
	},
	{
		name: 'VU Meters',
		video: 'dist/video/vu.mp4',
		thumb: 'dist/img/vu.mp4',
	},
]


let videoElement = document.querySelector('video') // ideally, this would be more specific. What if there was more than one video tag on the page?

document.querySelector('.play-pause').addEventListener('click', function () {
	videoElement.play()
})