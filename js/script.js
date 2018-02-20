$("document").ready(function() {
  $(".resultArea").hide();
});

$(".searchButton").click(function() {
  $(".smallLogo").removeClass("col-sm-2 col-sm-offset-2");
  $(".smallLogo").addClass("col-sm-3");
  $(".logoImg").css("display", "block");
  $(".logo img").hide(400);
  $(".resultArea").show(400);
  $(".randomArticle").hide(400);

  var inputValue = $(".searchInput").val();
  var apiUrl;
  if (inputValue != "") {
    $(".alerts").css("display", "none");
    apiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + inputValue + "&callback=?";

    search(apiUrl);

  } else {
    $(".alerts").css("display", "block");
  }

});


function search(requestUrl) {
  $.getJSON(requestUrl, function(jsonData) {
    if (jsonData.query !== undefined) { // There are results


      var jsonQuery = jsonData.query.pages;
      var htmlCode = "";
      for (var pageID in jsonQuery) {


        htmlCode += '<a href="#" onclick="pageOpener(this)"  id="https://en.m.wikipedia.org/?curid=' + jsonQuery[pageID].pageid;
        htmlCode += '"   class="col-sm-12 filelink content">';
        htmlCode += '<div class="col-sm-12"><div class="row"> <div class="col-sm-12">';
        htmlCode += '<h4>' + jsonQuery[pageID].title + '</h4>';
        htmlCode += '</div></div><div class="row"><div class="col-sm-12">';
        htmlCode += '<p>' + jsonQuery[pageID].extract + '</p>';
        htmlCode += '</div></div></div></a>';

      }

      $(".resultArea").html(htmlCode);

    } else { // There are no results
      $(".alert").html("Sorry no articles found in the whole Wikipedia!");
      $(".alerts").css("display", "block");
      $(".alert").css("display", "block");
    }
  });
}


$(".randomButton").click(function() {
  $(".resultArea").hide(400);
  $(".randomArticle").show(400);
  $(".smallLogo").removeClass("col-sm-2 col-sm-offset-2");
  $(".smallLogo").addClass("col-sm-3");
  $(".logoImg").css("display", "block");
  $(".logo img").hide(400);

  var htmlContent = '<div class="embed-responsive col-12 embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://en.m.wikipedia.org/wiki/Special:Random" allowfullscreen></iframe></div>';
  $(".randomArticle").html(htmlContent);
});


function pageOpener(element) {

    var link = $(element).prop('id');
    var htmlContent = '<div class="embed-responsive col-12 iframeStyle embed-responsive-16by9"><iframe id="foo" class="embed-responsive-item" src="' + link + '" allowfullscreen></iframe></div>';
    $(".randomArticle").html(htmlContent);
    $(".resultArea").hide(400);
    $(".randomArticle").show(400);
    $('#foo').contents().find('form').html();
  
}
