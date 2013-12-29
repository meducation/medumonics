var grid2 = ["a","b"];
var grid3 = ["a","b","c"];
var grid4 = ["a","b","c","d"];

var MNEMONICS = [
  {id: 1, topic_id: 0, subject:"Bowel components", mnemonic: "<strong>D</strong>ow <strong>J</strong>ones <strong>I</strong>ndustrial <strong>A</strong>verage <strong>C</strong>losing <strong>S</strong>tock <strong>R</strong>eport", image_src: "http://equityclock.com/pictures/SeasonalChartsDowJonesIndustrialAverageS_269F/image_4.png"},
  {id: 2, topic_id: 0, subject:"Atrioventricular valves Hi Yield", mnemonic: "LAB RAT", image_src: "http://cardiffstudentmedia.co.uk/gairrhydd/wp-content/uploads/sites/2/2013/11/mouse-lab-rat-101117-02.jpg"},
  {id: 3, topic_id: 0, subject:"Axillary artery branches", mnemonic: "Screw The Lawyer Save A Patient", image_src: "http://ballinyourcourt.files.wordpress.com/2012/10/screw-you.jpg"},
  {id: 4, topic_id: 0, subject: "Brachial artery: recurrent and collateral branches", mnemonic: "I Am Pretty Sexy", image_src: "http://gagmark.com/wp-content/uploads/2012/10/Im-Sexy.png"}
];

var TOPICS = [
  {id: 0, name: "Anatomy"},
  {id: 1, name: "Cardiology"},
  {id: 2, name: "Anesthesiology", mnemonics: []},
  {id: 2, name: "Psychology", mnemonics: []},
  {id: 2, name: "Biochemistry", mnemonics: []},
  {id: 3, name: "Cardiology", mnemonics: []},
  {id: 3, name: "Chemistry", mnemonics: []},
  {id: 3, name: "Dermatology", mnemonics: []},
  {id: 3, name: "Embryrology", mnemonics: []},
  {id: 3, name: "Emergency Medicine", mnemonics: []},
  {id: 3, name: "ENT", mnemonics: []},
  {id: 3, name: "Epidemiology", mnemonics: []},
  {id: 3, name: "Gastroenterology", mnemonics: []},
  {id: 3, name: "Genetics", mnemonics: []},
  {id: 3, name: "Histology", mnemonics: []},
  {id: 3, name: "Immunology", mnemonics: []},
  {id: 3, name: "General Practice", mnemonics: []},
  {id: 3, name: "Physical Exam", mnemonics: []},
  {id: 3, name: "Microbiology", mnemonics: []},
  {id: 3, name: "Neurology", mnemonics: []},
  {id: 3, name: "Neurosciences", mnemonics: []},
  {id: 3, name: "Obstetrics / Gynecology", mnemonics: []},
  {id: 3, name: "Ophthamology", mnemonics: []},
  {id: 3, name: "Orthopedics", mnemonics: []},
  {id: 3, name: "Pathology", mnemonics: []},
  {id: 3, name: "Pediatrics", mnemonics: []},
  {id: 3, name: "Pharmacology", mnemonics: []},
  {id: 3, name: "Physiology", mnemonics: []},
  {id: 3, name: "Psychiatry", mnemonics: []},
  {id: 3, name: "Oncology", mnemonics: []},
  {id: 3, name: "Rheumatology", mnemonics: []},
  {id: 3, name: "Surgery", mnemonics: []},
  {id: 3, name: "Urology", mnemonics: []}
]


var $mnemonic;

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
//
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

  var mnemonics = $.grep(MNEMONICS, function(e,i){return e.topic_id == topic.id});
  $page.find('.mnenomics').html("");
  for(i in mnemonics) {
    mnemonic = mnemonics[i];
    css_class = "mnemonic box ui-block-" + (grid2[i%2]);
    mnemonic_html = "<a href='#mnemonic?id=" + mnemonic.id + "' class='" + css_class + "'><div class='img' style='background-image:url(" + mnemonic.image_src + ")'/><div class='subject'>" + mnemonic.subject + "</div><div class='mnemonic-string'>" + mnemonic.mnemonic + "</div></a>"
    $page.find('.mnenomics').append(mnemonic_html);
  }
}

function renderMnemonic(mnemonic)
{
  topic = $.grep(TOPICS, function(e,i) {return e.id == mnemonic.topic_id})[0];

  $mnemonic.mnemonic = mnemonic;
  $mnemonic.find('.header').css('backgroundImage', "url(" + mnemonic.image_src + ")");
  $mnemonic.find('h1').html(mnemonic.mnemonic);
  $mnemonic.find('.subject').html(mnemonic.subject);
  $mnemonic.find('.mnemonic').html(mnemonic.mnemonic);
  body = "<p>NOTE: From proximal to distal:</p> Duodenum<br/> Jejunum<br/> Ileum<br/> Appendix<br/> Colon<br/> Sigmoid<br/> Rectum</p> <p>NOTE: Alternatively: to include the cecum, 'Dow Jones Industrial Climbing Average Closing Stock Report'.</p>"
  $mnemonic.find('.body').html(body);
}
