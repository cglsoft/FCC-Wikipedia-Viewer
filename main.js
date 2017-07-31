/*
    
    https://www.mediawiki.org/w/api.php     # MediaWiki API
    https://en.wikipedia.org/w/api.php      # English Wikipedia API
    https://nl.wikipedia.org/w/api.php      # Dutch Wikipedia API
    https://commons.wikimedia.org/w/api.php # Wikimedia Commons API` */

var urlWikiMedia   = 'https://www.mediawiki.org/w/api.php?callback=?';
var urlWikiEn      = "http://en.wikipedia.org//w/api.php?callback=?";
var urlWikiCommons = 'https://commons.wikimedia.org/w/api.php?callback=?';
var urlWikiRandom  = 'https://en.wikipedia.org/wiki/Special:Random?callback=?';

$(document).ready(function () {
    $("#btn-search").on("click", getArticlesWiki);

    $("#btn-searchRandom").on("click", getArticlesWikiRandom);

    var searchTerm;

    function getArticlesWiki() {
        searchTerm = $("#wiki-search").val().trim();
        
        $.getJSON(urlWikiMedia, {
            action: "query",
            format: "json",
            titles:"Main",
            rvprop:"content",
            list: "search",
            srprop: "snippet",
            srlimit: 50,
            headers: { 'Api-User-Agent': 'Example/1.0' },
            srsearch: searchTerm
        }, displayArticlesWiki);
    }

    function getArticlesWikiRandom(){
        window.open(urlWikiRandom);
    }

    function displayArticlesWiki(wikiJSON) {
        let htmlTag;

        if (wikiJSON.query.searchinfo.totalhits === 0) {            
            $("<h3 class='text-center'>No results Found</h3>").appendTo("#resultsID");
            return false;
        }
        
        $("#resultsID").empty();
        $("<hr>").appendTo("#resultsID");       

        $("#resultTitulo").html( "<h2>Resultados para " + searchTerm + "</h2>" );

        $(".results").append("<ol>");
        $.each(wikiJSON.query.search, function(i, item) {

            //console.log( i);
            //console.log(item);

            htmlTag = '<li> <a href="http://www.wikipedia.org/wiki/' +
                 wikiJSON.query.search[i].title + '">' +
                 wikiJSON.query.search[i].title + '</a> </br> <small>' + 
                 wikiJSON.query.search[i].snippet + '</small></li>';

            $(".results").append(htmlTag);
        });        
       
        $(".results").append("</ol>");
    }
});