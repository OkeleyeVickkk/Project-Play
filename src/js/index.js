// ? SHAZAM API -> 22 December, 2022  {subscribed and started using}

// clone the track item
const container = document.querySelectorAll(".tracks-wrapper")[1];
const cardTemplate = document.querySelector(".card-template");
const tracksWrapper = document.querySelector(".tracks-wrapper#by-country");

const API_KEY = "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a";

//fetch latest trends
function callCountryTracks() {
	const URL = "https://shazam-song-recognizer.p.rapidapi.com/top_country_tracks?country_code=NG&limit=10&start_from=0";
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": `${API_KEY}`,
			"X-RapidAPI-Host": "shazam-song-recognizer.p.rapidapi.com",
		},
	};

	// fetch latest songs in nigeria
	fetch(URL, options)
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			tracksWrapper.innerHTML = "";
			const responseResults = response.result.tracks;
			responseResults.forEach((responseResult) => {
				const image = responseResult?.images?.coverarthq ?? responseResult?.hub?.image;
				const { subtitle, title } = responseResult;
				let trackItem = `<li class="track-item">
										<span class="text-gray-400"></span>
										<div class="_xTcRkP3L">
											<img src="${image}" class="" alt="" />
										</div>
										<div class="_fOBsU46Lz">
											<div class="text-sm has-text">
												<h5 class="track-title">${title}</h5>
											</div>
											<div class="w-80 has-text">
												<h6 class="text-xs track-artistes">${subtitle}</h6>
											</div>
										</div>
									</li>	`;
				tracksWrapper.innerHTML += trackItem;
			});
		})
		.catch((err) => console.error(err));
}

// callCountryTracks();

// ? current news api -> 22nd December, 2022
const blogsWrapper = document.querySelector(".blogs-wrapper");
const newsTemplate = document.querySelector("#news-template");
let clonedTemplate;

for (let i = 0; i < 6; i++) {
	clonedTemplate = newsTemplate.content.cloneNode(true);
	blogsWrapper.append(clonedTemplate);
}

const options = {
	method: "GET",
	headers: {
		// "X-RapidAPI-Key": `${API_KEY}`,
		"X-RapidAPI-Host": "current-news.p.rapidapi.com",
	},
};

fetch("https://current-news.p.rapidapi.com/news/entertainment", options)
	.then((response) => response.json())
	.then((response) => {
		blogsWrapper.innerHTML = "";
		const newsItems = response.news;
		newsItems.splice(0, 10).forEach((newsItem) => {
			const {
				url,
				title,
				urlToImage,
				publishedAt,
				source: { name: sourceName },
			} = newsItem;
			const defaultNewsImage = `https://mir-s3-cdn-cf.behance.net/project_modules/1400/6fe6f228202371.5637141eb4d67.jpg`;
			const image = `<img src="${urlToImage ?? defaultNewsImage}"/>`;
			const date = filterDate(publishedAt);
			const blogItem = newsTemplate.content.cloneNode(true);

			blogItem.querySelector(".blog-image").innerHTML = image;
			blogItem.querySelector("[blog-title]").textContent = title;
			blogItem.querySelector(".blog-news").href = url;
			blogItem.querySelector(".blog-details .source").textContent = `Source: ${sourceName}`;
			blogItem.querySelector(".blog-details .date").textContent = `Date: ${date}`;
			blogsWrapper.append(blogItem);
		});
	})
	.catch((err) => console.error(err));

function filterDate(date) {
	const removeZAlphabet = date.slice(0, -1).split("T");
	return removeZAlphabet;
}

// search result to fetch api data
const searchBar = document.querySelector(".search-bar-control");
searchBar.addEventListener("submit", function (e) {
	e.preventDefault();
	let inputValue = document.querySelector(".search-bar-control .form-control").value.toLowerCase();
	const originalInput = document.querySelector(".search-bar-control .form-control").value;
	const resultBoard = document.getElementById("search-result");
	const ul = document.querySelector("#search-result ul.ul");
	const h1 = document.createElement("h1");
	h1.className = "text-lg text-gray-300 mb-8";
	const text = `Results for "<i>${originalInput}</i>"</h1>`;
	h1.innerHTML = text;
	resultBoard.insertBefore(h1, ul);

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": `${API_KEY}`,
			"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
		},
	};
	fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${inputValue}`, options)
		.then((response) => response.json())
		.then((response) => {
			const trackTemplate = document.getElementById("track-template");
			const otherContent = document.getElementById("sub-content");
			otherContent.innerHTML = "";
			ul.innerHTML = "";
			const results = response.response.hits;
			results.forEach((result) => {
				const clonedTrackTemplate = trackTemplate.content.cloneNode(true);
				const {
					artist_names,
					full_title,
					id,
					primary_artist: { api_path },
					title,
					stats: { pageviews },
				} = result.result;

				const artist_id = getArtistId(api_path);

				clonedTrackTemplate.querySelector("h2.searched-data").textContent = full_title;
				clonedTrackTemplate.querySelector("a.track-element").href = `./artist.html?artist_id=${artist_id}`;

				const trackItemLyricsButton = clonedTrackTemplate.querySelector("button.track-element");
				fetchLyrics(id)
					.then((response) => {
						trackItemLyricsButton.setAttribute("data-modal-toggle", `staticModal large-modal track-${id}`);
						trackItemLyricsButton.setAttribute("lyrics", response);
					})
					.catch((error) => {});

				ul.appendChild(clonedTrackTemplate);
			});
			// ? OPTION ONE OF FETCHING LYRICS (MODAL - DOESN'T WORK)
			// const listItems = resultBoard.querySelectorAll(".searched-track");
			// const modal = document.querySelector(".lyrics-modal");
			// const modalContent = modal.querySelector(".lyrics-content p");
			// modal.setAttribute("id", `staticModal large-modal track-${id}`);
			// listItems.forEach((listItem) => {
			// 	const listItembutton = listItem.querySelector("button.track-element");
			// 	listItembutton.addEventListener("click", function (e) {
			// 		e.stopPropagation();
			// 		let lyricContent = e.target.getAttribute("lyrics");
			// 		modalContent.innerText = `${lyricContent ?? "No lyrics found"}`;
			// 	});
			// });

			// ? OPTION TWO OF FETCHING LYRICS (MODAL - DOESN'T WORK)
			// const listItemsButtons = resultBoard.querySelectorAll(".searched-track button.track-element");
			// modal.setAttribute("id", `staticModal large-modal track-${id}`);
			// listItemsButtons.forEach((button) => {
			// 	button.addEventListener("click", function (e) {
			// 		e.stopPropagation();
			// 		let lyricContent = e.target.getAttribute("lyrics");
			// 		modalContent.textContent = `${lyricContent ?? "No lyrics found"}`;
			// 	});
			// });
		})
		.catch((err) => console.error(err));
});

function getArtistId(api_path) {
	return api_path.split("/artists/")[1];
}

async function fetchLyrics(id) {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": `${API_KEY}`,
			"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
		},
	};

	return fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/${id}/lyrics`, options)
		.then((response) => response.json())
		.then((response) => response.response.lyrics.lyrics.body.html ?? "No lyrics available");
}

// ? OPTION THREE OF FETCHING LYRICS (IT WORKS)
// const searchBar = document.querySelector(".search-bar-control");
// searchBar.addEventListener("submit", function (e) {
// 	e.preventDefault();
// 	let inputValue = document.querySelector(".search-bar-control .form-control").value.toLowerCase();

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
// 	const trackTemplate = document.getElementById("track-template");
// 	const resultBoard = document.getElementById("search-result");
// 	const otherContent = document.getElementById("sub-content");

// 	fetch(`https://powerlyrics.p.rapidapi.com/getlyricsfromtitleandartist?title=${song_name}&artist=${artist_name}`, options)
// 		.then((response) => {
// 			if (!response.ok) {
// 				throw "Victor's API Limit has been reached for today";
// 			}
// 			return response.json();
// 		})
// 		.then((response) => {
// 			otherContent.innerHTML = "";
// 			resultBoard.innerHTML = "";
// 			const lyrics = response.lyrics;
// 			resultBoard.textContent = lyrics;
// 		})
// 		.catch((err) => {
// 			otherContent.innerHTML = "";
// 			resultBoard.innerHTML = "";
// 			const errorImage = `<img src="${image[0].src}" class="w-1/2 mx-auto"/>`;
// 			const h2 = document.createElement("h2");
// 			h2.className = "text-white text-lg text-center font-bold";
// 			h2.innerText = err;
// 			resultBoard.innerHTML = errorImage;
// 			resultBoard.append(h2);
// 		});
// });

// const image = [
// 	{
// 		src: "src/images/logo-lg-variant-2.png",
// 	},
// ];
