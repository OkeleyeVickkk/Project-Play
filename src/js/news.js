const API = "67e2b768ef734181b918ca0d862461d3";
const URL = `https://newsapi.org/v2/everything?q=music%entertainment&from=2022-12-25&sortBy=popularity&apiKey=${API}`;
const defaultNewsImage = `https://mir-s3-cdn-cf.behance.net/project_modules/1400/6fe6f228202371.5637141eb4d67.jpg`;

const options = {
	method: "GET",
	header: {
		"X-Api-Key": `${API}`,
		Authorization: `${API}`,
	},
};
fetch(URL, options)
	.then((response) => {
		if (!response.ok) {
			throw response.status;
		}
		return response.json();
	})
	.then((response) => {
		const results = response.articles;
		const randomizedResult = randomize(results);
		const sectionOneResults = randomizedResult.slice(0, 3);
		const sectionTwoResults = randomizedResult.slice(3);
		pasteSectionOneResults(sectionOneResults);
		pasteSectionTwoResults(sectionTwoResults);
	})
	.catch((err) => console.log(err));

function randomize(results) {
	const randomStart = Math.floor(Math.random() * 40) + 1;
	return results.slice(randomStart, randomStart + 15);
}

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

function pasteSectionTwoResults(sectionTwoResults) {
	//main function two
	const sectionTwo = document.querySelector("section.second");
	const sectionTwoArticlesWrapper = sectionTwo.querySelector("ul.articles-wrapper");
	const sectionTwoTemplate = document.getElementById("sectionTwoTemplate");

	sectionTwoResults.forEach((result) => {
		const {
			title,
			url,
			urlToImage,
			description,
			author,
			publishedAt,
			source: { name },
		} = result;
		const date = filterDate(publishedAt);
		const newAuthor = filterAuthor(author);

		const clonedTemplate = sectionTwoTemplate.content.cloneNode(true);

		clonedTemplate.querySelector(".article-item .article-link").href = url;
		clonedTemplate.querySelector(".article-image-wrapper img.img-fluid").src = urlToImage ?? defaultNewsImage;
		clonedTemplate.querySelector("small.article-author").innerHTML = `- ${newAuthor ?? "Unknown"}`;
		clonedTemplate.querySelector("small.date").innerHTML = date;
		clonedTemplate.querySelector(".source small").innerHTML = `Source - ${name}`;
		clonedTemplate.querySelector("h3.article-title").innerHTML = title;
		clonedTemplate.querySelector("small.article-writeup").innerHTML = description;

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

function getTodaysDate() {} //get today's date and add it to the api url to get the latests news
