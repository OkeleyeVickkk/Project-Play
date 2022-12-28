// get the artist using search params

const API_KEY = "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a";

const currentURL = window.location.search;
const getParams = new URLSearchParams(currentURL);
const artist_id = getParams.get("artist_id");

const options = {
	method: "GET",
	headers: {
		// "X-RapidAPI-Key": `${API_KEY}`,
		"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
	},
};

// fetch about artist details himself
fetch(`https://genius-song-lyrics1.p.rapidapi.com/artists/${artist_id}?text_format=dom`, options)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));

// fetch about artist songs
fetch(`https://genius-song-lyrics1.p.rapidapi.com/artists/${artist_id}/songs?sort=popularity`, options)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));

// fetch about artist albums
fetch(`https://genius-song-lyrics1.p.rapidapi.com/artists/456537/albums`, options)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));
