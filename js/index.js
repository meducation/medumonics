var grid3 = ["a","b","c"];
var grid4 = ["a","b","c","d"];
var topics = [
  {
    id: 0,
      name: "Anatomy",
      mnemonics: JSON.parse("[{\"subject\":\"Causes of exudative and transudative pleural effusion\",\"mnemonic_string\":\"Data Blip Champion\"},{\"subject\":\"Features of chronic renal failure\",\"mnemonic_string\":\"The 7 P's\"},{\"subject\":\"Non-motor features of Parkinson's Disease\",\"mnemonic_string\":\"Displace\"},{\"subject\":\"Investigations in acute pancreatitis\",\"mnemonic_string\":\"Pancreas\"},{\"subject\":\"High risk for stroke in AF\",\"mnemonic_string\":\"Sad Chavs\"}]")
  },
  {
    id: 1,
    name: "Cardiology",
    mnemonics: JSON.parse("[{\"subject\":\"Features of chronic renal failure\",\"mnemonic_string\":\"The 7 P's\"},{\"subject\":\"Non-motor features of Parkinson's Disease\",\"mnemonic_string\":\"Displace\"},{\"subject\":\"Investigations in acute pancreatitis\",\"mnemonic_string\":\"Pancreas\"},{\"subject\":\"High risk for stroke in AF\",\"mnemonic_string\":\"Sad Chavs\"}]")
  },
  {id: 2, name: "Anesthesiology", mnemonics: []},
  {id: 2, name: "  Psychology", mnemonics: []},
  {id: 2, name: "  Biochemistry", mnemonics: []},
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
    var u = $.mobile.path.parseUrl( data.toPage ),
    re = /^#browse-topic\?/;

    if ( u.hash.search(re) !== -1 ) {

      // We're being asked to display the items for a specific category.
      // Call our internal method that builds the content for the category
      // on the fly based on our in-memory category data structure.
      showTopic( u, data.options );

      // Make sure to tell changePage() we've handled this call so it doesn't
      // have to do anything.
      //e.preventDefault();
    }
  }
});

function showTopic(u, options) {
  id = u.hash.replace("#browse-topic?id=", "");
  renderTopic(topics[id]);
}

function renderTopics()
{
  for(i in topics) {
    topic = topics[i];
    css_class = "topic ui-block-" + (grid3[i%3]);
    topic_html = "<a href='#browse-topic?id=" + topic.id + "' class='" + css_class + "'>" + topic.name + "</a>"
      $('#browse-topics .topics').append(topic_html);
  }
}

function renderTopic(topic)
{
  $('#browse-topic .title').html(topic.name);
  $('#browse-topic .mnemonics').html('Foobar');

  for(i in topic.mnemonics) {
    mnemonic = topic.mnemonics[i];
    css_class = "mnemonic ui-block-" + (grid3[i%3]);
    mnemonic_html = "<div class='" + css_class + "'>" + mnemonic.mnemonic_string + "</a>"
      $('#browse-topic .mnenomics').append(mnemonic_html);
  }
}
