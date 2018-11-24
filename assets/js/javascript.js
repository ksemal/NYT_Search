$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  $("#result").empty();
  var startYear = $("#startYear").val();
  var endYear = $("#endYear").val();
  var search = $("#searchTerm").val();
  var number = $("#numOfRecords").val() - 1;

  var options = {
    "api-key": "25fd64170ffc44d7a0327afcc3f4e107",
    q: search
  };

  if (startYear.length > 0) {
    startYear = startYear + "0101";
    options["begin_date"] = startYear;
  }
  if (endYear.length > 0) {
    endYear = endYear + "1201";
    options["end_date"] = endYear;
  }

  var urlQuery = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  $.ajax({
    url: urlQuery,
    data: options,
    type: "get"
  }).then(function(response) {
    var arr = response.response.docs;

    for (var i = 0; i <= number; i++) {
      if (arr[i].headline !== undefined) {
        var title = arr[i].headline.main;
        var titleDiv = $("<h4>").html(
          "<span>" + (i + 1) + ". </span><b>Title: </b>" + title
        );
      } else {
        var titleDiv = $("<h4></h4>").html("<b>Title: </b>" + title);
      }

      if (arr[i].byline !== undefined) {
        console.log(arr[i].byline);
        var author = arr[i].byline.original;
        var authorDiv = $("<p>").html("<b>Author: </b>" + author);
      } else {
        var authorDiv = $("<p>").html("<b>Author: </b>" + author);
      }
      var section = arr[i].section_name;
      var sectionDiv = $("<p>").html("<b>Section: </b>" + section);
      var date = arr[i].pub_date;
      var dateDiv = $("<p>").html("<b>Date: </b>" + date);
      var link = arr[i].snippet;
      var linkDiv = $("<a>")
        .text(link)
        .attr("href", arr[i].web_url);
      var linkTitle = $("<span><b>Link: </b></span>");
      var article = $("<div>").attr("id", "article");
      article.append(
        titleDiv,
        authorDiv,
        sectionDiv,
        dateDiv,
        linkTitle,
        linkDiv
      );
      $("#result").append(article);
    }
  });
});

$("#searchBtn").on("click", function() {
  $("#result").empty();
});
