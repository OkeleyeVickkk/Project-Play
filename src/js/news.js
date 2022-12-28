// const API = "67e2b768ef734181b918ca0d862461d3";
const URL = `https://newsapi.org/v2/everything?q=music%entertainment&from=2022-12-25&sortBy=popularity&apiKey=${API}`;

const options = {
	method: "GET",
	header: {
		" X-Api-Key": `${API}`,
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
	const sectionOne = document.querySelector("section.first");
	const sectionOneMain = sectionOne.querySelector(".main-news");
	const sectionOneSub = sectionOne.querySelector(".sub-news");

	sectionOneResults.forEach((result) => {
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
		const clonedTemplateForSub = document.getElementById("sub-news-template");
	});
}

function pasteSectionTwoResults(sectionTwoResults) {
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
		const clonedTemplate = sectionTwoTemplate.content.cloneNode(true);

		clonedTemplate.querySelector(".article-item .article-link").href = url;
		clonedTemplate.querySelector(".article-image-wrapper img.img-fluid").src = urlToImage;
		clonedTemplate.querySelector("small.article-author").innerHTML = `- ${author ?? "Unknown"}`;
		clonedTemplate.querySelector("small.date").innerHTML = date;
		clonedTemplate.querySelector(".source small").innerHTML = `Source - ${name}`;
		clonedTemplate.querySelector("h3.article-title").innerHTML = title;
		clonedTemplate.querySelector("small.article-writeup").innerHTML = description;

		sectionTwoArticlesWrapper.appendChild(clonedTemplate);
	});
}

function filterDate(publishedAt) {
	const oddDate = publishedAt.split("T")[0].split("-");
	const year = oddDate[0],
		month = oddDate[1],
		day = oddDate[2];
	return `${day}-${month}-${year}`;
}
