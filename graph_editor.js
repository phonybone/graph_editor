GraphEditor=function() {
}

function on_ready() {
    SvgStyle.DEFAULT_NODE.insert()
    SvgStyle.DEFAULT_EDGE.insert()
    gene_style=new SvgStyle('gene', '.gene', 'circle',
			    { r: 20, fill: 'green', stroke: 'red', 'stroke-width': 3 })
    gene_style.insert()


    var g=new Graph()
    var n0=new Node('n0', {x:50, y:50})
    var n1=new Node('n1', {x:100, y:200})
    var n2=new Node('n2', {x:50, y:200})
    var n3=new Node('n3', {x:100, y:100}, 'gene')
    g.add_edge(n0, n1)
    g.add_edge(n0, n2)
    g.add_edge(n0, n3)
    g.add_edge(n1, n2)
    g.add_edge(n1, n3)
    g.add_edge(n2, n3)
    console.log(JSON.stringify(g.stats()))

    // Build editor:
    var svg=d3.select('body').append('svg').attr('width', 800).attr('height', 600)
	.attr('viewport', '0 0 800 600')

    g.draw(svg)
    console.log('done')
}
