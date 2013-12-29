var grid2 = ["a","b"];
var grid3 = ["a","b","c"];
var grid4 = ["a","b","c","d"];

var TOPICS;

var $mnemonic;

function setupTopics() {
  var topics = {}
  for(i in MNEMONICS) {
    topics[MNEMONICS[i].topic] = true;
  }

  window.TOPICS = []
  id = 1
  for(name in topics) {
    window.TOPICS.push({id: id, name: name});
    id += 1;
  }
}
setupTopics();

$(function() {
  $mnemonic = $('#mnemonic');
});

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
    this.onDeviceReady();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    renderTopics();
  },
};

$(document).bind( "pagebeforechange", function( e, data ) {

  if ( typeof data.toPage === "string" ) {
    var u = $.mobile.path.parseUrl( data.toPage );

    if ( u.hash.search(/^#topic\?id=/) !== -1 ) {
      showTopic( u, data.options );
      e.preventDefault();
    }
    else if ( u.hash.search(/^#mnemonic\?id=/) !== -1 ) {
      showMnemonic( u, data.options );
      e.preventDefault();
    }
  }
});

$( document ).on( "swiperight", $mnemonic, function() {
  i = MNEMONICS.indexOf($mnemonic.mnemonic)
  mnemonic = MNEMONICS[i - 1];
  if(mnemonic) {
    $.mobile.changePage( "#mnemonic?id=" + mnemonic.id, { reverse: true, transition: 'slide', allowSamePageTransition: true   } );
  }
})

$( document ).on( "swipeleft", $mnemonic, function() {
  i = MNEMONICS.indexOf($mnemonic.mnemonic)
  mnemonic = MNEMONICS[i + 1];
  if(mnemonic) {
    $.mobile.changePage( "#mnemonic?id=" + mnemonic.id, { transition: 'slide', allowSamePageTransition: true  } );
  }
})

function changePage(page, urlObj, options) {
  options.dataUrl = urlObj.hash.replace("#", "");
  $.mobile.changePage( page, options );
}

function showTopic(urlObj, options) {
  id = urlObj.hash.replace("#topic?id=", "");
  topic = $.grep(TOPICS, function(e,i) {return e.id == id})[0];
  renderTopic(topic);
  changePage($('#topic'), urlObj, options);
}

function showMnemonic(urlObj, options) {
  id = urlObj.hash.replace("#mnemonic?id=", "");
  mnemonic = $.grep(MNEMONICS, function(e,i) {return e.id == id})[0];
  renderMnemonic(mnemonic);
  changePage($('#mnemonic'), urlObj, options);
}

function renderTopics()
{
  for(i in TOPICS) {
    topic = TOPICS[i];
    css_class = "topic box ui-block-" + (grid2[i%2]);
    topic_html = "<a href='#topic?id=" + topic.id + "' class='" + css_class + "'><div class='img'/><div class='name'>" + topic.name + "</div></a>"
      $('#topics .topics').append(topic_html);
  }
}

function renderTopic(topic)
{
  $page = $('#topic')
  $page.find('h1').html(topic.name);

  var mnemonics = $.grep(MNEMONICS, function(e,i){return e.topic == topic.name});
  $page.find('.mnenomics').html("");
  for(i in mnemonics) {
    mnemonic = mnemonics[i];
    css_class = "mnemonic box ui-block-" + (grid2[i%2]);
    mnemonic_html = "<a href='#mnemonic?id=" + mnemonic.id + "' class='" + css_class + "'><div class='img' style='background-image:url(" + mnemonic.image_urls[0] + ")'/><div class='subject'>" + mnemonic.subject + "</div><div class='mnemonic-string'>" + mnemonic.mnemonic + "</div></a>"
    $page.find('.mnenomics').append(mnemonic_html);
  }
}

function renderMnemonic(mnemonic)
{
  topic = $.grep(TOPICS, function(e,i) {return e.id == mnemonic.topic_id})[0];

  $mnemonic.mnemonic = mnemonic;
  $mnemonic.find('.header').css('backgroundImage', "url(" + mnemonic.image_urls[0] + ")");
  $mnemonic.find('h1').html(mnemonic.mnemonic);
  $mnemonic.find('.subject').html(mnemonic.subject);
  $mnemonic.find('.mnemonic').html(mnemonic.mnemonic);
  body = "<p>NOTE: From proximal to distal:</p> Duodenum<br/> Jejunum<br/> Ileum<br/> Appendix<br/> Colon<br/> Sigmoid<br/> Rectum</p> <p>NOTE: Alternatively: to include the cecum, 'Dow Jones Industrial Climbing Average Closing Stock Report'.</p>"
  $mnemonic.find('.body').html(body);
}
