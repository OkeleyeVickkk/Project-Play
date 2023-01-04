const API_KEY = "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a";

const currentURL = window.location.search;
const getParams = new URLSearchParams(currentURL);
const artist_id = getParams.get("artist_id");

// const options = {
// 	method: "GET",
// 	headers: {
// 		"X-RapidAPI-Key": `${API_KEY}`,
// 		"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
// 	},
// };

// fetch about artist details himself
async function fetchArtistDetails() {
	const response = await fetch(`https://genius-song-lyrics1.p.rapidapi.com/artists/${artist_id}?text_format=dom`, options);
	if (!response.ok) throw "Cannot fetch Details";
	const data = await response.json();
	data.forEach((result) => {
		const { description_preview, facebook_name, image_url, instagram_name, header_image_url, name, twitter_name } = result;

		const $albumItemsWrapper = document.querySelector(".recent-albums .albums-wrapper"); //get wrapper for all albums
		const $albumItem = document.getElementById("album-item"); //get cloneable item
		let $cloneAlbumItem = $albumItem.content.cloneNode(true);

		//clone the item
	});
}

// fetch about artist songs
async function fetchArtistSongs() {
	fetch(`https://genius-song-lyrics1.p.rapidapi.com/artists/${artist_id}/songs?sort=popularity`, options)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));
}

// fetch about artist albums
async function fetchArtistAlbums() {
	fetch(`https://genius-song-lyrics1.p.rapidapi.com/artists/${artist_id}/albums`, options)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));
}

// spotify api 2 for search of artiste
