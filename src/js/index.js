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

// const options = {
// 	method: "GET",
// 	headers: {
// 		"X-RapidAPI-Key": `${API_KEY}`,
// 		"X-RapidAPI-Host": "current-news.p.rapidapi.com",
// 	},
// };

// fetch("https://current-news.p.rapidapi.com/news/entertainment", options)
// 	.then((response) => response.json())
// 	.then((response) => {
// 		blogsWrapper.innerHTML = "";
// 		const newsItems = response.news;
// 		newsItems.splice(0, 10).forEach((newsItem) => {
// 			const {
// 				url,
// 				title,
// 				urlToImage,
// 				publishedAt,
// 				source: { name: sourceName },
// 			} = newsItem;
// 			const defaultNewsImage = `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VbimIjk9epElk6OUBCwM5AHaEK%26pid%3DApi&f=1&ipt=97a96898c8ee0dbeabd90b4490cbb834c040dfa2b4d6d706bb49d39c19f22429&ipo=images`;
// 			const image = `<img src="${urlToImage ?? defaultNewsImage}"/>`;
// 			const blogItem = newsTemplate.content.cloneNode(true);

// 			const blogImageWrapper = blogItem.querySelector(".blog-image");
// 			const blogItemLink = blognItem.querySelector(".blog-news");
// 			const blogItemTitle = blogItem.querySelector("[blog-title]");
// 			const blogItemSource = blogItem.querySelector(".blog-details .source");
// 			const blogReleaseDate = blogItem.querySelector(".blog-details .date");

// 			blogImageWrapper.innerHTML = image;
// 			blogItemTitle.textContent = title;
// 			blogItemLink.href = url;
// 			blogItemSource.textContent = `Source: ${sourceName}`;
// 			const [date] = filterDate(publishedAt);
// 			blogReleaseDate.textContent = `Date: ${date}`;
// 			blogsWrapper.append(blogItem);
// 		});
// 	})
// 	.catch((err) => console.error(err));

// function filterDate(date) {
// 	const removeZAlphabet = date.slice(0, -1).split("T");
// 	return removeZAlphabet;
// }

// search result to fetch api data
// const searchBar = document.querySelector(".search-bar-control");
// searchBar.addEventListener("submit", function (e) {
// 	e.preventDefault();
// 	let inputValue = document.querySelector(".search-bar-control .form-control").value.toLowerCase();

// 	const options = {
// 		method: "GET",
// 		headers: {
// 			// "X-RapidAPI-Key": `${API_KEY}`,
// 			"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
// 		},
// 	};
// 	fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${inputValue}`, options)
// 		.then((response) => response.json())
// 		.then((response) => {
// 			const trackTemplate = document.getElementById("track-template");
// 			const resultBoard = document.getElementById("search-result");
// 			const otherContent = document.getElementById("sub-content");
// 			let clonedTrackTemplate;
// 			otherContent.innerHTML = "";
// 			resultBoard.innerHTML = "";
// 			const results = response.response.hits;
// 			results.forEach((result) => {
// 				clonedTrackTemplate = trackTemplate.content.cloneNode(true);
// 				const {
// 					artist_names,
// 					full_title,
// 					id,
// 					lyrics_owner_id,
// 					path,
// 					title,
// 					stats: { pageviews },
// 				} = result.result;

// 				clonedTrackTemplate.querySelector("h2.searched-data").textContent = full_title;
// 				const trackItemLyricsButton = clonedTrackTemplate.querySelector("button.track-element");
// 				// !test drive
// 				const result = fetchLyrics(id)
// 					.then((response) => response) //* something missing here
// 					.then((data) => {
// 						const trackItemLyrics = data;
// 						trackItemLyricsButton.setAttribute("lyrics", trackItemLyrics);
// 					})
// 					.catch((error) => console.log(error));
// 				resultBoard.appendChild(clonedTrackTemplate);

// 				// ! original
// 				fetchLyrics(id)
// 					.then((response) => response) //* something missing here
// 					.then((data) => {
// 						const trackItemLyrics = data;
// 						trackItemLyricsButton.setAttribute("lyrics", trackItemLyrics);
// 					})
// 					.catch((error) => console.log(error));
// 				resultBoard.appendChild(clonedTrackTemplate);
// 			});
// const listItems = resultBoard.querySelectorAll(".searched-track");
// listItems.forEach((listItem) => {
// 	const listItembutton = listItem.querySelector("button.track-element");
// 	listItembutton.addEventListener("click", function (e) {
// 		const modal = document.querySelector(".lyrics-modal");
// 		const modalContent = modal.querySelector(".lyrics-content p");
// 		const lyricContent = this.getAttribute("lyrics");
// 		modalContent.innerHTML = lyricContent;
// 	});
// });
// 		})
// 		.catch((err) => console.error(err));
// });

// function fetchLyrics(id) {
// 	const options = {
// 		method: "GET",
// 		headers: {
// 			"X-RapidAPI-Key": `${API_KEY}`,
// 			"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
// 		},
// 	};

// 	return fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/${id}/lyrics`, options)
// 		.then((response) => response.json())
// 		.then((response) => response.response.lyrics.lyrics.body.html);
// }

// power lyrics

const searchBar = document.querySelector(".search-bar-control");
searchBar.addEventListener("submit", function (e) {
	e.preventDefault();
	let inputValue = document.querySelector(".search-bar-control .form-control").value.toLowerCase();

	const searchSplit = inputValue.split("by");
	const song_name = searchSplit[0];
	const artist_name = searchSplit[1];

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": `${API_KEY}`,
			"X-RapidAPI-Host": "powerlyrics.p.rapidapi.com",
		},
	};
	const trackTemplate = document.getElementById("track-template");
	const resultBoard = document.getElementById("search-result");
	const otherContent = document.getElementById("sub-content");

	fetch(`https://powerlyrics.p.rapidapi.com/getlyricsfromtitleandartist?title=${song_name}&artist=${artist_name}`, options)
		.then((response) => {
			if (!response.ok) {
				throw "Victor's API Limit has been reached for today";
			}
			return response.json();
		})
		.then((response) => {
			otherContent.innerHTML = "";
			resultBoard.innerHTML = "";
			const lyrics = response.lyrics;

			console.log(lyrics);
			resultBoard.textContent = lyrics;
		})
		.catch((err) => {
			otherContent.innerHTML = "";
			resultBoard.innerHTML = "";
			const errorImage = `<img src="${image[0].src}" class="w-1/2 mx-auto"/>`;
			const h2 = document.createElement("h2");
			h2.className = "text-white text-lg text-center font-bold";
			h2.innerText = err;
			resultBoard.innerHTML = errorImage;
			resultBoard.append(h2);
		});
});

const image = [
	{
		src: "src/images/logo-lg-variant-2.png",
	},
];

console.log(image[0].src);
