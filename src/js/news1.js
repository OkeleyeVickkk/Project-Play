// fetch("https://spotify81.p.rapidapi.com/top_200_tracks", options)
// 	.then((response) => response.json())
// 	.then((response) => console.log(response))
// 	.catch((err) => console.error(err));

// ?! world news api -> image, 10 per day and so on other important details 50 req/day
// const api = `00a4ef6511074637847bfec1441ecb03`;
// const URL_2 = `https://api.worldnewsapi.com/search-news?api-key=${api}&text=entertainment`;

// const options = {
// 	method: "GET",
// 	header: {
// 		"x-api-key": `${api}`,
// 		"Content-Type": "application/json",
// 	},
// };

// fetch(URL_2, options)
// 	.then((response) => response.json())
// 	.then((result) => console.log(result))
// 	.catch((error) => console.log(error));

// ?! the news api 150 req / day
// const api = `6qunVqSv4fjZdS2vf5BTIiVrP5ksWAUvte0jJ6VC`;
// const URL_2 = `https://api.thenewsapi.com/v1/news/top?locale=us&language=en&api_token=${api}`;

// const options = {
// 	method: "GET",
// 	header: {
// 		"Content-Type": "application/json",
// 	},
// };

// fetch(URL_2, options)
// 	.then((response) => response.json())
// 	.then((result) => console.log(result))
// 	.catch((error) => console.log(error));

// ?! gnews api 100 req / day
// const api = `40fff40b72b4dae0fc8cc694ef057ab4`;
// const URL_2 = `https://gnews.io/api/v4/{endpoint}?token=${api}`;

// const options = {
// 	method: "GET",
// 	header: {
// 		"Content-Type": "application/json",
// 	},
// };

// fetch(URL_2, options)
// 	.then((response) => response.json())
// 	.then((result) => console.log(result))
// 	.catch((error) => console.log(error));

// ?! newsdata -> here no image url, 200 request per day
// const api_3 = `pub_15170d15cdc49c8e7fabb520854386f8621f1`;
// const URL_3 = `https://newsdata.io/api/1/news?apikey=${api_3}&country=us`;

// fetch(URL_3)
// 	.then((response) => response.json())
// 	.then((result) => console.log(result))
// 	.catch((error) => console.log(error));

function pasteSectionOneResults(sectionOneResults) {
	//main function one
	const sectionOne = document.querySelector("section.first");
	const sectionOneMainTemplate = document.getElementById("main-news-template");
	const sectionOneMain = sectionOne.querySelector(".main-news");
	const subNewsTemplate = document.getElementById("sub-template");
	const sectionOneSub = document.querySelector(".sub-news-inner");

	const main = sectionOneResults.slice(0, 1)[0];
	const { title, url, urlToImage, description, author, publishedAt } = main;
	const date = filterDate(publishedAt);
	const newAuthor = filterAuthor(author);

	const MainTemplate = sectionOneMainTemplate.content.cloneNode(true);

	MainTemplate.querySelector("a.news-link").href = url;
	MainTemplate.querySelector(".image-wrapper img.img-fluid").src = urlToImage ?? defaultNewsImage;
	MainTemplate.querySelector(".date small").textContent = date;
	MainTemplate.querySelector(".author small").textContent = `- ${newAuthor ?? "Unknown"}`;
	MainTemplate.querySelector(".middle .news-title").textContent = title;
	MainTemplate.querySelector(".bottom .news-content").textContent = description;

	sectionOneMain.appendChild(MainTemplate); //add to the largest section

	sectionOneResults.slice(1).forEach((result) => {
		const { title, url, urlToImage, description, author, publishedAt } = result;
		const date = filterDate(publishedAt);
		const newAuthor = filterAuthor(author);

		const subTemplate = subNewsTemplate.content.cloneNode(true);

		subTemplate.querySelector("a.news-link").href = url;
		subTemplate.querySelector(".image-wrapper img.img-fluid").src = urlToImage ?? defaultNewsImage;
		subTemplate.querySelector(".date small").textContent = date;
		subTemplate.querySelector(".author small").textContent = `- ${newAuthor ?? "Unknown"}`;
		subTemplate.querySelector(".middle .news-title").textContent = title;
		subTemplate.querySelector(".bottom .news-content").innerHTML = description;

		sectionOneSub.appendChild(subTemplate); //add to screen
	});
}
