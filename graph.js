


function Graph() {
    this.nodes=new Object()	// k=name, v=Node()
    this.edges=new Object()	// k=<id>_<id>, v=Edge()
}

Graph.prototype = {
    add_node: function(n) {
	this.nodes[n.name]=n
	return n
    },

    add_node_name: function(name) {
	return this.add_node(new Node(name))
    },

    add_edge: function(n1, n2, shape) {
	this.add_node(n1)	// might overwrite...
	this.add_node(n2)

	var edge_name=n1.name+'_'+n2.name
	var edge=new Edge(n1, n2, shape)
	this.edges[edge_name]=edge
	return edge
    },

    add_edge_by_names: function(name1, name2) {
	var n1=this.nodes[name1] || this.add_node(name1)
	var n2=this.nodes[name2] || this.add_node(name2)
	return this.add_edge(n1,n2)
    },

    draw: function(container) {
	// Assumes container contains no .edges or .nodes
	// edges:
	container.selectAll('.edge')
	    .data(values(this.edges)).enter()
	    .append(function(edge) { return edge.svg() })
	    
	// nodes:
	container.selectAll('.node')
	    .data(values(this.nodes)).enter()
	    .append(function(node) { 
		return node.svg() })
    },

    stats: function() {
	return {n_edges: values(this.edges).length,
		n_nodes: values(this.nodes).length,
	       }
    },

    toString: function() {
	return "I'm a baby graph!"
    }
}

Node=function(name, pos, svg_style_title) {
    if (!name) { throw 'no name' }
    this.name=name
    this.pos=pos
    this.svg_style_title=!!svg_style_title? svg_style_title : SvgStyle.DEFAULT_NODE.uniq_title
}

Node.prototype = {
    as_string: function() { return 'n<'+this.name+'>' },
}
extend(Node.prototype, DrawsSvg.prototype)

Edge=function(n0, n1, svg_style_title) {
    if (!(!!n0 && !!n1)) { throw 'Edge(): missing n0 or n1' }
    this.n0=n0
    this.n1=n1
    this.svg_style_title=!!svg_style_title? svg_style_title : SvgStyle.DEFAULT_EDGE.uniq_title
}

Edge.prototype = {
    as_string: function() { return 'e<'+this.n0.name+'_'+this.n1.name+'>' },
}
extend(Edge.prototype, DrawsSvg.prototype)
