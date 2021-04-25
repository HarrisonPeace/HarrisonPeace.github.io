let videoContainer = document.createElement('DIV');
	videoContainer.className = "video-container";

if (window.innerWidth < 768) {
	videoContainer.innerHTML = `
		<video poster="images/loading-mobile.png" playsinline id="mobile-profile-video" class="profile-video" muted>
			<source src="video/profile-video-mobile-reduced.mp4" type="video/mp4">
			 Your browser does not support HTML5 video.
         </video>
	`;
} else {
	videoContainer.innerHTML = `
         <video poster="images/loading.png" playsinline id="profile-video" class="profile-video" muted>
			<source src="video/profile-video.mp4" type="video/mp4">
			 Your browser does not support HTML5 video.
         </video>
	`;
}

document.body.appendChild(videoContainer);