/*
var colSumHeight=[];
console.log($(".item").outerWidth(true))
var nodeWidth=$(".item").outerWidth(true);
//console.log(nodeWidth)
var count=parseInt($("#pic-ct").width()/nodeWidth);
console.log(count)
for(var i=0; i<count; i++){
    colSumHeight.push(0)
}

function waterfallPlace($node){
    var idx = 0,
        minSumHeight = colSumHeight[0];
    for(var i=0;i<colSumHeight.length; i++){
        if(colSumHeight[i] < minSumHeight){
            idx = i;
            minSumHeight = colSumHeight[i];
        }
    }
    $node.css({
        left: nodeWidth*idx,
        top: minSumHeight
        //  opacity: 1
    });

    colSumHeight[idx] = $node.outerHeight(true) + colSumHeight[idx];
    $('#pic-ct').height(Math.max.apply(null,colSumHeight));
}*/
var waterfallPlace={
    init:function($node){
        this.$node=$node;
        this.colSumHeight=[],

    }
}
waterfallPlace.init($node)