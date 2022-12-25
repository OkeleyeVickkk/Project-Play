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
			// "X-RapidAPI-Key": `${API_KEY}`,
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
const searchBar = document.querySelector(".search-bar-control");
searchBar.addEventListener("submit", function (e) {
	e.preventDefault();
	let inputValue = document.querySelector(".search-bar-control .form-control").value.toLowerCase();

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
			const resultBoard = document.getElementById("search-result");
			const otherContent = document.getElementById("sub-content");
			otherContent.innerHTML = "";
			resultBoard.innerHTML = "";
			const results = response.response.hits;
			results.forEach((result) => {
				const {
					artist_names,
					full_title,
					id,
					lyrics_owner_id,
					path,
					title,
					stats: { pageviews },
				} = result.result;
				const item = ` 
			<li class="searched-track">
				<div class="top">
					<h2 class="searched-data text-gray-300 font-bold">${full_title}</h2>
					<div class="mt-4 flex align-center text-sm text-gray-300">
						Listens: &nbsp;<span class="listened text-sm"> 113k</span>
					</div>
				</div>
				<div class="bottom">
					<a href="" class="track-element flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-5"
							preserveAspectRatio="xMidYMid meet"
							viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M11 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c1.1 0 2.66.23 4.11.69c-.61.38-1.11.91-1.5 1.54c-.82-.2-1.72-.33-2.61-.33c-2.97 0-6.1 1.46-6.1 2.1v1.1h8.14c.09.7.34 1.34.72 1.9H3v-3c0-2.66 5.33-4 8-4m7.5-3H22v2h-2v5.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5c.36 0 .69.07 1 .21V10Z" />
						</svg>
						See artist</a
					>
					<button class="flex items-center track-element" type="button" data-modal-toggle="track-${id} large-modal">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-5"
							preserveAspectRatio="xMidYMid meet"
							viewBox="0 0 24 24">
							<path fill="currentColor" d="M6 6h7v2H6zm0 6h4v2H6z" />
							<path
								fill="currentColor"
								d="M15 11.97V16H6l-2 2V4h11v2.03c.52-.69 1.2-1.25 2-1.6V4c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h9c1.1 0 2-.9 2-2v-2.42a5.16 5.16 0 0 1-2-1.61z" />
							<path
								fill="currentColor"
								d="M6 9h7v2H6zm14-2.82c-.31-.11-.65-.18-1-.18c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3V3h2V1h-4v5.18z" />
						</svg>
						See lyrics
					</button>
				</div>
			</li>`;
				resultBoard.innerHTML += item;
			});
			const listItems = resultBoard.querySelectorAll(".searched-track");
			listItems.forEach((listItem) => {
				const listItembutton = listItem.querySelector("button.track-element");
				listItembutton.addEventListener("click", function () {
					const modal = document.querySelector(".lyrics-modal");
					console.log(this.getAttribute("data-modal-toggle"));
				});
			});
		})
		.catch((err) => console.error(err));
});
