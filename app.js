$(document).ready(function(){
	$('form').on('submit', function(e){
		e.preventDefault();
		var search = $('input[name="search"]').val();
		console.log(search)
		searchSpotify(search);
	});

	$('.btn-play').on('click', function(){
		if($(this).hasClass('playing')){
			$('.js-player').trigger('pause');
			$('.btn-play').removeClass('playing')
		}else{
			$('.js-player').trigger('play')
			$('.btn-play').addClass('playing')
		}
	});

	$('.js-player').on('timeupdate', printTime);

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

	$('.title').append(title)
	$('.author').append(author)
	$('.cover img').attr("src", cover)
	$('.btn-play').removeClass('disabled')
}

function addAudio (search) {
	var audio = search.tracks.items[0].preview_url;
	$('.js-player').attr("src", audio);
}

function printTime () {
	var current = $('.js-player').prop('currentTime');
	// console.debug(current);
	$('.seekbar progress').attr("value", current);
}
