$(function() {
  var apiKey = '30eae3a39d23534e8807f9ce6b8459ed';
  var url = 'https://api.forecast.io/forecast/';
  var lati = 53.8008;
  var longi = 1.5491;
  var data;

  var $weather = $('.js-weather');
  var $time = $('.js-time');
  var $news = $('.js-news');

  var getWeather = function() {
    $.ajax({
      dataType: "json",
      url: url + apiKey + "/" + lati + "," + longi + "?callback=?",
      data: {
        lang: 'en',
        units: 'si'
      },
      done: function(data) {
        $weather.empty();

        var h1 = document.createElement('h1')
        h1.textContent = parseInt(data.currently.temperature);
        $weather.append(h1)

        var h3 = document.createElement('h3')
        h3.textContent = data.daily.summary;

        $weather.append(h3)
      },
      fail: function(data) {
        console.log(data)
        throw new Error(data)
      }
    });
  }

  var getTime = function() {

    var date = moment().format("dddd, MMMM Do");
    var time = moment().format("h:mm A");

    var h1 = document.createElement('h1');
    h1.innerHTML = time;

    var h2 = document.createElement('h2');
    h2.innerHTML = date;

    $time.empty();
    $time.append(h1);
    $time.append(h2);
  }

  var getNews = function() {
    $.ajax({
      dataType: "json",
      url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Ftopics%2FCAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtbGtHZ0pKUkNnQVAB%3Fhl%3Did%26gl%3DID%26ceid%3DID%253Aid',
      success: function(data) {
        $news.empty();
        

        var h2 = document.createElement('h2');
        h2.textContent = 'Recent News Sports';
        $news.append(h2)

        var n = 0;
        $.each(data['items'], function(i, item) {
          if (n < 15) {

            var div = document.createElement('div');
            div.innerHTML = '<div class="manual_related_post"><a href='+item.link+' target="_blank"> <h6>' + item.title + '</h6></a></div>';
            $news.append(div)
          }
          n++;
        });
      }
    });
  }

  getWeather();
  setInterval(getWeather, 60000);

  getTime();
  setInterval(getTime, 1000);

  getNews();
  setInterval(getNews, 10000);
  });