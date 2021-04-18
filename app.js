 const url = "samples.json";

function buildMetaData(sample_id) {
    d3.json(url).then(function(data){
        console.log(data);
         var sample = data.samples[0]
        // console.log(sample);
         var sample_values = sample.sample_values
        // console.log(sample_values)
         var otu_ids = sample.otu_ids
         var otu_labels = sample.otu_labels
        //console.log(otu_ids)
        // console.log(otu_labels)
        var start = Object.values(data.metadata)
        console.log(start)
        var start_meta = start.filter(method => method.id ==sample_id)
        console.log(start_meta)
         
     });
}

function buildCharts(sample_id){
    d3.json(url).then(function(data){
        console.log(data);
         var sample = data.samples.filter(x => x.id==sample_id)[0]
        // console.log(sample);
         var sample_values = sample.sample_values.slice(0,10)
        // console.log(sample_values)
         var otu_ids = sample.otu_ids.slice(0,10)
         var otu_labels = sample.otu_labels.slice(0,10)
        //console.log(otu_ids)
        //console.log(otu_labels)
        var start = Object.values(data.metadata)
        //console.log(start)
        var trace1 = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type:"bar",
            orientation: 'h'
        };
        var graph1 = [trace1];
        Plotly.newPlot('bar',graph1)
    });
}


function init() {
    var selector = d3.select("#selDataset")
    // call build charts and build metadata
    d3.json(url).then(function(data){  
        var sample_Ids = data.names;
        
        sample_Ids.forEach(function(id){
            selector.append('option')
            .text(id)
            .property("value", id)
        });
        //  var sample = data.samples[0]
        // console.log(sample);
    
        //  var sample_values = sample.sample_values
        // // console.log(sample_values)
        //  var otu_ids = sample.otu_ids
        //  var otu_labels = sample.otu_labels
        // //console.log(otu_ids)
        // // console.log(otu_labels)
        // var start = Object.values(data.metadata)
 
        // console.log(start)
        

    });
   buildMetaData(940)
   buildCharts(940)
}

function optionChanged(sample_id){
    // call build chart and build metadata with the sample_id
    buildMetaData(sample_id)
}

init()

// d3 select [select html element] witht the calss selDatasete
// append the option element fore each id

//Need to set up dropdown menu
//Filter top 10 OTU's per subject ID
//Include demographic data corresponding to subject ID
//otu_ids are the labels
//sample_values are the values
//otu_labels hovertext

//include sort, exmple below
//data.sort((a,b) => b.greekSearchResults - a.greekSearchResults)
//loop through the otu_ids to get them all