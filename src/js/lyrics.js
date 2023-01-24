const API_KEY = "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a";

// <============ search result to fetch api data ===========>
const searchBar = document.querySelector(".search-bar-control");

searchBar.addEventListener("submit", function (e) {
	e.preventDefault();
	let inputValue = document.querySelector(".search-bar-control .form-control").value.toLowerCase();
	const originalInput = document.querySelector(".search-bar-control .form-control").value;
	const ul = document.querySelector("#search-result > ul");
	const h1 = document.querySelector("#search-result > h1");
	h1.className = "text-lg text-gray-300 mb-8";
	const text = `Results for " <i>${originalInput}</i> &nbsp"</h1>`;

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": `${API_KEY}`,
			"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
		},
	};

	fetch(`https://genius-song-lyrics1.p.rapidapi.com/search/?q=${inputValue}`, options)
		.then((response) => response.json())
		.then((response) => {
			const trackTemplate = document.getElementById("track-template");
			ul.innerHTML = "";
			h1.innerHTML = text;
			const results = response?.hits;
			results.forEach((result) => {
				const clonedTrackTemplate = trackTemplate.content.cloneNode(true);
				const {
					artist_names,
					title,
					id, // id of the song
				} = result.result;

				const artist_id = result.result.primary_artist.id; //id of the artiste

				clonedTrackTemplate.querySelector(".track-name span").innerHTML = title;
				clonedTrackTemplate.querySelector("a.track-element").href = `./artist.html?artist_id=${artist_id}`;
				clonedTrackTemplate.querySelector("span.artistes").innerHTML = artist_names;
				const trackItemLyricsButton = clonedTrackTemplate.querySelector("button.track-element");
				fetchLyrics(id)
					.then((lyrics) => {
						trackItemLyricsButton.setAttribute("lyrics", lyrics);
						trackItemLyricsButton.setAttribute("lyrics_id", id);
						trackItemLyricsButton.setAttribute("data-modal-toggle", id);
					})
					.catch((error) => {
						console.log(error);
					});

				ul.appendChild(clonedTrackTemplate);
			});
			const allLyricsButton = document.querySelectorAll(".searched-track .bottom button.track-element");
			const modal = document.querySelector(".modal_container");
			allLyricsButton.forEach(function (button) {
				button.addEventListener("mouseover", function (e) {
					e.stopPropagation();
					modal.setAttribute("id", this.getAttribute("data-modal-toggle"));
					const closeButtons = modal.querySelectorAll(".close_modal_button");
					closeButtons.forEach((button) => {
						button.setAttribute("data-modal-hide", this.getAttribute("data-modal-toggle"));
					});

					modal.querySelector(".modal_body > span").innerHTML = this.getAttribute("lyrics");
				});
			});
		})
		.catch((err) => console.error(err));

	async function fetchLyrics(id) {
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": `${API_KEY}`,
				"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
			},
		};

		const response = await fetch(`https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${id}`, options);
		const data = await response.json();
		return data?.lyrics?.lyrics?.body?.html ?? "No lyrics Found";
	}
});
