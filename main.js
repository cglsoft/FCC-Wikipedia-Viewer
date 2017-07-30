var remoteUrlWithOrigin = 'https://www.mediawiki.org/w/api.php?callback=?';
var remoteUrlWithOrigin2 = "http://en.wikipedia.org//w/api.php?callback=?";


$(document).ready(function () {
    $("#btn-search").on("click", getArticles);
    var searchTerm;

    function getArticles() {
        searchTerm = $("#wiki-search").val().trim();
        console.log(searchTerm);
        var url = remoteUrlWithOrigin;
        $.getJSON(url, {
            action: "query",
            format: "json",
            list: "search",
            srprop: "snippet",
            srlimit: 10,
            srsearch: searchTerm
        }, displayArticles);
    }

    function displayArticles(wikiJSON) {
        if (wikiJSON.query.searchinfo.totalhits === 0) {            
            $("<h3 class='text-center'>No results Found</h3>").appendTo("#resultsID");
            return false;
        }
        $("#resultsID").empty();

        $.each(wikiJSON.query.search, function(i, item) {
             $("<div>").html(wikiJSON.query.search[i].snippet).appendTo("#resultsID");
        });
        
       
        // $("<div>").html(wikiJSON.query.search[1].snippet).appendTo("#resultsID");
        

    }
    

});