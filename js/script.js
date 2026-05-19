// ==========================================
// VISTULIAN TRANSLATOR ENGINE
// FULL MORPHOLOGICAL VERSION
// ==========================================

// ==========================================
// DOM
// ==========================================

const inputArea = document.getElementById("sv");
const outputArea = document.getElementById("vs");
const exchangeBtn = document.querySelector(".exchange-wrapper");
const labels = document.querySelectorAll(".lang-label");
const copyBtn = document.querySelector(".copy-icon");
const copyMsg = document.getElementById("copy-msg");

let swedishToVistulian = true;

// ==========================================
// PHONOLOGY
// ==========================================

const softLetters = [
    "j","č","ć","đ","š","ž","lj","nj"
];

function detectHardness(stem){

    if(
        stem.endsWith("j") ||
        stem.endsWith("č") ||
        stem.endsWith("ć") ||
        stem.endsWith("đ") ||
        stem.endsWith("š") ||
        stem.endsWith("ž") ||
        stem.endsWith("lj") ||
        stem.endsWith("nj")
    ){
        return "soft";
    }

    return "hard";
}

// ==========================================
// GRAMMAR
// ==========================================

const grammar = {

    cases:[
        "nom",
        "akk",
        "gen",
        "dat",
        "inst",
        "lok"
    ],

    // ======================================
    // NOUNS
    // ======================================

    nounEndings: {

        masc: {

            hard: {

                singular: {

                    anim: {
                        nom:"",
                        akk:"a",
                        gen:"a",
                        dat:"u",
                        inst:"om",
                        lok:"u"
                    },

                    inan: {
                        nom:"",
                        akk:"",
                        gen:"a",
                        dat:"u",
                        inst:"om",
                        lok:"u"
                    }
                },

                plural: {

                    anim: {
                        nom:"i",
                        akk:"e",
                        gen:"ov",
                        dat:"om",
                        inst:"i",
                        lok:"ih"
                    },

                    inan: {
                        nom:"i",
                        akk:"i",
                        gen:"ov",
                        dat:"om",
                        inst:"i",
                        lok:"ih"
                    }
                }
            },

            soft: {

                singular: {

                    anim: {
                        nom:"",
                        akk:"a",
                        gen:"a",
                        dat:"u",
                        inst:"em",
                        lok:"u"
                    },

                    inan: {
                        nom:"",
                        akk:"",
                        gen:"a",
                        dat:"u",
                        inst:"em",
                        lok:"u"
                    }
                },

                plural: {

                    anim: {
                        nom:"i",
                        akk:"e",
                        gen:"ev",
                        dat:"em",
                        inst:"i",
                        lok:"ih"
                    },

                    inan: {
                        nom:"i",
                        akk:"i",
                        gen:"ev",
                        dat:"em",
                        inst:"i",
                        lok:"ih"
                    }
                }
            }
        },

        fem: {

            singular: {
                nom:"a",
                akk:"o",
                gen:"e",
                dat:"i",
                inst:"o",
                lok:"i"
            },

            plural: {
                nom:"e",
                akk:"e",
                gen:"",
                dat:"am",
                inst:"ami",
                lok:"ah"
            }
        },

        neut: {

            singular: {
                nom:"",
                akk:"o",
                gen:"a",
                dat:"u",
                inst:"om",
                lok:"u"
            },

            plural: {
                nom:"a",
                akk:"a",
                gen:"",
                dat:"om",
                inst:"i",
                lok:"ih"
            }
        }
    },

    // ======================================
    // ADJECTIVES
    // ======================================

    adjectiveEndings: {

        singular: {

            masc_anim: {
                nom:"i",
                akk:"ega",
                gen:"ega",
                dat:"emu",
                inst:"im",
                lok:"em"
            },

            masc_inan: {
                nom:"i",
                akk:"i",
                gen:"ega",
                dat:"emu",
                inst:"im",
                lok:"em"
            },

            fem: {
                nom:"a",
                akk:"o",
                gen:"e",
                dat:"i",
                inst:"o",
                lok:"i"
            },

            neut: {
                nom:"o",
                akk:"o",
                gen:"ega",
                dat:"emu",
                inst:"im",
                lok:"em"
            }
        },

        plural: {

            masc_anim: {
                nom:"i",
                akk:"e",
                gen:"ih",
                dat:"im",
                inst:"imi",
                lok:"ih"
            },

            masc_inan: {
                nom:"i",
                akk:"i",
                gen:"ih",
                dat:"im",
                inst:"imi",
                lok:"ih"
            },

            fem: {
                nom:"e",
                akk:"e",
                gen:"ih",
                dat:"im",
                inst:"imi",
                lok:"ih"
            },

            neut: {
                nom:"a",
                akk:"a",
                gen:"ih",
                dat:"im",
                inst:"imi",
                lok:"ih"
            }
        }
    },

    // ======================================
    // POSSESSIVES
    // ======================================

    possessiveEndings: {

        singular: {

            masc_anim: {
                nom:"",
                akk:"ega",
                gen:"ega",
                dat:"emu",
                inst:"im",
                lok:"em"
            },

            masc_inan: {
                nom:"",
                akk:"",
                gen:"ega",
                dat:"emu",
                inst:"im",
                lok:"em"
            },

            fem: {
                nom:"a",
                akk:"o",
                gen:"e",
                dat:"i",
                inst:"o",
                lok:"i"
            },

            neut: {
                nom:"e",
                akk:"e",
                gen:"ega",
                dat:"emu",
                inst:"im",
                lok:"em"
            }
        },

        plural: {

            masc_anim: {
                nom:"i",
                akk:"e",
                gen:"ih",
                dat:"im",
                inst:"imi",
                lok:"ih"
            },

            masc_inan: {
                nom:"i",
                akk:"i",
                gen:"ih",
                dat:"im",
                inst:"imi",
                lok:"ih"
            },

            fem: {
                nom:"e",
                akk:"e",
                gen:"ih",
                dat:"im",
                inst:"imi",
                lok:"ih"
            },

            neut: {
                nom:"a",
                akk:"a",
                gen:"ih",
                dat:"im",
                inst:"imi",
                lok:"ih"
            }
        }
    }
};

// ==========================================
// DICTIONARY
// ==========================================

const dictionary = {

    // ======================================
    // PERSONAL PRONOUNS
    // ======================================

    "jag": {
        type:"pron",
        person:1,
        number:"singular",
        gender:"masc",

        forms:{
            nom:"jaz",
            akk:"me",
            gen:"mene",
            dat:"mene",
            inst:"meno",
            lok:"mene"
        }
    },

    "du": {
        type:"pron",
        person:2,
        number:"singular",
        gender:"masc",

        forms:{
            nom:"ti",
            akk:"te",
            gen:"tebe",
            dat:"tebe",
            inst:"tebo",
            lok:"tebe"
        }
    },

    "han": {
        type:"pron",
        person:3,
        number:"singular",
        gender:"masc",

        forms:{
            nom:"on",
            akk:"njega",
            gen:"njega",
            dat:"njemu",
            inst:"njim",
            lok:"njem"
        }
    },

    "hon": {
        type:"pron",
        person:3,
        number:"singular",
        gender:"fem",

        forms:{
            nom:"ona",
            akk:"njo",
            gen:"nje",
            dat:"njej",
            inst:"njo",
            lok:"njej"
        }
    },

    "det": {
        type:"pron",
        person:3,
        number:"singular",
        gender:"neut",

        forms:{
            nom:"ono",
            akk:"njega",
            gen:"njega",
            dat:"njemu",
            inst:"njim",
            lok:"njem"
        }
    },

    "vi": {
        type:"pron",
        person:1,
        number:"plural",
        gender:"masc",

        forms:{
            nom:"mi",
            akk:"nas",
            gen:"nas",
            dat:"nam",
            inst:"nami",
            lok:"nas"
        }
    },

    "ni": {
        type:"pron",
        person:2,
        number:"plural",
        gender:"masc",

        forms:{
            nom:"vi",
            akk:"vas",
            gen:"vas",
            dat:"vam",
            inst:"vami",
            lok:"vas"
        }
    },

    "de": {
        type:"pron",
        person:3,
        number:"plural",
        gender:"masc",

        forms:{
            nom:"oni",
            akk:"njih",
            gen:"njih",
            dat:"njim",
            inst:"njimi",
            lok:"njih"
        }
    },

    // ======================================
    // POSSESSIVES
    // ======================================

    "min": {
        type:"poss",
        base:"moj"
    },

    "din": {
        type:"poss",
        base:"tvoj"
    },

    "hans": {
        type:"poss",
        base:"njegov"
    },

    "hennes": {
        type:"poss",
        base:"njen"
    },

    "sin": {
        type:"poss",
        base:"svoj"
    },

    "vår": {
        type:"poss",
        base:"naš"
    },

    "er": {
        type:"poss",
        base:"vaš"
    },

    "deras": {
        type:"poss",
        base:"njihov"
    },

    // ======================================
    // NOUNS
    // ======================================

    "elev": {
        type:"noun",
        gender:"masc",
        animacy:"anim",
        hardness:"hard",
        stem:"učenik"
    },

    "kung": {
        type:"noun",
        gender:"masc",
        animacy:"anim",
        hardness:"soft",
        stem:"krolj"
    },

    "bil": {
        type:"noun",
        gender:"neut",
        stem:"avto"
    },

    "skola": {
        type:"noun",
        gender:"fem",
        stem:"škol"
    },

    "hav": {
        type:"noun",
        gender:"neut",
        stem:"morj"
    },

    "katt": {
        type:"noun",
        gender:"fem",
        stem:"mačk"
    },

    "hus": {
        type:"noun",
        gender:"fem",
        stem:"hiž"
    },

    "gud": {
        type:"noun",
        gender:"masc",
        animacy:"anim",
        hardness:"hard",
        stem:"bog",
    },

    // ======================================
    // ADJECTIVES
    // ======================================

    "stor": {
        type:"adj",
        stem:"velik"
    },

    "fin": {
        type:"adj",
        stem:"ljep"
    },

    "dyr": {
        type:"adj",
        stem:"drog"
    },

    "grön": {
        type:"adj",
        stem:"zelen"
    },

    "röd": {
        type:"adj",
        stem:"črven"
    },

    // ======================================
    // VERBS
    // ======================================

    "ser": {
        type:"verb",
        infinitive:"viđeti",
        aspect:"impf",
        transitive:true
    },

    "gör": {
        type:"verb",
        infinitive:"delati",
        aspect:"impf",
        transitive:true
    },

    "springer": {
        type:"verb",
        infinitive:"trčati",
        aspect:"impf",
        transitive:false
    },

    // ======================================
    // PREPOSITIONS
    // ======================================

    "med": {
        type:"prep",
        vs:"z",
        forceCase:"inst"
    },

    "till": {
        type:"prep",
        vs:"do",
        forceCase:"gen"
    },

    "i": {
        type:"prep",
        vs:"v",
        forceCase:"lok"
    },

    "på": {
        type:"prep",
        vs:"na",
        forceCase:"lok"
    },

    // ======================================
    // TIME
    // ======================================

    "igår": {
        type:"time",
        tense:"past"
    },

    "imorgon": {
        type:"time",
        tense:"future"
    },

    "idag": {
        type:"time",
        tense:"present"
    },

    // ======================================
    // ADVERBS
    // ======================================

    "snabbt": {
        type:"adv",
        vs:"brzo"
    },

    "detta": {
        type:"adv",
        vs:"ta"
    },

    "denna": {
        type:"adv",
        vs:"taj"
    },

    "här": {
        type:"adv",
        vs:"tu"
    },

    "där": {
        type:"adv",
        vs:"tamo"
    },

    "vem": {
        type:"adv",
        vs:"kto"
    },

    "vad": {
        type:"adv",
        vs:"što"
    },

    "var": {
        type:"adv",
        vs:"kde"
    },

    "när": {
        type:"adv",
        vs:"kdaj"
    },

    "hur": {
        type:"adv",
        vs:"kako"
    },

    // ======================================
    // INTERJECTIONS
    // ======================================

    "hej": {
        type:"intr",
        vs:"zdravo"
    },

    "hejdå": {
        type:"intr",
        vs:"zbogom"
    },
};


// ==========================================
// STATE
// ==========================================

function createState(){

    return {

        person:3,
        number:"singular",
        gender:"masc",

        tense:"present",

        currentCase:"nom",
        forcedCase:null
    };
}

// ==========================================
// HELPERS
// ==========================================

function isPlural(word){

    return /(ar|er|or|na|n)$/.test(word);
}

function applyCase(original,translated){

    if(original === original.toUpperCase()){

        return translated.toUpperCase();
    }

    if(original[0] === original[0].toUpperCase()){

        return translated[0].toUpperCase() +
               translated.slice(1);
    }

    return translated;
}

function determineCase(state){

    return state.forcedCase ||
           state.currentCase ||
           "nom";
}

// ==========================================
// VERBS
// ==========================================

function getVerbStem(inf){

    return inf.slice(0,-2);
}

function conjugatePresent(inf,p,n){

    const stem = getVerbStem(inf);

    const endings = {

        singular:["m","š",""],
        plural:["me","te","jo"]
    };

    return stem + endings[n][p-1];
}

function conjugatePast(inf,p,n,g){

    const stem = getVerbStem(inf);

    const aux = {

        singular:["sem","si","je"],
        plural:["sme","ste","so"]
    };

    const endings = {

        masc:n==="plural"?"li":"l",
        fem:n==="plural"?"le":"la",
        neut:n==="plural"?"la":"lo"
    };

    return aux[n][p-1] +
           " " +
           stem +
           endings[g];
}

function conjugateFuture(inf,p,n,aspect){

    // imperfective
    if(aspect === "impf"){

        const aux = {

            singular:[
                "prijom",
                "prijoš",
                "prijo"
            ],

            plural:[
                "prijome",
                "prijote",
                "prijojo"
            ]
        };

        return aux[n][p-1] +
               " " +
               inf;
    }

    // perfective
    return conjugatePresent(inf,p,n);
}

function verbalNoun(inf){

    return getVerbStem(inf) + "nje";
}

// ==========================================
// NOUNS
// ==========================================

function declineNoun(
    entry,
    number,
    grammaticalCase
){

    // feminine
    if(entry.gender === "fem"){

        return entry.stem +
            grammar.nounEndings
                .fem
                [number]
                [grammaticalCase];
    }

    // neuter
    if(entry.gender === "neut"){

        return entry.stem +
            grammar.nounEndings
                .neut
                [number]
                [grammaticalCase];
    }

    // masculine
    return entry.stem +

        grammar.nounEndings
            .masc
            [entry.hardness]
            [number]
            [entry.animacy]
            [grammaticalCase];
}

// ==========================================
// ADJECTIVES
// ==========================================

function getAdjCategory(target){

    if(target.gender === "fem"){
        return "fem";
    }

    if(target.gender === "neut"){
        return "neut";
    }

    return target.animacy === "anim"
        ? "masc_anim"
        : "masc_inan";
}

function declineAdjective(
    entry,
    target,
    number,
    grammaticalCase
){

    const category =
        getAdjCategory(target);

    const ending =

        grammar.adjectiveEndings
            [number]
            [category]
            [grammaticalCase];

    return entry.stem + ending;
}

// ==========================================
// POSSESSIVES
// ==========================================

function declinePossessive(
    entry,
    target,
    number,
    grammaticalCase
){

    const category =
        getAdjCategory(target);

    const ending =

        grammar.possessiveEndings
            [number]
            [category]
            [grammaticalCase];

    return entry.base + ending;
}

// ==========================================
// REVERSE LOOKUP
// ==========================================

function reverseLookup(word){

    const lower = word.toLowerCase();

    for(let key in dictionary){

        const entry = dictionary[key];

        // PRONOUNS
        if(entry.type === "pron"){

            for(let c in entry.forms){

                if(entry.forms[c] === lower){
                    return key;
                }
            }
        }

        // NOUNS
        if(entry.type === "noun"){

            for(let number of [
                "singular",
                "plural"
            ]){

                for(let grammaticalCase of grammar.cases){

                    const form =
                        declineNoun(
                            entry,
                            number,
                            grammaticalCase
                        );

                    if(form === lower){
                        return key;
                    }
                }
            }
        }

        // ADJECTIVES
        if(entry.type === "adj"){

            const fakeTargets = [

                {
                    gender:"masc",
                    animacy:"anim"
                },

                {
                    gender:"masc",
                    animacy:"inan"
                },

                {
                    gender:"fem"
                },

                {
                    gender:"neut"
                }
            ];

            for(let target of fakeTargets){

                for(let number of [
                    "singular",
                    "plural"
                ]){

                    for(let grammaticalCase of grammar.cases){

                        const form =
                            declineAdjective(
                                entry,
                                target,
                                number,
                                grammaticalCase
                            );

                        if(form === lower){
                            return key;
                        }
                    }
                }
            }
        }

        // POSSESSIVES
        if(entry.type === "poss"){

            const fakeTargets = [

                {
                    gender:"masc",
                    animacy:"anim"
                },

                {
                    gender:"masc",
                    animacy:"inan"
                },

                {
                    gender:"fem"
                },

                {
                    gender:"neut"
                }
            ];

            for(let target of fakeTargets){

                for(let number of [
                    "singular",
                    "plural"
                ]){

                    for(let grammaticalCase of grammar.cases){

                        const form =
                            declinePossessive(
                                entry,
                                target,
                                number,
                                grammaticalCase
                            );

                        if(form === lower){
                            return key;
                        }
                    }
                }
            }
        }

        // VERBS
        if(entry.type === "verb"){

            const stem =
                getVerbStem(
                    entry.infinitive
                );

            if(lower.startsWith(stem)){
                return key;
            }
        }

        // ADVERBS
        if(entry.type === "adv"){

            if(entry.vs === lower){
                return key;
            }
        }
    }

    return word;
}

// ==========================================
// MAIN ENGINE
// ==========================================

function translateEngine(){

    const rawText =
        inputArea.value.trim();

    if(!rawText){

        outputArea.value = "";
        return;
    }

    const words =
        rawText.split(/\s+/);

    const result = [];

    const state =
        createState();

    for(let i=0;i<words.length;i++){

        const original =
            words[i];

        const word =
            original.toLowerCase();

        // ==================================
        // REVERSE MODE
        // ==================================

        if(!swedishToVistulian){

            result.push(
                reverseLookup(word)
            );

            continue;
        }

        // ==================================
        // LOOKUP
        // ==================================

        const entry =
            dictionary[word];

        if(!entry){

            result.push(original);
            continue;
        }

        // ==================================
        // TIME
        // ==================================

        if(entry.type === "time"){

            state.tense =
                entry.tense;

            continue;
        }

        // ==================================
        // PREPOSITIONS
        // ==================================

        if(entry.type === "prep"){

            state.forcedCase =
                entry.forceCase;

            result.push(entry.vs);

            continue;
        }

        // ==================================
        // PRONOUNS
        // ==================================

        if(entry.type === "pron"){

            state.person =
                entry.person;

            state.number =
                entry.number;

            state.gender =
                entry.gender;

            const grammaticalCase =
                determineCase(state);

            result.push(

                applyCase(
                    original,
                    entry.forms[
                        grammaticalCase
                    ]
                )
            );

            state.forcedCase = null;

            continue;
        }

        // ==================================
        // VERBS
        // ==================================

        if(entry.type === "verb"){

            let translated;

            // verbal noun
            if(
                words[i-1]?.toLowerCase()
                === "att"
            ){

                translated =
                    verbalNoun(
                        entry.infinitive
                    );
            }

            else if(
                state.tense === "past"
            ){

                translated =
                    conjugatePast(
                        entry.infinitive,
                        state.person,
                        state.number,
                        state.gender
                    );
            }

            else if(
                state.tense === "future"
            ){

                translated =
                    conjugateFuture(
                        entry.infinitive,
                        state.person,
                        state.number,
                        entry.aspect
                    );
            }

            else{

                translated =
                    conjugatePresent(
                        entry.infinitive,
                        state.person,
                        state.number
                    );
            }

            result.push(

                applyCase(
                    original,
                    translated
                )
            );

            state.currentCase =
                entry.transitive
                ? "akk"
                : "nom";

            continue;
        }

        // ==================================
        // NOUNS
        // ==================================

        if(entry.type === "noun"){

            const number =
                isPlural(word)
                ? "plural"
                : "singular";

            const grammaticalCase =
                determineCase(state);

            const translated =
                declineNoun(
                    entry,
                    number,
                    grammaticalCase
                );

            result.push(

                applyCase(
                    original,
                    translated
                )
            );

            state.gender =
                entry.gender;

            state.currentCase =
                "nom";

            state.forcedCase =
                null;

            continue;
        }

        // ==================================
        // ADJECTIVES
        // ==================================

        if(entry.type === "adj"){

            const nextWord =
                words[i+1]?.toLowerCase();

            const nextEntry =
                dictionary[nextWord];

            if(!nextEntry){

                result.push(original);
                continue;
            }

            const number =
                isPlural(nextWord)
                ? "plural"
                : "singular";

            const grammaticalCase =
                determineCase(state);

            const translated =
                declineAdjective(
                    entry,
                    nextEntry,
                    number,
                    grammaticalCase
                );

            result.push(

                applyCase(
                    original,
                    translated
                )
            );

            continue;
        }

        // ==================================
        // POSSESSIVES
        // ==================================

        if(entry.type === "poss"){

            const nextWord =
                words[i+1]?.toLowerCase();

            const nextEntry =
                dictionary[nextWord];

            if(!nextEntry){

                result.push(original);
                continue;
            }

            const number =
                isPlural(nextWord)
                ? "plural"
                : "singular";

            const grammaticalCase =
                determineCase(state);

            const translated =
                declinePossessive(
                    entry,
                    nextEntry,
                    number,
                    grammaticalCase
                );

            result.push(

                applyCase(
                    original,
                    translated
                )
            );

            continue;
        }

        // ==================================
        // ADVERBS
        // ==================================

        if(entry.type === "adv"){

            result.push(

                applyCase(
                    original,
                    entry.vs
                )
            );

            continue;
        }

        // ==================================
        // INTERJECTIONS
        // ==================================

        if(entry.type === "intr"){

            result.push(

                applyCase(
                    original,
                    entry.vs
                )
            );
            continue;
        }
    }

    outputArea.value =
        result.join(" ");
}

// ==========================================
// EVENTS
// ==========================================

inputArea.addEventListener(
    "input",
    translateEngine
);

// ==========================================
// SWAP
// ==========================================

exchangeBtn.addEventListener(
    "click",
    () => {

        swedishToVistulian =
            !swedishToVistulian;

        [
            labels[0].textContent,
            labels[1].textContent
        ] = [
            labels[1].textContent,
            labels[0].textContent
        ];

        inputArea.value = "";
        outputArea.value = "";
    }
);

// ==========================================
// COPY
// ==========================================

if(copyBtn){

    copyBtn.addEventListener(
        "click",
        () => {

            const text =
                outputArea.value;

            if(!text) return;

            navigator.clipboard
                .writeText(text)
                .then(() => {

                    copyMsg.style.opacity =
                        "1";

                    setTimeout(() => {

                        copyMsg.style.opacity =
                            "0";

                    },1200);
                });
        }
    );
}
