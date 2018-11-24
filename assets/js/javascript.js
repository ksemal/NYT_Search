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
    type: "get",
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var arr = response.response.docs;

    for (var i = 0; i <= number; i++) {
      if (arr[i].headline !== undefined) {
        var title = arr[i].headline.main;
        var titleDiv = $("<h4>").html(
          "<span>" + (i + 1) + ". </span>Title: " + title
        );
      } else {
        var titleDiv = $("<h2></h2>").text("Title: " + title);
      }

      if (arr[i].byline !== undefined) {
        console.log(arr[i].byline);
        var author = arr[i].byline.original;
        var authorDiv = $("<p>").text("Author: " + author);
      } else {
        var authorDiv = $("<p>").text("Author: " + author);
      }
      var section = arr[i].section_name;
      var sectionDiv = $("<p>").text("Section: " + section);
      var date = arr[i].pub_date;
      var dateDiv = $("<p>").text("Date: " + date);
      var link = arr[i].web_url;
      var linkDiv = $("<a>")
        .text("Link: " + link)
        .attr("href", arr[i].web_url);

      console.log(title);
      console.log(author);
      console.log(link);
      console.log(section);
      console.log(date);
      var article = $("<div>").attr("id", "article");
      article.append(titleDiv, authorDiv, sectionDiv, dateDiv, linkDiv);
      $("#result").append(article);
    }
  });
});

$("#clearBtn").on("click", function() {
  $("#result").empty();
});
