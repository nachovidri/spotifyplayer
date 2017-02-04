$(document).ready(function(){
	$('form').on('submit', function(e){
		e.preventDefault();
		var search = $('input[name="search"]').val();
		console.log(search)
		searchSpotify(search);
	})

	$('.btn-play').on()
})

function searchSpotify(search){
	$.ajax({
		method: 'get',
		url: 'https://api.spotify.com/v1/search?q=' + search + '&type=track',
		success: function(response){
			console.log(response);
			printSearch(response);
			addAudio(response);
		}
	})
}

function printSearch(search){
	var title = search.tracks.items[0].name;
	var album = search.tracks.items[0].album.name;
	var author = search.tracks.items[0].album.artists[0].name;
	var cover = search.tracks.items[0].album.images[0].url;

	// console.log(title);

	$('.title').append(title)
	$('.author').append(author)
	$('.cover img').attr("src", cover)
}

function addAudio (search) {
	var audio = search.tracks.items[0].preview_url;
	$('.js-player').attr("src", audio)
}

$('.js-player').trigger('play')