// SHAZAM API -> 16 November, 2022  {subscribed and started using}

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
			tracksWrapper.innerHTML = "";
			const responseResults = response.result.tracks;
			responseResults.forEach((responseResult) => {
				const image = responseResult?.images?.coverarthq ?? responseResult.hub.image;
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
// current news api -> 19th November, 2022
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
// 		// "X-RapidAPI-Key": `${API_KEY}`,
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
// 			const blogItemLink = blogItem.querySelector(".blog-news");
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

function DisplaySearchResult() {}
// const options = {
// 	method: "GET",
// 	headers: {
// 		"X-RapidAPI-Key": "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a",
// 		"X-RapidAPI-Host": "musiclinkssapi.p.rapidapi.com",
// 	},
// };

// fetch("https://musiclinkssapi.p.rapidapi.com/apiSearch/track?query=Blow%20my%20mind", options)
// 	.then((response) => response.json())
// 	.then((response) => console.log(response))
// 	.catch((err) => console.error(err));

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a",
		"X-RapidAPI-Host": "spotify81.p.rapidapi.com",
	},
};

fetch("https://spotify81.p.rapidapi.com/top_200_tracks", options)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));
