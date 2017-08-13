$(document).ready(function() {
    var input = document.getElementById("spell-input");
    new Awesomplete(input, {
        list: Object.keys(SpellsList)
    });
});

function addForeign(p, txtFull, txt, x, y, xoff, yoff, align='center')
{   
    p.nextSibling.remove()
    var t = document.createElementNS('http://www.w3.org/2000/svg',"foreignObject");
    var b = p.getBBox();
    t.setAttribute("transform", "translate(" + (b.x + xoff) + " " + (b.y + yoff) + ")");
    t.setAttribute('width', x);
    t.setAttribute('height',y);
    var iDiv = document.createElement('p');

    size = 20;
    iDiv.setAttribute("style", 'overflow:hidden;text-align:'+align+';margin:0;font-size:'+size+'px;');

    var ob = document.createTextNode(txtFull);
    iDiv.appendChild(ob); 
    t.appendChild(iDiv);
    p.parentNode.insertBefore(t, p.nextSibling);   

    while((iDiv.clientHeight > t.getAttribute('height') | iDiv.clientWidth > t.getAttribute('width')) & size > 8){
        size = size - 1;
        iDiv.setAttribute("style", 'overflow:hidden;text-align:'+align+';margin:0;font-size:'+size+'px;');
        t.appendChild(iDiv);
        p.parentNode.insertBefore(t, p.nextSibling);
    }

    if (iDiv.clientHeight > t.getAttribute('height') | iDiv.clientWidth > t.getAttribute('width')){
        p.parentNode.removeChild(t)

        size = 10;
        var t = document.createElementNS('http://www.w3.org/2000/svg',"foreignObject");
        var b = p.getBBox();
        t.setAttribute("transform", "translate(" + (b.x + xoff) + " " + (b.y + yoff) + ")");
        t.setAttribute('width', x);
        t.setAttribute('height',y);
        var iDiv = document.createElement('p');
        var ob = document.createTextNode(txt);
        iDiv.appendChild(ob); 
        t.appendChild(iDiv);
        p.parentNode.insertBefore(t, p.nextSibling);

        while((iDiv.clientHeight > t.getAttribute('height') | iDiv.clientWidth > t.getAttribute('width')) & size > 8){
            size = size - 1;
            iDiv.setAttribute("style", 'overflow:hidden;text-align:'+align+';margin:0;font-size:'+size+'px;');
            t.appendChild(iDiv);
            p.parentNode.insertBefore(t, p.nextSibling);
            console.log(size)
        }
    }
}

function fillSVG()
{   
    var input = document.getElementById("spell-input");
    name = SpellsList[input.value]['name'];
    castingtime = SpellsList[input.value]['time'];
    range = SpellsList[input.value]['range'];
    components = SpellsList[input.value]['components'];
    duration = SpellsList[input.value]['duration'];
    descriptionFull = SpellsList[input.value]['descriptionFull'];
    description = SpellsList[input.value]['description'];
    lvl = SpellsList[input.value]['level'];
    school = spellSchoolList[SpellsList[input.value]['school']];
    source = SourceList[SpellsList[input.value]['source'][0]]['abbreviation'];
    page = SpellsList[input.value]['source'][1]
    lvlschool = 'level ' + lvl + ' ' + school + ' (p. '+source+ ' '+ page +')'

    var svgDoc = document.getElementById("spellcard").contentDocument;
    
    // function addForeign(p, txtFull, txt, x, y, xoff, yoff, align='center')
    addForeign(svgDoc.getElementById("namePath"),name, name, 108, 12, 0, 0, 'left');
    addForeign(svgDoc.getElementById("castingtimePath"),castingtime, castingtime, 58, 13, 0, 0, 'center');
    addForeign(svgDoc.getElementById("rangePath"),range, range, 58, 13, 0, 0, 'center');
    addForeign(svgDoc.getElementById("componentsPath"),components, components, 58, 13, 0, 0, 'center');
    addForeign(svgDoc.getElementById("durationPath"),duration, duration, 58, 13, 0, 0, 'center');
    addForeign(svgDoc.getElementById("descriptionPath"),descriptionFull,'SHORT: ' + description, 115, 75, 2, 2, 'justify');
    addForeign(svgDoc.getElementById("lvlschoolPath"),lvlschool, lvlschool, 148, 10, 0, -1, 'center');
}

function download_svg() {

    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 560;
    var ctx = canvas.getContext("2d");

    var svgString = new XMLSerializer().serializeToString(document.getElementById("spellcard").contentDocument);
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    var url = DOMURL.createObjectURL(svg);


    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        ctx.scale(2, 2);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        var imgURL = canvas.toDataURL("image/png");
        DOMURL.revokeObjectURL(imgURL);
        var dlLink = document.createElement('a');
        dlLink.download = "image";
        dlLink.href = imgURL;
        dlLink.target = '_blank'
        dlLink.dataset.downloadurl = ["image/png", dlLink.download, dlLink.href].join(':');
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }

    img.src = url;

}