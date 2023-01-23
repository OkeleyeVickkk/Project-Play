const container = document.querySelectorAll(".tracks-wrapper")[1];
const cardTemplate = document.querySelector(".card-template");

const API_KEY = "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a"; //rapidapi key

const URL = "https://shazam-song-recognizer.p.rapidapi.com/top_country_tracks?country_code=NG&limit=10&start_from=0";
const options_one = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": `${API_KEY}`,
		"X-RapidAPI-Host": "shazam-song-recognizer.p.rapidapi.com",
	},
};

// fetch latest songs in nigeria
// fetch(URL, options_one)
// 	.then((response) => response.json())
// 	.then((response) => {
// 		const responseResults = response.result.tracks;
// 		console.log(responseResults);
// 		const trackItemTemplate = document.getElementById("track-item-template");
// 		const trackItemsWrapper = document.getElementById("by-country");
// 		trackItemsWrapper.innerHTML = "";
// 		responseResults.forEach((responseResult) => {
// 			const image = responseResult?.images?.coverarthq ?? responseResult?.images?.coverart ?? responseResult?.images?.background;
// 			const { subtitle, title } = responseResult;

// 			const trackTemplate = trackItemTemplate.content.cloneNode(true);

// 			trackTemplate.querySelector("._xTcRkP3L img").src = image;
// 			trackTemplate.querySelector("._fOBsU46Lz h5.track-title").innerHTML = title;
// 			trackTemplate.querySelector("._fOBsU46Lz h6.track-artistes").innerHTML = subtitle;

// 			trackItemsWrapper.appendChild(trackTemplate); //paste to screen
// 		});
// 	})
// 	.catch((err) => console.error(err));

const blogsWrapper = document.querySelector(".blogs-wrapper");
const newsTemplate = document.querySelector("#news-template");
let clonedTemplate;

for (let i = 0; i < 10; i++) {
	clonedTemplate = newsTemplate.content.cloneNode(true);
	blogsWrapper.append(clonedTemplate);
}

const api = `00a4ef6511074637847bfec1441ecb03`; //worldnews api key
const URL_2 = `https://api.worldnewsapi.com/search-news?api-key=${api}&text=entertainment`;

const options_two = {
	method: "GET",
	header: {
		"Content-Type": "application/json",
	},
};

fetch(URL_2, options_two)
	.then((response) => {
		if (!response.ok) {
			throw "Error";
		}
		return response.json();
	})
	.then((response) => {
		blogsWrapper.innerHTML = "";
		const newsItems = response.news;
		newsItems.splice(0).forEach((newsItem) => {
			const { url, title, image, publish_date, author } = newsItem;
			const defaultNewsImage = `https://mir-s3-cdn-cf.behance.net/project_modules/1400/6fe6f228202371.5637141eb4d67.jpg`;
			const date = filterDate(publish_date);
			const blogItem = newsTemplate.content.cloneNode(true);

			blogItem.querySelector(".blog-image").innerHTML = `<img src="${image ?? defaultNewsImage}"/>`;
			blogItem.querySelector("[blog-title]").textContent = title;
			blogItem.querySelector(".blog-news").href = url;
			blogItem.querySelector(".blog-details .source").textContent = author;
			blogItem.querySelector(".blog-details .date").textContent = date;
			blogsWrapper.append(blogItem);
		});
	})
	.catch((err) => console.error(err));

function filterDate(date) {
	const newDate = date.split(" ")[0].split("-");
	const [year, month, day] = [newDate[0], newDate[1], newDate[2]];
	return `${day}-${month}-${year}`;
}
