const API_KEY = "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a";

// <============ search result to fetch api data ===========>
const searchBar = document.querySelector(".search-bar-control");
searchBar.addEventListener("submit", function (e) {
	e.preventDefault();
	let inputValue = document.querySelector(".search-bar-control .form-control").value.toLowerCase();
	const originalInput = document.querySelector(".search-bar-control .form-control").value;
	const resultBoard = document.getElementById("search-result");
	const ul = document.querySelector("#search-result > ul");
	const h1 = document.createElement("h1");
	h1.className = "text-lg text-gray-300 mb-8";
	const text = `Results for " <i>${originalInput}</i> &nbsp"</h1>`;
	h1.innerHTML = text;

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": `${API_KEY}`,
			"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
		},
	};
	fetch(`https://genius-song-lyrics1.p.rapidapi.com/search/?q=${inputValue}`, options)
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			const trackTemplate = document.getElementById("track-template");
			ul.innerHTML = "";
			resultBoard.insertBefore(h1, ul);
			const results = response?.hits;
			results.forEach((result) => {
				const clonedTrackTemplate = trackTemplate.content.cloneNode(true);
				const {
					artist_names,
					title,
					id, // id of the song
				} = result.result;

				const artist_id = result.result.primary_artist.id; //id of the artiste

				clonedTrackTemplate.querySelector(".track-name span").innerHTML = title;
				clonedTrackTemplate.querySelector("a.track-element").href = `./artist.html?artist_id=${artist_id}`;
				clonedTrackTemplate.querySelector("span.artistes").innerHTML = artist_names;
				const trackItemLyricsButton = clonedTrackTemplate.querySelector("button.track-element");
				fetchLyrics(id)
					.then((lyrics) => {
						trackItemLyricsButton.setAttribute("data-modal-toggle", `staticModal large-modal track-${id}`);
						trackItemLyricsButton.setAttribute("lyrics", lyrics);
					})
					.catch((error) => {});

				ul.appendChild(clonedTrackTemplate);
			});
		})
		.catch((err) => console.error(err));
});

async function fetchLyrics(id) {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": `${API_KEY}`,
			"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
		},
	};

	const response = await fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/lyrics/?${id}`, options);
	const data = (await response.json()) ?? "No lyrics available for this song";
	return data?.response?.lyrics?.lyrics?.body?.html; //return either result or error
}

function showLyrics() {
	// get the buttons for each displayed output
	// onclick, display the lyrics in the modal that gets triggered
}

// ? OPTION THREE OF FETCHING LYRICS (IT WORKS)
// const searchBar = document.querySelector(".search-bar-control");
// searchBar.addEventListener("submit", function (e) {
// 	e.preventDefault();
// 	let inputValue = document.querySelector(".search-bar-control .form-control").value.toLowerCase();
// 	const originalInput = document.querySelector(".search-bar-control .form-control").value;
// 	const ul = document.querySelector("#search-result > ul");
// 	const h1 = document.createElement("h1");
// 	h1.className = "text-lg text-gray-300 mb-8";
// 	const text = `Results for " <i>${originalInput}</i> "</h1>`;

// 	const searchSplit = inputValue.split("by");
// 	const song_name = searchSplit[0];
// 	const artist_name = searchSplit[1];

// 	const options = {
// 		method: "GET",
// 		headers: {
// 			"X-RapidAPI-Key": `${API_KEY}`,
// 			"X-RapidAPI-Host": "powerlyrics.p.rapidapi.com",
// 		},
// 	};
// 	const resultBoard = document.getElementById("search-result");

// 	fetch(`https://powerlyrics.p.rapidapi.com/getlyricsfromtitleandartist?title=${song_name}&artist=${artist_name}`, options)
// 		.then((response) => {
// 			h1.textContent = text;
// 			if (!response.ok) {
// 				throw "Victor's API Limit has been reached for today";
// 			}
// 			return response.json();
// 		})
// 		.then((response) => {
// 			resultBoard.innerHTML = "";
// 			resultBoard.insertBefore(h1, ul);
// 			const lyrics = response.lyrics;
// 			ul.textContent = lyrics;
// 		})
// 		.catch((err) => {
// 			const errorImage = `<img src="${image[0].src}" class="w-1/2 mx-auto"/>`;
// 			const h2 = document.createElement("h2");
// 			h2.className = "text-white text-lg text-center font-bold";
// 			h2.innerText = err;
// 			ul.innerHTML = errorImage;
// 			ul.append(h2);
// 		});
// });

// const image = [
// 	{
// 		src: "./../src/images/logo-lg-variant-2.png",
// 	},
// ];
