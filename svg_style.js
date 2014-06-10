var svg_ns='http://www.w3.org/2000/svg'

DrawsSvg=function() {}
DrawsSvg.prototype={
    constructor: DrawsSvg,
    svg: function() {
	svg_style=SvgStyle.get_style(this.svg_style_title)
	var s=document.createElementNS(svg_ns, svg_style.get_tag())
	var sel=d3.select(s)
	sel.attr('class', svg_style.get_title())
	this.add_pos(sel, svg_style)
	return s
    },
    add_pos: function(d3sel, svg_style) {
	// fixme: these are too tightly coupled to Node and Edge
	if (svg_style.tag==='rect') {
	    d3sel.attr('x', this.pos.x)
		.attr('y', this.pos.y)
		.attr('width', svg_style.rules.width) // can't put these in style sheet...
		.attr('height', svg_style.rules.height) // ...because they conflict
	} else if (svg_style.tag==='circle') {
	    d3sel.attr('cx', this.pos.x)
		.attr('cy', this.pos.y)
		.attr('r', svg_style.rules.r)
	} else if (svg_style.tag==='line') {
	    d3sel.attr('x1', this.n0.pos.x)
		.attr('y1', this.n0.pos.y)
		.attr('x2', this.n1.pos.x)
		.attr('y2', this.n1.pos.y)
	}
	return d3sel
    },
}


SvgStyle=function(uniq_title, selector, tag, rules) {
    this.uniq_title=uniq_title	// string
    this.selector=selector	// string
    this.tag=tag		// string
    this.rules=rules		// object
}
SvgStyle.prototype={
    constructor: SvgStyle,
    to_string: function() {
	// return the string representation of the style sheet.
	// Suitable for use as innerHtml
	var ih=this.selector+' {\n'
	for (var attr in this.rules) {
	    ih+='  '+attr+': '+this.rules[attr]+';\n'
	}
	ih+='}\n'
	return ih
    },
    get_title: function() { return this.uniq_title },
    get_selector: function() { return this.selector },
    get_tag: function() { return this.tag },
    get_rules: function() { return this.rules },

    insert: function() {
	// add the style sheet to the document
	var sheet=document.createElement('style')
//	sheet.title=this.uniq_title
	sheet.innerHTML=this.to_string()
	if (!document.body) {
	    throw 'Cannot insert SvgStyle until document.body exists'
	}
	document.body.appendChild(sheet)
	SvgStyle.cache[this.uniq_title]=this
	return sheet
    },
    remove: function() {
	// remove the style sheet from the document
    },
}

SvgStyle.cache={}
SvgStyle.DEFAULT_NODE=new SvgStyle('default_node', '.default_node', 'rect',
				    { width: 25, height: 25, fill: 'blue', 
				      stroke: 'black', 'stroke-width': 3})
SvgStyle.DEFAULT_EDGE=new SvgStyle('default_edge', '.default_edge', 'line',
				    { stroke: 'black', 'stroke-width': 3})
SvgStyle.get_style=function(uniq_title) { 
    ss=SvgStyle.cache[uniq_title] 
    if (!ss) 
	throw 'no such SvgStyle: "'+uniq_title+'"'
    return ss
    
}


