
function generateWordAux(s,w,length,word) {
    var word = "";
    while (word.length < length) word = word.concat(chance.weighted(s,w));
    return word
};

function generateWordAuxFixed(s,w,length,word) {
    var wordAux = word;
    while (wordAux.length != length) {
        wordAux = wordAux.concat(chance.weighted(s,w));
        if (wordAux.length > length) wordAux = word;
        else wordAux = wordAux.concat(generateWordAuxFixed(s,w,length-wordAux.length,wordAux));
        if (wordAux.length > length) wordAux = word;
        else break
    };
    return wordAux
};

function generateWord(s,w,length,flag) {
    if (flag) return generateWordAuxFixed(s,w,length,"");
    else return generateWordAux(s,w,length,"");
};

var ruTuple = [["то",1.72],["ст",1.55],["но",1.46],["на",1.42],["ко",1.25],["ни",1.25],["не",1.23],["ен",1.22],["по",1.16],["ра",1.13],["ли",1.12],["он",1.06],["ер",1.00],["ро",1.00],["ол",0.99],["го",0.99],["ал",0.97],["от",0.93],["ов",0.93],["ть",0.89],["ре",0.89],["во",0.89],["пр",0.87],["та",0.87],["ка",0.87],["бы",0.85],["ел",0.84],["ет",0.82],["ос",0.82],["ан",0.80],["ла",0.80],["ор",0.79],["ве",0.77],["де",0.77],["ль",0.76],["ло",0.76],["те",0.75]];
var ptTuple = [["ra",2.10],["en",1.97],["de",1.97],["ar",1.92],["es",1.91],["er",1.91],["nt",1.86],["te",1.82],["do",1.57],["os",1.55],["as",1.51],["co",1.46],["qu",1.41],["se",1.40],["re",1.31],["ta",1.27],["ma",1.26],["to",1.25],["me",1.22],["el",1.20],["pa",1.20],["or",1.16],["em",1.10],["ue",1.10],["da",1.01],["ad",1.01],["an",1.01],["ão",1.01],["in",0.94],["st",0.93],["po",0.89],["um",0.87],["al",0.86],["ve",0.85],["am",0.83],["ri",0.83],["om",0.82],["sa",0.79],["le",0.78],["ca",0.77],["ti",0.75],["ent",1.54],["que",1.41],["nte",1.28],["par",1.13],["ara",0.90],["men",0.89],["com",0.87],["est",0.73],["ado",0.71],["ele",0.68],["não",0.52],["uma",0.47],["era",0.47],["voc",0.45],["sta",0.45],["nto",0.45],["ant",0.45],["ocê",0.44],["con",0.42],["ver",0.40],["ria",0.39],["seu",0.38],["nha",0.38],["ame",0.37],["inh",0.36],["por",0.36],["per",0.35],["mas",0.35],["ela",0.34],["tos",0.34],["ada",0.33],["dos",0.32],["res",0.32],["eri",0.32],["and",0.32],["qua",0.31],["ito",0.31],["ndo",0.30],["ida",0.30]]
var generateButton = document.querySelector("#generateButton")
generateButton.onclick = (event) => {
    const langugageButton = document.querySelector("#langButton");
    const languageSel = document.getElementById("languageSel");
    var language;
    if (languageSel.options[languageSel.selectedIndex].value != "default") language = languageSel.options[languageSel.selectedIndex].value;

    const lengthButton = document.querySelector("#lengthButton");
    var length;
    var fixedLength;
    length = document.getElementById("lengthInput").value; //fixedLength = document.querySelector('#fixedLength').checked;
    console.log(fixedLength);

    const wordsButton = document.querySelector("#wordsButton");
    var words;
    words = document.getElementById("wordsInput").value;   

    var syllableTuple;
    if (language == "ru") syllableTuple = ruTuple;
    else if (language == "pt") syllableTuple = ptTuple;
    else return;

    var syllables = [];
    var weight = [];
    for (let i = 0; i < syllableTuple.length; i++) {
        syllables.push(syllableTuple[i][0]);
        weight.push(syllableTuple[i][1]);
    };

    var wordList = [];
    for (let i = 0; i < words; i++) {
        wordList.push(generateWord(syllables,weight,length,fixedLength));
    };

    
    for (let i = 0; i < wordList.length; i++) {
        const p = document.createElement("p");
        const node = document.createTextNode(wordList[i]);
        p.appendChild(node);
        const element = document.getElementById("result");
        element.appendChild(p);
    };
    
};