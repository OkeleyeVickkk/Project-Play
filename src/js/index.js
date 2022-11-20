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

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": `${API_KEY}`,
		"X-RapidAPI-Host": "current-news.p.rapidapi.com",
	},
};

fetch("https://current-news.p.rapidapi.com/news/entertainment", options)
	.then((response) => response.json())
	.then((response) => {
		blogsWrapper.innerHTML = "";
		const newsItems = response.news;
		newsItems.forEach((newsItem) => {
			const {
				title,
				urlToImage,
				publishedAt,
				source: { name: sourceName },
			} = newsItem;
			console.log(newsItem);
			const image = `<img src="${urlToImage}"/>`;
			const blogItem = newsTemplate.content.cloneNode(true);
			const blogImageWrapper = blogItem.querySelector(".blog-image");
			blogImageWrapper.innerHTML = image;
			blogItem.querySelector("[blog-title]").textContent = title;
			blogItem.querySelector(".blog-details .source").textContent = sourceName;
			blogItem.querySelector(".blog-details .date").textContent = publishedAt;

			blogsWrapper.append(blogItem);
		});
	})
	.catch((err) => console.error(err));
