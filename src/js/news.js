document.addEventListener("DOMContentLoaded", function () {
	// const options = {
	// 	method: "GET",
	// 	headers: {
	// 		"X-RapidAPI-Key": "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a",
	// 		"X-RapidAPI-Host": "spotify81.p.rapidapi.com",
	// 	},
	// };

	// fetch("https://spotify81.p.rapidapi.com/top_200_tracks", options)
	// 	.then((response) => response.json())
	// 	.then((response) => console.log(response))
	// 	.catch((err) => console.error(err));

	const defaultNewsImage = `https://mir-s3-cdn-cf.behance.net/project_modules/1400/6fe6f228202371.5637141eb4d67.jpg`;

	const API_ONE = `6qunVqSv4fjZdS2vf5BTIiVrP5ksWAUvte0jJ6VC`;
	const URL_ONE = `https://api.thenewsapi.com/v1/news/top?locale=us,ca&language=en&api_token=${API_ONE}`;

	const OPTIONS_ONE = {
		method: "GET",
		header: {
			"Content-Type": "application/json",
		},
	};

	fetch(URL_ONE, OPTIONS_ONE)
		.then((response) => response.json())
		.then((results) => {
			console.log(results);
			pasteSectionOneResults(results.data);
		})
		.catch((error) => console.log(error));

	function pasteSectionOneResults(results) {
		//main function one
		const sectionOne = document.querySelector("section.first");
		const sectionOneMainTemplate = document.getElementById("main-news-template");
		const sectionOneMain = sectionOne.querySelector(".main-news");
		const subNewsTemplate = document.getElementById("sub-template");
		const sectionOneSub = document.querySelector(".sub-news-inner");

		const main = results.slice(0, 3);
		const { title, url, image_url, description, source, published_at } = main[0];
		const date = filterDate(published_at);

		const MainTemplate = sectionOneMainTemplate.content.cloneNode(true);

		MainTemplate.querySelector("a.news-link").href = url;
		MainTemplate.querySelector(".image-wrapper img.img-fluid").src = image_url ?? defaultNewsImage;
		MainTemplate.querySelector(".date small").textContent = date;
		MainTemplate.querySelector(".author small").textContent = `Source - ${source ?? "Unknown"}`;
		MainTemplate.querySelector(".middle .news-title").textContent = title;
		MainTemplate.querySelector(".bottom .news-content").textContent = description;

		sectionOneMain.appendChild(MainTemplate); //add to the largest section

		results.slice(1, 3).forEach((result) => {
			const { title, url, image_url, description, source, published_at } = result;
			const date = filterDate(published_at);

			const subTemplate = subNewsTemplate.content.cloneNode(true);

			subTemplate.querySelector("a.news-link").href = url;
			subTemplate.querySelector(".image-wrapper img.img-fluid").src = image_url ?? defaultNewsImage;
			subTemplate.querySelector(".date small").textContent = date;
			subTemplate.querySelector(".author small").textContent = `Source - ${source ?? "Unknown"}`;
			subTemplate.querySelector(".middle .news-title").textContent = title;
			subTemplate.querySelector(".bottom .news-content").innerHTML = description;

			sectionOneSub.appendChild(subTemplate); //add to screen
		});
	}

	const API_TWO = `40fff40b72b4dae0fc8cc694ef057ab4`;
	const URL_TWO = `https://gnews.io/api/v4/top-headlines?token=${API_TWO}&topic=breaking-news&lang=en`;

	const OPTIONS_TWO = {
		method: "GET",
		header: {
			"Content-Type": "application/json",
		},
	};

	fetch(URL_TWO, OPTIONS_TWO)
		.then((response) => response.json())
		.then((results) => {
			pasteSectionTwoResults(results.articles);
		})
		.catch((error) => console.log(error));

	function pasteSectionTwoResults(results) {
		//main function two
		const sectionTwo = document.querySelector("section.second");
		const sectionTwoArticlesWrapper = sectionTwo.querySelector("ul.articles-wrapper");
		const sectionTwoTemplate = document.getElementById("sectionTwoTemplate");

		results.forEach((result) => {
			const { title, url, image, content, publishedAt, source = { name, url } } = result;
			const date = filterDate(publishedAt);

			const clonedTemplate = sectionTwoTemplate.content.cloneNode(true);

			clonedTemplate.querySelector(".article-item .article-link").href = url;
			clonedTemplate.querySelector(".article-image-wrapper img.img-fluid").src = image ?? defaultNewsImage;
			clonedTemplate.querySelector("small.article-author").innerHTML = `- ${source.name ?? "Unknown"}`;
			clonedTemplate.querySelector("small.date").innerHTML = date;
			clonedTemplate.querySelector("h3.article-title").innerHTML = title;
			clonedTemplate.querySelector(".source small").innerHTML = `Source - ${source.url}`;
			clonedTemplate.querySelector("small.article-writeup").innerHTML = content;

			sectionTwoArticlesWrapper.appendChild(clonedTemplate); // add to screen
		});
	}

	// secondary functions
	function filterDate(publishedAt) {
		const oddDate = publishedAt.split("T")[0].split("-");
		const year = oddDate[0],
			month = oddDate[1],
			day = oddDate[2];
		return `${day}-${month}-${year}`;
	}

	function filterAuthor(author) {
		return author.split("https://")[0];
	}
});
