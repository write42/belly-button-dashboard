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
        var result = data.samples.filter(sampleObj => sampleObj.id==sample_id)[0]
        console.log(result);

        console.log(result.otu_ids.slice(0,10))
        var otu_ids = result.otu_ids.slice(0,10).toString().split(',')
        var otu_labels = result.otu_labels.slice(0,10)
        var sample_values = result.sample_values.slice(0,10)
        var otu_ids_full = result.otu_ids
        var otu_labels_full = result.otu_labels
        var sample_values_full = result.sample_values
        console.log(otu_ids)
        // bubble chart
        var bubbleLayout = {
            xaxis:{title:'OTU ID'}
        }

        var bubbleData = [
            {
                x: otu_ids_full,
                y: sample_values_full,
                text: otu_labels_full,
                mode:'markers',
                marker:{
                    size: sample_values_full,
                    color: otu_ids_full,
                    colorscale: ''
                }
            }
        ]

        Plotly.newPlot("bubble", bubbleData, bubbleLayout)

        //var yticks = 

        var barLayout = {
            title: "Belly Button Bar Chart",
            xaxis:{title: 'OTU'},
            yaxis: {title:''}
        };

        var barData = [{
            type: 'bar',
            x: sample_values.reverse(),
            y: otu_ids.reverse(),
            text: otu_labels.reverse(),
            orientation: 'h'
        }];

        Plotly.newPlot("bar", barData, barLayout);

        // bar chart
        //  var sample_values = sample.sample_values.slice(0,10)
        // // console.log(sample_values)
        //  var otu_ids = sample.otu_ids.slice(0,10)
        //  var otu_labels = sample.otu_labels.slice(0,10)
        // //console.log(otu_ids)
        // //console.log(otu_labels)
        // var start = Object.values(data.metadata)
        // //console.log(start)
        // var trace1 = [{
        //     values: sample_values,
        //     labels: otu_ids,
        //     type:'bar'
        // }];
        // Plotly.newPlot('bar',trace1)
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
    buildCharts(sample_id)
}

init()
// d3 select [select html element] witht the calss selDatasete
// append the option element fore each id
//otu_ids are the labels
//sample_values are the values
//otu_labels hovertext

//include sort, exmple below
//data.sort((a,b) => b.greekSearchResults - a.greekSearchResults)
//loop through the otu_ids to get them all