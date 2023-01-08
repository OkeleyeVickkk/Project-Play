window.addEventListener("DOMContentLoaded", function () {
	// control doms
	const playPause_button = document.getElementById("play-pause");
	const next_button = document.getElementById("next");
	const prev_button = document.getElementById("prev");
	const stop_button = document.getElementById("stop");
	const audio_element = document.getElementById("audio");

	console.log(playPause_button);

	// song doms
	const artists = document.querySelector(".song-artist h5");
	const song_title = document.querySelector(".song-title h3");
	const cover_photo = document.querySelector(".song-cover-photo img");

	let current_song_index, next_song_index;

	const songs = [
		{
			song_path: "/src/folder/Rag n Bone Man - Human (Official Video).mp3",
			artist: "Rag n Bone Man",
			title: "Human",
		},
		{
			song_path: "/src/folder/MichaelJackson-BillieJean.mp3",
			artist: "Michael Jackson",
			title: "Billie Jean",
		},
		{
			song_path: "/src/folder/Passenger Coins In A Fountain (Official Album Audio).mp3",
			artist: "Passenger",
			title: "Coins In A Fountain",
		},
		{
			song_path: "/src/folder/Peace Be Unto You (PBUY).mp3",
			artist: "Asake",
			title: "PBUY",
		},
		{
			song_path: "/src/folder/Shakira - Hips Don t Lie (Official 4K Video) ft. Wyclef Jean.mp3",
			artist: "Shakira Ft Wyclef Jean",
			title: "Hips Don't Lie",
		},
	];

	playPause_button.addEventListener("click", playPause);
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
		audio_element.src = song.song_path;
	}

	function playPause() {
		if (audio_element.pause) {
			audio_element.play();
		} else {
			audio_element.play();
		}
	}
});
