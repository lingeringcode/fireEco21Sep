//Chief Burke On Scene Genre Ecology//

var links = [
//Burke On-Scene //
  {source: "ICS", target: "SAFETY", type: "cognitive"},
  {source: "ICS", target: "PLANNING", type: "cognitive"},
  {source: "ICS", target: "OPERATIONS", type: "cognitive"},

  
//Safety//
  {source: "SAFETY", target: "accountability board", type: "alphanumeric"},
  {source: "accountability board", target: "SAFETY", type: "space-time"},
  {source: "accountability tags", target: "accountability board", type: "visual"},
  {source: "accountability board", target: "accountability tags", type: "alphanumeric"},
  {source: "radio communications", target: "SAFETY", type: "oral"},
  {source: "SAFETY", target: "radio communications", type: "aural"},
  {source: "radio communications", target: "evaluate reports", type: "cognitive"},
  {source: "evaluate reports", target: "radio communications", type: "oral"},
  {source: "tone", target: "radio communications", type: "oral"},
  {source: "radio communications", target: "tone", type: "aural"},
  {source: "radio communications", target: "PAR", type: "aural"},
  {source: "PAR", target: "radio communications", type: "oral"},
  {source: "SAFETY", target: "evacuation-air horns", type: "aural"},
  {source: "SAFETY", target: "evacuation-alert-tones", type: "aural"},
  {source: "evacuation-alert-tones", target: "SAFETY", type: "oral"},
  {source: "SAFETY", target: "evacuation-radio", type: "oral"},
  {source: "evacuation-radio", target: "SAFETY", type: "aural"},
  {source: "SCBA gauges", target: "SAFETY", type: "visual"},
  {source: "SAFETY", target: "SCBA gauges", type: "alphanumeric"},
  
//Planning//
  {source: "PLANNING", target: "time keeping", type: "space-time"},
  {source: "time keeping", target: "PLANNING", type: "visual"},
  {source: "yellow pad & pencil", target: "PLANNING", type: "alphanumeric"},
  {source: "PLANNING", target:"yellow pad & pencil", type: "visual"},
  {source: "PLANNING", target: "iPad", type: "alphanumeric"},
  {source: "iPad", target: "PLANNING", type: "visual"},
  {source: "radio communications", target: "PLANNING", type: "oral"},
  {source: "PLANNING", target: "radio communications", type: "aural"},
  {source: "radio communications", target: "evaluate reports", type: "cognitive"},
  {source: "evaluate reports", target: "radio communications", type: "oral"},
  {source: "size up", target: "radio communications", type: "aural"},
  {source: "radio communications", target: "size up", type: "oral"},
  {source: "architecture/floor plans", target: "PLANNING", type: "space-time"},
  {source: "building construction", target: "PLANNING", type: "space-time"},
  {source: "PLANNING", target: "building construction", type: "visual"},
  {source: "experiential knowledge", target: "PLANNING", type: "cognitive"},
  {source: "radio communications", target: "notifications", type: "oral"},
  {source: "notifications", target: "radio communications", type: "aural"},
  
//Operations//
  {source: "360", target: "OPERATIONS", type: "visual"},
  {source: "OPERATIONS", target: "360", type: "kinesthetic"},
  {source: "OPERATIONS", target: "avoid collapse zone", type: "space-time"},
  {source: "avoid collapse zone", target: "OPERATIONS", type: "kinesthetic"},
  {source: "OPERATIONS", target: "structural integrity", type: "visual"},
  {source: "reading smoke", target: "OPERATIONS", type: "visual"},
  {source: "observations", target: "OPERATIONS", type: "visual"},
  {source: "face-to-face", target: "OPERATIONS", type: "oral"},
  {source: "OPERATIONS", target: "face-to-face", type: "visual"},
  {source: "OPERATIONS", target: "gesture", type: "visual"},
  {source: "gesture", target: "OPERATIONS", type: "kinesthetic"},
  {source: "push/pull", target: "OPERATIONS", type: "kinesthetic"},
  {source: "OPERATIONS", target: "push/pull", type: "tactile"},
  {source: "jokes", target: "OPERATIONS", type: "oral"},
  {source: "OPERATIONS", target: "TIC", type: "visual"},
  {source: "TIC", target: "OPERATIONS", type: "alphanumeric"},
  {source: "OPERATIONS", target: "search", type: "tactile"},
  {source: "search", target: "OPERATIONS", type: "visual"},
  {source: "search patterns", target: "search", type: "cognitive"},
  {source: "search patterns", target: "search patterns", type: "kinesthetic"},
  {source: "sweeping-search", target: "search", type: "tactile"},
  {source: "search", target: "sweeping-search", type: "kinesthetic"},
];


// Add ID for each object in links array
for (var i = 0; i < links.length; i++) {
  links[i].id = i;
}

var nodes = {};

var width = 950;
var height = 800;

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});;
});

// Add ID for each object in nodes array
var elCount = 0;
for (e in nodes) {
  nodes.id = elCount;
  elCount++;
}

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(100)
    .charge(-800)
    .on("tick", tick)
    .start();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data([])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "40 60 100 10")
    .attr("refX", 20)
    .attr("refY", 1)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("g").selectAll("path")
    .data(force.links())
  .enter().append("path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
  .enter().append("circle")
    .attr("r", 4)
    .attr("id", function(d) { return "circle" + d.index; })
    .call(force.drag)
    .on("mouseover", function(d) { // <text> label show/hide
      var nid = (d.index).toString();
      var fid = "circle"+nid;
      var e = document.getElementById(nid);
      var f = document.getElementById(fid);
      e.style.opacity = 1;
    })
    .on("mouseout", function(d) {
      var nid = (d.index).toString();
      var fid = "circle"+nid;
      var e = document.getElementById(nid);
      var f = document.getElementById(fid);
      e.style.opacity = 0;
    });

var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  	.enter().append("text")
    .attr("x", 8)
    .attr("y", 8)
    .attr("opacity", 0)
    .attr("id", function(d) { return d.index; })
    .text(function(d) {
      return d.name; 
    });

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", linkArc);
  circle.attr("transform", transform);
  text.attr("transform", transform);
}

function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}
