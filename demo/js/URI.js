/*! URI.js v1.10.2 http://medialize.github.com/URI.js/ */
/* build contains: IPv6.js, punycode.js, SecondLevelDomains.js, URI.js, URITemplate.js */
(function(f,g){"object"===typeof exports?module.exports=g():"function"===typeof define&&define.amd?define(g):f.IPv6=g()})(this,function(){return{best:function(f){f=f.toLowerCase().split(":");var g=f.length,j=8;""===f[0]&&""===f[1]&&""===f[2]?(f.shift(),f.shift()):""===f[0]&&""===f[1]?f.shift():""===f[g-1]&&""===f[g-2]&&f.pop();g=f.length;-1!==f[g-1].indexOf(".")&&(j=7);var d;for(d=0;d<g&&""!==f[d];d++);if(d<j)for(f.splice(d,1,"0000");f.length<j;)f.splice(d,0,"0000");for(d=0;d<j;d++){for(var g=f[d].split(""),
r=0;3>r;r++)if("0"===g[0]&&1<g.length)g.splice(0,1);else break;f[d]=g.join("")}var g=-1,t=r=0,s=-1,h=!1;for(d=0;d<j;d++)h?"0"===f[d]?t+=1:(h=!1,t>r&&(g=s,r=t)):"0"==f[d]&&(h=!0,s=d,t=1);t>r&&(g=s,r=t);1<r&&f.splice(g,r,"");g=f.length;j="";""===f[0]&&(beststr=":");for(d=0;d<g;d++){j+=f[d];if(d===g-1)break;j+=":"}""===f[g-1]&&(j+=":");return j}}});
(function(f){function g(a){throw RangeError(k[a]);}function j(a,b){for(var c=a.length;c--;)a[c]=b(a[c]);return a}function d(a){for(var b=[],c=0,d=a.length,m,k;c<d;)m=a.charCodeAt(c++),55296==(m&63488)&&c<d?(k=a.charCodeAt(c++),56320==(k&64512)?b.push(((m&1023)<<10)+(k&1023)+65536):b.push(m,k)):b.push(m);return b}function r(a){return j(a,function(a){var b="";65535<a&&(a-=65536,b+=C(a>>>10&1023|55296),a=56320|a&1023);return b+=C(a)}).join("")}function t(a,b,c){var d=0;a=c?z(a/B):a>>1;for(a+=z(a/b);a>
v*x>>1;d+=l)a=z(a/v);return z(d+(v+1)*a/(a+u))}function s(c){var d=[],m=c.length,k,e=0,s=a,f=A,h,v,j,p,q;h=c.lastIndexOf(b);0>h&&(h=0);for(v=0;v<h;++v)128<=c.charCodeAt(v)&&g("not-basic"),d.push(c.charCodeAt(v));for(h=0<h?h+1:0;h<m;){v=e;k=1;for(j=l;;j+=l){h>=m&&g("invalid-input");p=c.charCodeAt(h++);p=10>p-48?p-22:26>p-65?p-65:26>p-97?p-97:l;(p>=l||p>z((n-e)/k))&&g("overflow");e+=p*k;q=j<=f?w:j>=f+x?x:j-f;if(p<q)break;p=l-q;k>z(n/p)&&g("overflow");k*=p}k=d.length+1;f=t(e-v,k,0==v);z(e/k)>n-s&&g("overflow");
s+=z(e/k);e%=k;d.splice(e++,0,s)}return r(d)}function h(c){var m,k,e,s,f,h,v,p,j,q=[],y,r,u;c=d(c);y=c.length;m=a;k=0;f=A;for(h=0;h<y;++h)j=c[h],128>j&&q.push(C(j));for((e=s=q.length)&&q.push(b);e<y;){v=n;for(h=0;h<y;++h)j=c[h],j>=m&&j<v&&(v=j);r=e+1;v-m>z((n-k)/r)&&g("overflow");k+=(v-m)*r;m=v;for(h=0;h<y;++h)if(j=c[h],j<m&&++k>n&&g("overflow"),j==m){p=k;for(v=l;;v+=l){j=v<=f?w:v>=f+x?x:v-f;if(p<j)break;u=p-j;p=l-j;q.push(C(j+u%p+22+75*(26>j+u%p)-0));p=z(u/p)}q.push(C(p+22+75*(26>p)-0));f=t(k,r,
e==s);k=0;++e}++k;++m}return q.join("")}var p,y="function"==typeof define&&"object"==typeof define.amd&&define.amd&&define,e="object"==typeof exports&&exports,q="object"==typeof module&&module,n=2147483647,l=36,w=1,x=26,u=38,B=700,A=72,a=128,b="-",c=/[^ -~]/,m=/^xn--/,k={overflow:"Overflow: input needs wider integers to process.","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},v=l-w,z=Math.floor,C=String.fromCharCode,D;p={version:"1.1.1",ucs2:{decode:d,
encode:r},decode:s,encode:h,toASCII:function(a){return j(a.split("."),function(a){return c.test(a)?"xn--"+h(a):a}).join(".")},toUnicode:function(a){return j(a.split("."),function(a){return m.test(a)?s(a.slice(4).toLowerCase()):a}).join(".")}};if(e)if(q&&q.exports==e)q.exports=p;else for(D in p)p.hasOwnProperty(D)&&(e[D]=p[D]);else y?define("punycode",p):f.punycode=p})(this);
(function(f,g){"object"===typeof exports?module.exports=g():"function"===typeof define&&define.amd?define(g):f.SecondLevelDomains=g()})(this,function(){var f=Object.prototype.hasOwnProperty,g={list:{ac:"com|gov|mil|net|org",ae:"ac|co|gov|mil|name|net|org|pro|sch",af:"com|edu|gov|net|org",al:"com|edu|gov|mil|net|org",ao:"co|ed|gv|it|og|pb",ar:"com|edu|gob|gov|int|mil|net|org|tur",at:"ac|co|gv|or",au:"asn|com|csiro|edu|gov|id|net|org",ba:"co|com|edu|gov|mil|net|org|rs|unbi|unmo|unsa|untz|unze",bb:"biz|co|com|edu|gov|info|net|org|store|tv",
bh:"biz|cc|com|edu|gov|info|net|org",bn:"com|edu|gov|net|org",bo:"com|edu|gob|gov|int|mil|net|org|tv",br:"adm|adv|agr|am|arq|art|ato|b|bio|blog|bmd|cim|cng|cnt|com|coop|ecn|edu|eng|esp|etc|eti|far|flog|fm|fnd|fot|fst|g12|ggf|gov|imb|ind|inf|jor|jus|lel|mat|med|mil|mus|net|nom|not|ntr|odo|org|ppg|pro|psc|psi|qsl|rec|slg|srv|tmp|trd|tur|tv|vet|vlog|wiki|zlg",bs:"com|edu|gov|net|org",bz:"du|et|om|ov|rg",ca:"ab|bc|mb|nb|nf|nl|ns|nt|nu|on|pe|qc|sk|yk",ck:"biz|co|edu|gen|gov|info|net|org",cn:"ac|ah|bj|com|cq|edu|fj|gd|gov|gs|gx|gz|ha|hb|he|hi|hl|hn|jl|js|jx|ln|mil|net|nm|nx|org|qh|sc|sd|sh|sn|sx|tj|tw|xj|xz|yn|zj",
co:"com|edu|gov|mil|net|nom|org",cr:"ac|c|co|ed|fi|go|or|sa",cy:"ac|biz|com|ekloges|gov|ltd|name|net|org|parliament|press|pro|tm","do":"art|com|edu|gob|gov|mil|net|org|sld|web",dz:"art|asso|com|edu|gov|net|org|pol",ec:"com|edu|fin|gov|info|med|mil|net|org|pro",eg:"com|edu|eun|gov|mil|name|net|org|sci",er:"com|edu|gov|ind|mil|net|org|rochest|w",es:"com|edu|gob|nom|org",et:"biz|com|edu|gov|info|name|net|org",fj:"ac|biz|com|info|mil|name|net|org|pro",fk:"ac|co|gov|net|nom|org",fr:"asso|com|f|gouv|nom|prd|presse|tm",
gg:"co|net|org",gh:"com|edu|gov|mil|org",gn:"ac|com|gov|net|org",gr:"com|edu|gov|mil|net|org",gt:"com|edu|gob|ind|mil|net|org",gu:"com|edu|gov|net|org",hk:"com|edu|gov|idv|net|org",id:"ac|co|go|mil|net|or|sch|web",il:"ac|co|gov|idf|k12|muni|net|org","in":"ac|co|edu|ernet|firm|gen|gov|i|ind|mil|net|nic|org|res",iq:"com|edu|gov|i|mil|net|org",ir:"ac|co|dnssec|gov|i|id|net|org|sch",it:"edu|gov",je:"co|net|org",jo:"com|edu|gov|mil|name|net|org|sch",jp:"ac|ad|co|ed|go|gr|lg|ne|or",ke:"ac|co|go|info|me|mobi|ne|or|sc",
kh:"com|edu|gov|mil|net|org|per",ki:"biz|com|de|edu|gov|info|mob|net|org|tel",km:"asso|com|coop|edu|gouv|k|medecin|mil|nom|notaires|pharmaciens|presse|tm|veterinaire",kn:"edu|gov|net|org",kr:"ac|busan|chungbuk|chungnam|co|daegu|daejeon|es|gangwon|go|gwangju|gyeongbuk|gyeonggi|gyeongnam|hs|incheon|jeju|jeonbuk|jeonnam|k|kg|mil|ms|ne|or|pe|re|sc|seoul|ulsan",kw:"com|edu|gov|net|org",ky:"com|edu|gov|net|org",kz:"com|edu|gov|mil|net|org",lb:"com|edu|gov|net|org",lk:"assn|com|edu|gov|grp|hotel|int|ltd|net|ngo|org|sch|soc|web",
lr:"com|edu|gov|net|org",lv:"asn|com|conf|edu|gov|id|mil|net|org",ly:"com|edu|gov|id|med|net|org|plc|sch",ma:"ac|co|gov|m|net|org|press",mc:"asso|tm",me:"ac|co|edu|gov|its|net|org|priv",mg:"com|edu|gov|mil|nom|org|prd|tm",mk:"com|edu|gov|inf|name|net|org|pro",ml:"com|edu|gov|net|org|presse",mn:"edu|gov|org",mo:"com|edu|gov|net|org",mt:"com|edu|gov|net|org",mv:"aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro",mw:"ac|co|com|coop|edu|gov|int|museum|net|org",mx:"com|edu|gob|net|org",my:"com|edu|gov|mil|name|net|org|sch",
nf:"arts|com|firm|info|net|other|per|rec|store|web",ng:"biz|com|edu|gov|mil|mobi|name|net|org|sch",ni:"ac|co|com|edu|gob|mil|net|nom|org",np:"com|edu|gov|mil|net|org",nr:"biz|com|edu|gov|info|net|org",om:"ac|biz|co|com|edu|gov|med|mil|museum|net|org|pro|sch",pe:"com|edu|gob|mil|net|nom|org|sld",ph:"com|edu|gov|i|mil|net|ngo|org",pk:"biz|com|edu|fam|gob|gok|gon|gop|gos|gov|net|org|web",pl:"art|bialystok|biz|com|edu|gda|gdansk|gorzow|gov|info|katowice|krakow|lodz|lublin|mil|net|ngo|olsztyn|org|poznan|pwr|radom|slupsk|szczecin|torun|warszawa|waw|wroc|wroclaw|zgora",
pr:"ac|biz|com|edu|est|gov|info|isla|name|net|org|pro|prof",ps:"com|edu|gov|net|org|plo|sec",pw:"belau|co|ed|go|ne|or",ro:"arts|com|firm|info|nom|nt|org|rec|store|tm|www",rs:"ac|co|edu|gov|in|org",sb:"com|edu|gov|net|org",sc:"com|edu|gov|net|org",sh:"co|com|edu|gov|net|nom|org",sl:"com|edu|gov|net|org",st:"co|com|consulado|edu|embaixada|gov|mil|net|org|principe|saotome|store",sv:"com|edu|gob|org|red",sz:"ac|co|org",tr:"av|bbs|bel|biz|com|dr|edu|gen|gov|info|k12|name|net|org|pol|tel|tsk|tv|web",tt:"aero|biz|cat|co|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel",
tw:"club|com|ebiz|edu|game|gov|idv|mil|net|org",mu:"ac|co|com|gov|net|or|org",mz:"ac|co|edu|gov|org",na:"co|com",nz:"ac|co|cri|geek|gen|govt|health|iwi|maori|mil|net|org|parliament|school",pa:"abo|ac|com|edu|gob|ing|med|net|nom|org|sld",pt:"com|edu|gov|int|net|nome|org|publ",py:"com|edu|gov|mil|net|org",qa:"com|edu|gov|mil|net|org",re:"asso|com|nom",ru:"ac|adygeya|altai|amur|arkhangelsk|astrakhan|bashkiria|belgorod|bir|bryansk|buryatia|cbg|chel|chelyabinsk|chita|chukotka|chuvashia|com|dagestan|e-burg|edu|gov|grozny|int|irkutsk|ivanovo|izhevsk|jar|joshkar-ola|kalmykia|kaluga|kamchatka|karelia|kazan|kchr|kemerovo|khabarovsk|khakassia|khv|kirov|koenig|komi|kostroma|kranoyarsk|kuban|kurgan|kursk|lipetsk|magadan|mari|mari-el|marine|mil|mordovia|mosreg|msk|murmansk|nalchik|net|nnov|nov|novosibirsk|nsk|omsk|orenburg|org|oryol|penza|perm|pp|pskov|ptz|rnd|ryazan|sakhalin|samara|saratov|simbirsk|smolensk|spb|stavropol|stv|surgut|tambov|tatarstan|tom|tomsk|tsaritsyn|tsk|tula|tuva|tver|tyumen|udm|udmurtia|ulan-ude|vladikavkaz|vladimir|vladivostok|volgograd|vologda|voronezh|vrn|vyatka|yakutia|yamal|yekaterinburg|yuzhno-sakhalinsk",
rw:"ac|co|com|edu|gouv|gov|int|mil|net",sa:"com|edu|gov|med|net|org|pub|sch",sd:"com|edu|gov|info|med|net|org|tv",se:"a|ac|b|bd|c|d|e|f|g|h|i|k|l|m|n|o|org|p|parti|pp|press|r|s|t|tm|u|w|x|y|z",sg:"com|edu|gov|idn|net|org|per",sn:"art|com|edu|gouv|org|perso|univ",sy:"com|edu|gov|mil|net|news|org",th:"ac|co|go|in|mi|net|or",tj:"ac|biz|co|com|edu|go|gov|info|int|mil|name|net|nic|org|test|web",tn:"agrinet|com|defense|edunet|ens|fin|gov|ind|info|intl|mincom|nat|net|org|perso|rnrt|rns|rnu|tourism",tz:"ac|co|go|ne|or",
ua:"biz|cherkassy|chernigov|chernovtsy|ck|cn|co|com|crimea|cv|dn|dnepropetrovsk|donetsk|dp|edu|gov|if|in|ivano-frankivsk|kh|kharkov|kherson|khmelnitskiy|kiev|kirovograd|km|kr|ks|kv|lg|lugansk|lutsk|lviv|me|mk|net|nikolaev|od|odessa|org|pl|poltava|pp|rovno|rv|sebastopol|sumy|te|ternopil|uzhgorod|vinnica|vn|zaporizhzhe|zhitomir|zp|zt",ug:"ac|co|go|ne|or|org|sc",uk:"ac|bl|british-library|co|cym|gov|govt|icnet|jet|lea|ltd|me|mil|mod|national-library-scotland|nel|net|nhs|nic|nls|org|orgn|parliament|plc|police|sch|scot|soc",
us:"dni|fed|isa|kids|nsn",uy:"com|edu|gub|mil|net|org",ve:"co|com|edu|gob|info|mil|net|org|web",vi:"co|com|k12|net|org",vn:"ac|biz|com|edu|gov|health|info|int|name|net|org|pro",ye:"co|com|gov|ltd|me|net|org|plc",yu:"ac|co|edu|gov|org",za:"ac|agric|alt|bourse|city|co|cybernet|db|edu|gov|grondar|iaccess|imt|inca|landesign|law|mil|net|ngo|nis|nom|olivetti|org|pix|school|tm|web",zm:"ac|co|com|edu|gov|net|org|sch"},has_expression:null,is_expression:null,has:function(f){return!!f.match(g.has_expression)},
is:function(f){return!!f.match(g.is_expression)},get:function(f){return(f=f.match(g.has_expression))&&f[1]||null},init:function(){var j="",d;for(d in g.list)f.call(g.list,d)&&(j+="|("+("("+g.list[d]+")."+d)+")");g.has_expression=RegExp("\\.("+j.substr(1)+")$","i");g.is_expression=RegExp("^("+j.substr(1)+")$","i")}};g.init();return g});
(function(f,g){"object"===typeof exports?module.exports=g(require("./punycode"),require("./IPv6"),require("./SecondLevelDomains")):"function"===typeof define&&define.amd?define(["./punycode","./IPv6","./SecondLevelDomains"],g):f.URI=g(f.punycode,f.IPv6,f.SecondLevelDomains)})(this,function(f,g,j){function d(a,b){if(!(this instanceof d))return new d(a,b);void 0===a&&(a="undefined"!==typeof location?location.href+"":"");this.href(a);return void 0!==b?this.absoluteTo(b):this}function r(a){return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g,
"\\$1")}function t(a){return String(Object.prototype.toString.call(a)).slice(8,-1)}function s(a){return"Array"===t(a)}function h(a,b){var c,d;if(s(b)){c=0;for(d=b.length;c<d;c++)if(!h(a,b[c]))return!1;return!0}var k=t(b);c=0;for(d=a.length;c<d;c++)if("RegExp"===k){if("string"===typeof a[c]&&a[c].match(b))return!0}else if(a[c]===b)return!0;return!1}function p(a,b){if(!s(a)||!s(b)||a.length!==b.length)return!1;a.sort();b.sort();for(var c=0,d=a.length;c<d;c++)if(a[c]!==b[c])return!1;return!0}function y(a){return encodeURIComponent(a).replace(/[!'()*]/g,
escape).replace(/\*/g,"%2A")}var e=d.prototype,q=Object.prototype.hasOwnProperty;d._parts=function(){return{protocol:null,username:null,password:null,hostname:null,urn:null,port:null,path:null,query:null,fragment:null,duplicateQueryParameters:d.duplicateQueryParameters}};d.duplicateQueryParameters=!1;d.protocol_expression=/^[a-z][a-z0-9-+-]*$/i;d.idn_expression=/[^a-z0-9\.-]/i;d.punycode_expression=/(xn--)/i;d.ip4_expression=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;d.ip6_expression=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
d.find_uri_expression=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig;d.defaultPorts={http:"80",https:"443",ftp:"21",gopher:"70",ws:"80",wss:"443"};d.invalid_hostname_characters=/[^a-zA-Z0-9\.-]/;d.encode=y;d.decode=decodeURIComponent;d.iso8859=function(){d.encode=escape;d.decode=unescape};d.unicode=function(){d.encode=
y;d.decode=decodeURIComponent};d.characters={pathname:{encode:{expression:/%(24|26|2B|2C|3B|3D|3A|40)/ig,map:{"%24":"$","%26":"&","%2B":"+","%2C":",","%3B":";","%3D":"=","%3A":":","%40":"@"}},decode:{expression:/[\/\?#]/g,map:{"/":"%2F","?":"%3F","#":"%23"}}},reserved:{encode:{expression:/%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,map:{"%3A":":","%2F":"/","%3F":"?","%23":"#","%5B":"[","%5D":"]","%40":"@","%21":"!","%24":"$","%26":"&","%27":"'","%28":"(","%29":")","%2A":"*","%2B":"+",
"%2C":",","%3B":";","%3D":"="}}}};d.encodeQuery=function(a){return d.encode(a+"").replace(/%20/g,"+")};d.decodeQuery=function(a){return d.decode((a+"").replace(/\+/g,"%20"))};d.recodePath=function(a){a=(a+"").split("/");for(var b=0,c=a.length;b<c;b++)a[b]=d.encodePathSegment(d.decode(a[b]));return a.join("/")};d.decodePath=function(a){a=(a+"").split("/");for(var b=0,c=a.length;b<c;b++)a[b]=d.decodePathSegment(a[b]);return a.join("/")};var n={encode:"encode",decode:"decode"},l,w=function(a,b){return function(c){return d[b](c+
"").replace(d.characters[a][b].expression,function(c){return d.characters[a][b].map[c]})}};for(l in n)d[l+"PathSegment"]=w("pathname",n[l]);d.encodeReserved=w("reserved","encode");d.parse=function(a,b){var c;b||(b={});c=a.indexOf("#");-1<c&&(b.fragment=a.substring(c+1)||null,a=a.substring(0,c));c=a.indexOf("?");-1<c&&(b.query=a.substring(c+1)||null,a=a.substring(0,c));"//"===a.substring(0,2)?(b.protocol="",a=a.substring(2),a=d.parseAuthority(a,b)):(c=a.indexOf(":"),-1<c&&(b.protocol=a.substring(0,
c),b.protocol&&!b.protocol.match(d.protocol_expression)?b.protocol=void 0:"file"===b.protocol?a=a.substring(c+3):"//"===a.substring(c+1,c+3)?(a=a.substring(c+3),a=d.parseAuthority(a,b)):(a=a.substring(c+1),b.urn=!0)));b.path=a;return b};d.parseHost=function(a,b){var c=a.indexOf("/"),d;-1===c&&(c=a.length);"["===a.charAt(0)?(d=a.indexOf("]"),b.hostname=a.substring(1,d)||null,b.port=a.substring(d+2,c)||null):a.indexOf(":")!==a.lastIndexOf(":")?(b.hostname=a.substring(0,c)||null,b.port=null):(d=a.substring(0,
c).split(":"),b.hostname=d[0]||null,b.port=d[1]||null);b.hostname&&"/"!==a.substring(c).charAt(0)&&(c++,a="/"+a);return a.substring(c)||"/"};d.parseAuthority=function(a,b){a=d.parseUserinfo(a,b);return d.parseHost(a,b)};d.parseUserinfo=function(a,b){var c=a.indexOf("@"),m=a.indexOf("/");-1<c&&(-1===m||c<m)?(m=a.substring(0,c).split(":"),b.username=m[0]?d.decode(m[0]):null,m.shift(),b.password=m[0]?d.decode(m.join(":")):null,a=a.substring(c+1)):(b.username=null,b.password=null);return a};d.parseQuery=
function(a){if(!a)return{};a=a.replace(/&+/g,"&").replace(/^\?*&*|&+$/g,"");if(!a)return{};var b={};a=a.split("&");for(var c=a.length,m,k,e=0;e<c;e++)m=a[e].split("="),k=d.decodeQuery(m.shift()),m=m.length?d.decodeQuery(m.join("=")):null,b[k]?("string"===typeof b[k]&&(b[k]=[b[k]]),b[k].push(m)):b[k]=m;return b};d.build=function(a){var b="";a.protocol&&(b+=a.protocol+":");if(!a.urn&&(b||a.hostname))b+="//";b+=d.buildAuthority(a)||"";"string"===typeof a.path&&("/"!==a.path.charAt(0)&&"string"===typeof a.hostname&&
(b+="/"),b+=a.path);"string"===typeof a.query&&a.query&&(b+="?"+a.query);"string"===typeof a.fragment&&a.fragment&&(b+="#"+a.fragment);return b};d.buildHost=function(a){var b="";if(a.hostname)d.ip6_expression.test(a.hostname)?b=a.port?b+("["+a.hostname+"]:"+a.port):b+a.hostname:(b+=a.hostname,a.port&&(b+=":"+a.port));else return"";return b};d.buildAuthority=function(a){return d.buildUserinfo(a)+d.buildHost(a)};d.buildUserinfo=function(a){var b="";a.username&&(b+=d.encode(a.username),a.password&&(b+=
":"+d.encode(a.password)),b+="@");return b};d.buildQuery=function(a,b){var c="",m,k,e,f;for(k in a)if(q.call(a,k)&&k)if(s(a[k])){m={};e=0;for(f=a[k].length;e<f;e++)void 0!==a[k][e]&&void 0===m[a[k][e]+""]&&(c+="&"+d.buildQueryParameter(k,a[k][e]),!0!==b&&(m[a[k][e]+""]=!0))}else void 0!==a[k]&&(c+="&"+d.buildQueryParameter(k,a[k]));return c.substring(1)};d.buildQueryParameter=function(a,b){return d.encodeQuery(a)+(null!==b?"="+d.encodeQuery(b):"")};d.addQuery=function(a,b,c){if("object"===typeof b)for(var m in b)q.call(b,
m)&&d.addQuery(a,m,b[m]);else if("string"===typeof b)void 0===a[b]?a[b]=c:("string"===typeof a[b]&&(a[b]=[a[b]]),s(c)||(c=[c]),a[b]=a[b].concat(c));else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");};d.removeQuery=function(a,b,c){var m;if(s(b)){c=0;for(m=b.length;c<m;c++)a[b[c]]=void 0}else if("object"===typeof b)for(m in b)q.call(b,m)&&d.removeQuery(a,m,b[m]);else if("string"===typeof b)if(void 0!==c)if(a[b]===c)a[b]=void 0;else{if(s(a[b])){m=a[b];var k={},
e,f;if(s(c)){e=0;for(f=c.length;e<f;e++)k[c[e]]=!0}else k[c]=!0;e=0;for(f=m.length;e<f;e++)void 0!==k[m[e]]&&(m.splice(e,1),f--,e--);a[b]=m}}else a[b]=void 0;else throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");};d.hasQuery=function(a,b,c,m){if("object"===typeof b){for(var e in b)if(q.call(b,e)&&!d.hasQuery(a,e,b[e]))return!1;return!0}if("string"!==typeof b)throw new TypeError("URI.hasQuery() accepts an object, string as the name parameter");switch(t(c)){case "Undefined":return b in
a;case "Boolean":return a=Boolean(s(a[b])?a[b].length:a[b]),c===a;case "Function":return!!c(a[b],b,a);case "Array":return!s(a[b])?!1:(m?h:p)(a[b],c);case "RegExp":return!s(a[b])?Boolean(a[b]&&a[b].match(c)):!m?!1:h(a[b],c);case "Number":c=String(c);case "String":return!s(a[b])?a[b]===c:!m?!1:h(a[b],c);default:throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");}};d.commonPath=function(a,b){var c=Math.min(a.length,b.length),d;for(d=
0;d<c;d++)if(a.charAt(d)!==b.charAt(d)){d--;break}if(1>d)return a.charAt(0)===b.charAt(0)&&"/"===a.charAt(0)?"/":"";if("/"!==a.charAt(d)||"/"!==b.charAt(d))d=a.substring(0,d).lastIndexOf("/");return a.substring(0,d+1)};d.withinString=function(a,b){return a.replace(d.find_uri_expression,b)};d.ensureValidHostname=function(a){if(a.match(d.invalid_hostname_characters)){if(!f)throw new TypeError("Hostname '"+a+"' contains characters other than [A-Z0-9.-] and Punycode.js is not available");if(f.toASCII(a).match(d.invalid_hostname_characters))throw new TypeError("Hostname '"+
a+"' contains characters other than [A-Z0-9.-]");}};e.build=function(a){if(!0===a)this._deferred_build=!0;else if(void 0===a||this._deferred_build)this._string=d.build(this._parts),this._deferred_build=!1;return this};e.clone=function(){return new d(this)};e.valueOf=e.toString=function(){return this.build(!1)._string};n={protocol:"protocol",username:"username",password:"password",hostname:"hostname",port:"port"};w=function(a){return function(b,c){if(void 0===b)return this._parts[a]||"";this._parts[a]=
b;this.build(!c);return this}};for(l in n)e[l]=w(n[l]);n={query:"?",fragment:"#"};w=function(a,b){return function(c,d){if(void 0===c)return this._parts[a]||"";null!==c&&(c+="",c.charAt(0)===b&&(c=c.substring(1)));this._parts[a]=c;this.build(!d);return this}};for(l in n)e[l]=w(l,n[l]);n={search:["?","query"],hash:["#","fragment"]};w=function(a,b){return function(c,d){var e=this[a](c,d);return"string"===typeof e&&e.length?b+e:e}};for(l in n)e[l]=w(n[l][1],n[l][0]);e.pathname=function(a,b){if(void 0===
a||!0===a){var c=this._parts.path||(this._parts.urn?"":"/");return a?d.decodePath(c):c}this._parts.path=a?d.recodePath(a):"/";this.build(!b);return this};e.path=e.pathname;e.href=function(a,b){var c;if(void 0===a)return this.toString();this._string="";this._parts=d._parts();var e=a instanceof d,k="object"===typeof a&&(a.hostname||a.path);!e&&(k&&void 0!==a.pathname)&&(a=a.toString());if("string"===typeof a)this._parts=d.parse(a,this._parts);else if(e||k)for(c in e=e?a._parts:a,e)q.call(this._parts,
c)&&(this._parts[c]=e[c]);else throw new TypeError("invalid input");this.build(!b);return this};e.is=function(a){var b=!1,c=!1,e=!1,k=!1,f=!1,s=!1,h=!1,g=!this._parts.urn;this._parts.hostname&&(g=!1,c=d.ip4_expression.test(this._parts.hostname),e=d.ip6_expression.test(this._parts.hostname),b=c||e,f=(k=!b)&&j&&j.has(this._parts.hostname),s=k&&d.idn_expression.test(this._parts.hostname),h=k&&d.punycode_expression.test(this._parts.hostname));switch(a.toLowerCase()){case "relative":return g;case "absolute":return!g;
case "domain":case "name":return k;case "sld":return f;case "ip":return b;case "ip4":case "ipv4":case "inet4":return c;case "ip6":case "ipv6":case "inet6":return e;case "idn":return s;case "url":return!this._parts.urn;case "urn":return!!this._parts.urn;case "punycode":return h}return null};var x=e.protocol,u=e.port,B=e.hostname;e.protocol=function(a,b){if(void 0!==a&&a&&(a=a.replace(/:(\/\/)?$/,""),a.match(/[^a-zA-z0-9\.+-]/)))throw new TypeError("Protocol '"+a+"' contains characters other than [A-Z0-9.+-]");
return x.call(this,a,b)};e.scheme=e.protocol;e.port=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0!==a&&(0===a&&(a=null),a&&(a+="",":"===a.charAt(0)&&(a=a.substring(1)),a.match(/[^0-9]/))))throw new TypeError("Port '"+a+"' contains characters other than [0-9]");return u.call(this,a,b)};e.hostname=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0!==a){var c={};d.parseHost(a,c);a=c.hostname}return B.call(this,a,b)};e.host=function(a,b){if(this._parts.urn)return void 0===
a?"":this;if(void 0===a)return this._parts.hostname?d.buildHost(this._parts):"";d.parseHost(a,this._parts);this.build(!b);return this};e.authority=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a)return this._parts.hostname?d.buildAuthority(this._parts):"";d.parseAuthority(a,this._parts);this.build(!b);return this};e.userinfo=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){if(!this._parts.username)return"";var c=d.buildUserinfo(this._parts);return c.substring(0,
c.length-1)}"@"!==a[a.length-1]&&(a+="@");d.parseUserinfo(a,this._parts);this.build(!b);return this};e.resource=function(a,b){var c;if(void 0===a)return this.path()+this.search()+this.hash();c=d.parse(a);this._parts.path=c.path;this._parts.query=c.query;this._parts.fragment=c.fragment;this.build(!b);return this};e.subdomain=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.length-this.domain().length-
1;return this._parts.hostname.substring(0,c)||""}c=this._parts.hostname.length-this.domain().length;c=this._parts.hostname.substring(0,c);c=RegExp("^"+r(c));a&&"."!==a.charAt(a.length-1)&&(a+=".");a&&d.ensureValidHostname(a);this._parts.hostname=this._parts.hostname.replace(c,a);this.build(!b);return this};e.domain=function(a,b){if(this._parts.urn)return void 0===a?"":this;"boolean"===typeof a&&(b=a,a=void 0);if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.match(/\./g);
if(c&&2>c.length)return this._parts.hostname;c=this._parts.hostname.length-this.tld(b).length-1;c=this._parts.hostname.lastIndexOf(".",c-1)+1;return this._parts.hostname.substring(c)||""}if(!a)throw new TypeError("cannot set domain empty");d.ensureValidHostname(a);!this._parts.hostname||this.is("IP")?this._parts.hostname=a:(c=RegExp(r(this.domain())+"$"),this._parts.hostname=this._parts.hostname.replace(c,a));this.build(!b);return this};e.tld=function(a,b){if(this._parts.urn)return void 0===a?"":
this;"boolean"===typeof a&&(b=a,a=void 0);if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.lastIndexOf("."),c=this._parts.hostname.substring(c+1);return!0!==b&&j&&j.list[c.toLowerCase()]?j.get(this._parts.hostname)||c:c}if(a)if(a.match(/[^a-zA-Z0-9-]/))if(j&&j.is(a))c=RegExp(r(this.tld())+"$"),this._parts.hostname=this._parts.hostname.replace(c,a);else throw new TypeError("TLD '"+a+"' contains characters other than [A-Z0-9]");else{if(!this._parts.hostname||
this.is("IP"))throw new ReferenceError("cannot set TLD on non-domain host");c=RegExp(r(this.tld())+"$");this._parts.hostname=this._parts.hostname.replace(c,a)}else throw new TypeError("cannot set TLD empty");this.build(!b);return this};e.directory=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path&&!this._parts.hostname)return"";if("/"===this._parts.path)return"/";var c=this._parts.path.length-this.filename().length-1,c=this._parts.path.substring(0,
c)||(this._parts.hostname?"/":"");return a?d.decodePath(c):c}c=this._parts.path.length-this.filename().length;c=this._parts.path.substring(0,c);c=RegExp("^"+r(c));this.is("relative")||(a||(a="/"),"/"!==a.charAt(0)&&(a="/"+a));a&&"/"!==a.charAt(a.length-1)&&(a+="/");a=d.recodePath(a);this._parts.path=this._parts.path.replace(c,a);this.build(!b);return this};e.filename=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path||"/"===this._parts.path)return"";
var c=this._parts.path.lastIndexOf("/"),c=this._parts.path.substring(c+1);return a?d.decodePathSegment(c):c}c=!1;"/"===a.charAt(0)&&(a=a.substring(1));a.match(/\.?\//)&&(c=!0);var e=RegExp(r(this.filename())+"$");a=d.recodePath(a);this._parts.path=this._parts.path.replace(e,a);c?this.normalizePath(b):this.build(!b);return this};e.suffix=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path||"/"===this._parts.path)return"";var c=this.filename(),e=c.lastIndexOf(".");
if(-1===e)return"";c=c.substring(e+1);c=/^[a-z0-9%]+$/i.test(c)?c:"";return a?d.decodePathSegment(c):c}"."===a.charAt(0)&&(a=a.substring(1));if(c=this.suffix())e=a?RegExp(r(c)+"$"):RegExp(r("."+c)+"$");else{if(!a)return this;this._parts.path+="."+d.recodePath(a)}e&&(a=d.recodePath(a),this._parts.path=this._parts.path.replace(e,a));this.build(!b);return this};e.segment=function(a,b,c){var d=this._parts.urn?":":"/",e=this.path(),f="/"===e.substring(0,1),e=e.split(d);"number"!==typeof a&&(c=b,b=a,a=
void 0);if(void 0!==a&&"number"!==typeof a)throw Error("Bad segment '"+a+"', must be 0-based integer");f&&e.shift();0>a&&(a=Math.max(e.length+a,0));if(void 0===b)return void 0===a?e:e[a];if(null===a||void 0===e[a])if(s(b))e=b;else{if(b||"string"===typeof b&&b.length)""===e[e.length-1]?e[e.length-1]=b:e.push(b)}else b||"string"===typeof b&&b.length?e[a]=b:e.splice(a,1);f&&e.unshift("");return this.path(e.join(d),c)};var A=e.query;e.query=function(a,b){if(!0===a)return d.parseQuery(this._parts.query);
if("function"===typeof a){var c=d.parseQuery(this._parts.query),e=a.call(this,c);this._parts.query=d.buildQuery(e||c,this._parts.duplicateQueryParameters);this.build(!b);return this}return void 0!==a&&"string"!==typeof a?(this._parts.query=d.buildQuery(a,this._parts.duplicateQueryParameters),this.build(!b),this):A.call(this,a,b)};e.setQuery=function(a,b,c){var e=d.parseQuery(this._parts.query);if("object"===typeof a)for(var f in a)q.call(a,f)&&(e[f]=a[f]);else if("string"===typeof a)e[a]=void 0!==
b?b:null;else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");this._parts.query=d.buildQuery(e,this._parts.duplicateQueryParameters);"string"!==typeof a&&(c=b);this.build(!c);return this};e.addQuery=function(a,b,c){var e=d.parseQuery(this._parts.query);d.addQuery(e,a,void 0===b?null:b);this._parts.query=d.buildQuery(e,this._parts.duplicateQueryParameters);"string"!==typeof a&&(c=b);this.build(!c);return this};e.removeQuery=function(a,b,c){var e=d.parseQuery(this._parts.query);
d.removeQuery(e,a,b);this._parts.query=d.buildQuery(e,this._parts.duplicateQueryParameters);"string"!==typeof a&&(c=b);this.build(!c);return this};e.hasQuery=function(a,b,c){var e=d.parseQuery(this._parts.query);return d.hasQuery(e,a,b,c)};e.setSearch=e.setQuery;e.addSearch=e.addQuery;e.removeSearch=e.removeQuery;e.hasSearch=e.hasQuery;e.normalize=function(){return this._parts.urn?this.normalizeProtocol(!1).normalizeQuery(!1).normalizeFragment(!1).build():this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()};
e.normalizeProtocol=function(a){"string"===typeof this._parts.protocol&&(this._parts.protocol=this._parts.protocol.toLowerCase(),this.build(!a));return this};e.normalizeHostname=function(a){this._parts.hostname&&(this.is("IDN")&&f?this._parts.hostname=f.toASCII(this._parts.hostname):this.is("IPv6")&&g&&(this._parts.hostname=g.best(this._parts.hostname)),this._parts.hostname=this._parts.hostname.toLowerCase(),this.build(!a));return this};e.normalizePort=function(a){"string"===typeof this._parts.protocol&&
this._parts.port===d.defaultPorts[this._parts.protocol]&&(this._parts.port=null,this.build(!a));return this};e.normalizePath=function(a){if(this._parts.urn||!this._parts.path||"/"===this._parts.path)return this;var b,c=this._parts.path,e,f;"/"!==c.charAt(0)&&("."===c.charAt(0)&&c.substring(0,c.indexOf("/")),b=!0,c="/"+c);for(c=c.replace(/(\/(\.\/)+)|\/{2,}/g,"/");;){e=c.indexOf("/../");if(-1===e)break;else if(0===e){c=c.substring(3);break}f=c.substring(0,e).lastIndexOf("/");-1===f&&(f=e);c=c.substring(0,
f)+c.substring(e+3)}b&&this.is("relative")&&(c=c.substring(1));c=d.recodePath(c);this._parts.path=c;this.build(!a);return this};e.normalizePathname=e.normalizePath;e.normalizeQuery=function(a){"string"===typeof this._parts.query&&(this._parts.query.length?this.query(d.parseQuery(this._parts.query)):this._parts.query=null,this.build(!a));return this};e.normalizeFragment=function(a){this._parts.fragment||(this._parts.fragment=null,this.build(!a));return this};e.normalizeSearch=e.normalizeQuery;e.normalizeHash=
e.normalizeFragment;e.iso8859=function(){var a=d.encode,b=d.decode;d.encode=escape;d.decode=decodeURIComponent;this.normalize();d.encode=a;d.decode=b;return this};e.unicode=function(){var a=d.encode,b=d.decode;d.encode=y;d.decode=unescape;this.normalize();d.encode=a;d.decode=b;return this};e.readable=function(){var a=this.clone();a.username("").password("").normalize();var b="";a._parts.protocol&&(b+=a._parts.protocol+"://");a._parts.hostname&&(a.is("punycode")&&f?(b+=f.toUnicode(a._parts.hostname),
a._parts.port&&(b+=":"+a._parts.port)):b+=a.host());a._parts.hostname&&(a._parts.path&&"/"!==a._parts.path.charAt(0))&&(b+="/");b+=a.path(!0);if(a._parts.query){for(var c="",e=0,s=a._parts.query.split("&"),g=s.length;e<g;e++){var h=(s[e]||"").split("="),c=c+("&"+d.decodeQuery(h[0]).replace(/&/g,"%26"));void 0!==h[1]&&(c+="="+d.decodeQuery(h[1]).replace(/&/g,"%26"))}b+="?"+c.substring(1)}return b+=a.hash()};e.absoluteTo=function(a){var b=this.clone(),c=["protocol","username","password","hostname",
"port"],e,f;if(this._parts.urn)throw Error("URNs do not have any generally defined hierachical components");a instanceof d||(a=new d(a));b._parts.protocol||(b._parts.protocol=a._parts.protocol);if(this._parts.hostname)return b;e=0;for(f;f=c[e];e++)b._parts[f]=a._parts[f];c=["query","path"];e=0;for(f;f=c[e];e++)!b._parts[f]&&a._parts[f]&&(b._parts[f]=a._parts[f]);"/"!==b.path().charAt(0)&&(a=a.directory(),b._parts.path=(a?a+"/":"")+b._parts.path,b.normalizePath());b.build();return b};e.relativeTo=
function(a){var b=this.clone(),c=["protocol","username","password","hostname","port"],e;if(b._parts.urn)throw Error("URNs do not have any generally defined hierachical components");a instanceof d||(a=new d(a));if("/"!==b.path().charAt(0)||"/"!==a.path().charAt(0))throw Error("Cannot calculate common path from non-relative URLs");e=d.commonPath(b.path(),a.path());for(var f=0,s;s=c[f];f++)b._parts[s]=null;if("/"===e)return b;if(!e)return this.clone();a=a.directory();c=b.directory();if(a===c)return b._parts.path=
b.filename(),b.build();a.substring(e.length);c=c.substring(e.length);if(a+"/"===e)return c&&(c+="/"),b._parts.path=c+b.filename(),b.build();c="../";e=RegExp("^"+r(e));for(a=a.replace(e,"/").match(/\//g).length-1;a--;)c+="../";b._parts.path=b._parts.path.replace(e,c);return b.build()};e.equals=function(a){var b=this.clone();a=new d(a);var c={},e={},f={},h;b.normalize();a.normalize();if(b.toString()===a.toString())return!0;c=b.query();e=a.query();b.query("");a.query("");if(b.toString()!==a.toString()||
c.length!==e.length)return!1;c=d.parseQuery(c);e=d.parseQuery(e);for(h in c)if(q.call(c,h)){if(s(c[h])){if(!p(c[h],e[h]))return!1}else if(c[h]!==e[h])return!1;f[h]=!0}for(h in e)if(q.call(e,h)&&!f[h])return!1;return!0};e.duplicateQueryParameters=function(a){this._parts.duplicateQueryParameters=!!a;return this};return d});
(function(f,g){"object"===typeof exports?module.exports=g(require("./URI")):"function"===typeof define&&define.amd?define(["./URI"],g):f.URITemplate=g(f.URI)})(this,function(f){function g(d){if(g._cache[d])return g._cache[d];if(!(this instanceof g))return new g(d);this.expression=d;g._cache[d]=this;return this}function j(d){this.data=d;this.cache={}}var d=Object.prototype.hasOwnProperty,r=g.prototype,t={"":{prefix:"",separator:",",named:!1,empty_name_separator:!1,encode:"encode"},"+":{prefix:"",separator:",",
named:!1,empty_name_separator:!1,encode:"encodeReserved"},"#":{prefix:"#",separator:",",named:!1,empty_name_separator:!1,encode:"encodeReserved"},".":{prefix:".",separator:".",named:!1,empty_name_separator:!1,encode:"encode"},"/":{prefix:"/",separator:"/",named:!1,empty_name_separator:!1,encode:"encode"},";":{prefix:";",separator:";",named:!0,empty_name_separator:!1,encode:"encode"},"?":{prefix:"?",separator:"&",named:!0,empty_name_separator:!0,encode:"encode"},"&":{prefix:"&",separator:"&",named:!0,
empty_name_separator:!0,encode:"encode"}};g._cache={};g.EXPRESSION_PATTERN=/\{([^a-zA-Z0-9%_]?)([^\}]+)(\}|$)/g;g.VARIABLE_PATTERN=/^([^*:]+)((\*)|:(\d+))?$/;g.VARIABLE_NAME_PATTERN=/[^a-zA-Z0-9%_]/;g.expand=function(d,f){var p=t[d.operator],j=p.named?"Named":"Unnamed",e=d.variables,q=[],n,l,r;for(r=0;l=e[r];r++)n=f.get(l.name),n.val.length?q.push(g["expand"+j](n,p,l.explode,l.explode&&p.separator||",",l.maxlength,l.name)):n.type&&q.push("");return q.length?p.prefix+q.join(p.separator):""};g.expandNamed=
function(d,h,g,j,e,q){var n="",l=h.encode;h=h.empty_name_separator;var r=!d[l].length,x=2===d.type?"":f[l](q),u,t,A;t=0;for(A=d.val.length;t<A;t++)e?(u=f[l](d.val[t][1].substring(0,e)),2===d.type&&(x=f[l](d.val[t][0].substring(0,e)))):r?(u=f[l](d.val[t][1]),2===d.type?(x=f[l](d.val[t][0]),d[l].push([x,u])):d[l].push([void 0,u])):(u=d[l][t][1],2===d.type&&(x=d[l][t][0])),n&&(n+=j),g?n+=x+(h||u?"=":"")+u:(t||(n+=f[l](q)+(h||u?"=":"")),2===d.type&&(n+=x+","),n+=u);return n};g.expandUnnamed=function(d,
h,g,j,e){var q="",n=h.encode;h=h.empty_name_separator;var l=!d[n].length,r,t,u,B;u=0;for(B=d.val.length;u<B;u++)e?t=f[n](d.val[u][1].substring(0,e)):l?(t=f[n](d.val[u][1]),d[n].push([2===d.type?f[n](d.val[u][0]):void 0,t])):t=d[n][u][1],q&&(q+=j),2===d.type&&(r=e?f[n](d.val[u][0].substring(0,e)):d[n][u][0],q+=r,q=g?q+(h||t?"=":""):q+","),q+=t;return q};r.expand=function(d){var f="";(!this.parts||!this.parts.length)&&this.parse();d instanceof j||(d=new j(d));for(var p=0,r=this.parts.length;p<r;p++)f+=
"string"===typeof this.parts[p]?this.parts[p]:g.expand(this.parts[p],d);return f};r.parse=function(){var d=this.expression,f=g.EXPRESSION_PATTERN,j=g.VARIABLE_PATTERN,r=g.VARIABLE_NAME_PATTERN,e=[],q=0,n,l,w;for(f.lastIndex=0;;){l=f.exec(d);if(null===l){e.push(d.substring(q));break}else e.push(d.substring(q,l.index)),q=l.index+l[0].length;if(t[l[1]]){if(!l[3])throw Error('Unclosed Expression "'+l[0]+'"');}else throw Error('Unknown Operator "'+l[1]+'" in "'+l[0]+'"');n=l[2].split(",");for(var x=0,
u=n.length;x<u;x++){w=n[x].match(j);if(null===w)throw Error('Invalid Variable "'+n[x]+'" in "'+l[0]+'"');if(w[1].match(r))throw Error('Invalid Variable Name "'+w[1]+'" in "'+l[0]+'"');n[x]={name:w[1],explode:!!w[3],maxlength:w[4]&&parseInt(w[4],10)}}if(!n.length)throw Error('Expression Missing Variable(s) "'+l[0]+'"');e.push({expression:l[0],operator:l[1],variables:n})}e.length||e.push(d);this.parts=e;return this};j.prototype.get=function(f){var h=this.data,g={type:0,val:[],encode:[],encodeReserved:[]},
j;if(void 0!==this.cache[f])return this.cache[f];this.cache[f]=g;h="[object Function]"===String(Object.prototype.toString.call(h))?h(f):"[object Function]"===String(Object.prototype.toString.call(h[f]))?h[f](f):h[f];if(!(void 0===h||null===h))if("[object Array]"===String(Object.prototype.toString.call(h))){j=0;for(f=h.length;j<f;j++)void 0!==h[j]&&null!==h[j]&&g.val.push([void 0,String(h[j])]);g.val.length&&(g.type=3)}else if("[object Object]"===String(Object.prototype.toString.call(h))){for(j in h)d.call(h,
j)&&(void 0!==h[j]&&null!==h[j])&&g.val.push([j,String(h[j])]);g.val.length&&(g.type=2)}else g.type=1,g.val.push([void 0,String(h)]);return g};f.expand=function(d,h){var j=(new g(d)).expand(h);return new f(j)};return g});
