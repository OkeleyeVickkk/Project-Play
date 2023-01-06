const API_KEY = "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a";

const currentURL = window.location.search;
const getParams = new URLSearchParams(currentURL);
const artist_id = getParams.get("artist_id");

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": `${API_KEY}`,
		"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
	},
};

// fetch about artist details himself
async function fetchArtistDetails() {
	const response = await fetch(`https://genius-song-lyrics1.p.rapidapi.com/artist/details/?id=${artist_id}`, options);
	if (!response.ok) throw "Cannot fetch details";
	const data = await response.json();
	const {
		description_preview,
		facebook_name,
		image_url,
		instagram_name,
		header_image_url,
		description = { html },
		name,
		twitter_name,
		user = { header_image_url, about_me_summary, name },
	} = await data.artist;

	const artistName = filterName(data.artist.name);

	const $artistContentInner = document.querySelector(".artist-content-inner");
	const $artistTemplate = document.querySelector(".artist-content-inner #artist-template");
	const $clone = $artistTemplate.content.cloneNode(true);

	$artistContentInner.innerHTML = "";
	$clone.querySelector(".artist-image img").src = image_url;
	$clone.querySelector(".artist-name span").innerHTML = name;
	$clone.querySelector(".artist-details span").innerHTML = description.html;
	$clone.querySelector(".social-handles #facebook").href = `https://www.facebook.com/${facebook_name ?? artistName}`;
	$clone.querySelector(".social-handles #twitter").href = `https://www.twitter.com/${twitter_name ?? artistName}`;
	$clone.querySelector(".social-handles #instagram").href = `https://www.instagram.com/${instagram_name ?? artistName}`;

	$artistContentInner.appendChild($clone);
}

function filterName(name) {
	return name.split(" ").join("");
}

// fetch about artist albums
async function fetchArtistAlbums() {
	const response = await fetch(`https://genius-song-lyrics1.p.rapidapi.com/artist/albums/?id=${artist_id}`, options);
	const data = await response.json();
	let albums = await data.albums;
	const $albumItemsWrapper = document.querySelector(".recent-albums .albums-wrapper");
	const $albumItem = document.getElementById("album-item"); //get cloneable item
	$albumItemsWrapper.innerHTML = "";
	albums.slice(0, 10).forEach((album) => {
		const { cover_art_thumbnail_url, name, url, cover_art_url } = album;
		let $cloneAlbumItem = $albumItem.content.cloneNode(true); //clone item

		$cloneAlbumItem.querySelector("li > a").href = url;
		$cloneAlbumItem.querySelector(".image-wrap img").src = cover_art_thumbnail_url ?? cover_art_url;
		$cloneAlbumItem.querySelector(".album-title small").innerHTML = name;

		$albumItemsWrapper.appendChild($cloneAlbumItem ?? "No albums found"); //paste the details
	});
}

// fetch about artist songs
fetch(`https://genius-song-lyrics1.p.rapidapi.com/artist/songs/?id=${artist_id}`, options)
	.then((response) => response.json())
	.then((data) => {
		const songs = data.songs.slice(0, 15);
		songs.forEach((song) => {
			const { title, artist_names } = song;
			const $trackTemplatesWrapper = document.querySelector(".tracks-item-wrapper");
			const $trackTemplate = document.getElementById("track-item-template");

			const $clonedTrackTemplate = $trackTemplate.content.cloneNode(true); //clone the node

			$clonedTrackTemplate.querySelector("span.track-title").textContent = title;
			$clonedTrackTemplate.querySelector("small.track-artistes").textContent = artist_names;

			$trackTemplatesWrapper.appendChild($clonedTrackTemplate); //paste to screen
		});
	})
	.then((error) => console.log(error));

fetchArtistAlbums();
fetchArtistDetails();
// spotify api 2 for search of artiste
