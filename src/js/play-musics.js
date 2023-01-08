window.addEventListener("DOMContentLoaded", function () {
	// control doms
	const playPause_button = document.getElementById("play-pause");
	const next_button = document.getElementById("next");
	const prev_button = document.getElementById("prev");
	const stop_button = document.getElementById("stop");
	const audio_element = document.getElementById("audio");

	// song doms
	const artists = document.querySelector(".song-artist h5");
	const song_title = document.querySelector(".song-title h3");
	const cover_photo = document.querySelector(".song-cover-photo img");

	let current_song_index, next_song_index;

	const songs = [
		{
			song_path: "/src/folder/Peace Be Unto You (PBUY).mp3",
			artist: "Asake",
			title: "PBUY",
			coverPhoto: "https://trendybeatz.com/images/Asake-Peace-Be-Unto-You-PBUY-Artwork.jpeg",
		},
		{
			song_path: "/src/folder/Passenger Coins In A Fountain (Official Album Audio).mp3",
			artist: "Passenger",
			title: "Coins In A Fountain",
			coverPhoto: "https://i.ytimg.com/vi/-yDWjtrgkb0/maxresdefault.jpg",
		},
		{
			song_path: "/src/folder/Shakira - Hips Don t Lie (Official 4K Video) ft. Wyclef Jean.mp3",
			artist: "Shakira Ft Wyclef Jean",
			title: "Hips Don't Lie",
			coverPhoto: "https://4.bp.blogspot.com/-QbxSRkaaYhc/UVcHk_uaeEI/AAAAAAAALw8/081rF0_Q9P4/s1600/ShakiraHipsDontLie.jpg",
		},
		{
			song_path: "/src/folder/MichaelJackson-BillieJean.mp3",
			artist: "Michael Jackson",
			title: "Billie Jean",
			coverPhoto: "https://i.ytimg.com/vi/OuGUJrfdpdM/maxresdefault.jpg",
		},
		{
			song_path: "/src/folder/Rag n Bone Man - Human (Official Video).mp3",
			artist: "Rag n Bone Man",
			title: "Human",
			coverPhoto: "https://static.billboard.com/files/media/Rag-n-Bone-Man-Human-vid-still-2017-billboard-1548-compressed.jpg",
		},
	];

	playPause_button.addEventListener("click", playPause);
	stop_button.addEventListener("click", stopPlayer);
	initializePlay(); //default when the page loads

	function initializePlay() {
		current_song_index = 0;
		next_song_index = current_song_index + 1;

		updatePlayer();
	}

	function updatePlayer() {
		const song = songs[current_song_index];

		artists.innerHTML = song.artist;
		song_title.innerHTML = song.title;
		cover_photo.src = song.coverPhoto;
		audio_element.src = song.song_path;
	}

	function playPause(e) {
		e.stopPropagation();
		if (audio_element.pause) {
			audio_element.play();
		} else {
			audio_element.pause();
		}
		// audio_element.pause ? audio_element.play() : audio_element.pause();
	}

	function stopPlayer() {
		if (audio_element.pause || audio_element.play) {
			audio_element.pause();
			audio_element.currentTime = 0;
		}
	}
});
