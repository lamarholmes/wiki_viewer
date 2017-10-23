$(document).ready(function(){
  $('#searcher').keypress(function(event){
    if(event.which == 13){
      article = $('#searcher').val();
      url = 'https://en.wikipedia.org/w/api.php?exintro&explaintext';  
      queryData = {
        action : 'query',
        format : 'json',
        generator : 'search',
        gsrsearch : article,
        prop : 'extracts',
        pilimit : 'max',
        exsentences : 1,
        exlimit : 'max'
      };
      $.ajax( {
        url: url,
        data: queryData,
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8",
        headers: { 'Api-User-Agent': 'Example/1.0',
          'Access-Control-Allow-Origin' : 'https://s.codepen.io',
         'X-Requested-With': 'XMLHttpRequest',
        },
        success: function(data) {
          $('#results').html('');

          var results = data.query.pages;
          for (x in results){
            $('#results').append('<a href="https://en.wikipedia.org/?curid='+ data.query.pages[x].pageid +'" target="_blank"><div class="row"><div class="col-md-6 col-md-offset-3 bg-info infobox"><h2>'+ data.query.pages[x]['title'] +'</h2><p>'+ data.query.pages[x].extract +'</p></div></div></a>');
                                 };
         
        },
        error: function(err){
          console.log(err);
        }
      });
    } 
  });
  // Clears the results if user deletes their search word fully
  $('#searcher').keyup(function(){
    var searchBar = $(this).val();
    if(searchBar == ""){
      $('#results').html("");
    }
  });

  //Clears the results and search bar if user clicks button
  $('#clearer').click(function(){
    $('#results').html("");
    $('#searcher').val("");
    
  });

});