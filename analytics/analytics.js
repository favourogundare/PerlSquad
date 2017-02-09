  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
  analytics.load("6Ngmjpw0BXprlRJjgy4GdlmWm6O87yCc");
  analytics.page();
  }}();


/* 
 * @function sendUserTimeInfo()
 * Helper function to send data using Segment's API's. 
 * This is meant to take a timestamp and a bundle of
 * optional information to produce stats for when
 * the user entered and exited the specific section of
 * the game as specified by name, as well as the 
 * difference between these two times. The optional 
 * information is sent to the Segment servers along with
 * the timing info. 
 *
 * @param name:      Name of the game segment
 * @param timestamp: This will be used to declare when the user
 *                   entered the specific section of the game
 * @param traits:    An object of additional info to send
 */
function sendUserTimeInfo(name, timestamp, traits) {
    
    if (traits === undefined) traits = {};
    traits["entered"] = timestamp;
    traits["duration"] = new Date() - timestamp;
    traits["exited"] = new Date();
    analytics.track(name, traits);
}
