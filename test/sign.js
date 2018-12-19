let crypto = require("crypto");
const time = Math.round(new Date().getTime() / 1000)
console.log(time)
const request = require('request')
let sha1 = crypto.createHash('sha1');
// let hString = time + "dxl:www.daoxila.com";
// let hString = time + "d29c9a5f2cadab52cc2b746e680e5b8f42ced655";
let hString = time + "dxl:www.daoxila.com" + '18840822922';
// let hString = time + "phone=71010401221&status=1&addtime=1498215998&service=1&remarks=cs&price=1000" + 'd29c9a5f2cadab52cc2b746e680e5b8f42ced655';
// hString += '18840822822'
sha1.update(hString);
let h1 = sha1.digest('hex');
console.log(h1)

// const CryptoJS = require('crypto-js')
// console.log(CryptoJS.SHA1(hString).toString(CryptoJS.enc.Hex))
// let _sha1 = _crypto.createHash('sha1');
// _sha1.update(hString);
// console.log(_sha1.digest('hex'))
// const dightFixed = function(val, dight){  
//     val = Math.round(val/Math.pow(10,dight)) * Math.pow(10,dight);  
//     return val;  
// }

// console.log(Math.round(new Date().getTime() / 1000))
// console.log(parseInt((new Date).getTime()))

// function getLocalTime(nS) {   
//     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");    
// }   

const p = {
    from_site:'front',
    mode:'get_user_appoint_order',
    limit:'15',
    page:'1',
    type:'21',
    params: JSON.stringify({
        userId: '198575'
    })
}

const params = ksort(p)
console.log(params)
let str = ''
for (let item in params) {
    str += item;
    str += params[item];
}
console.log(str)

const data = md5(str)
console.log(data)

const token = md5('order201700006' + '1t69oskCpVFqZ5AMy7268b8W8s67TQizX7804' + time + data);
console.log(token)
function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

const url = `https://order.daoxila.com/appoint_order?from_site=front&limit=15&mode=get_user_appoint_order&page=1&params=%7B%22userId%22%3A%22198575%22%7D&type=21&secret_time=${time}&appid=order201700006&token=${token}`
// const url = `http://order.daoxila.com/appoint_order?act=get_user_appoint_order&appid=order201700006&from_site=front&limit=15&page=1&secret_time=${time}&type=21&params={userId:1}&token=${token}`
request(url, (err, res, body) => {
    console.log(body)
}) 

// const r = requ

function ksort(inputArr, sort_flags) {
    var tmp_arr = {},
        keys = [],
        sorter, i, k, that = this,
        strictForIn = false,
        populateArr = {};

    switch (sort_flags) {
        case 'SORT_STRING':
            // compare items as strings
            sorter = function (a, b) {
                return that.strnatcmp(a, b);
            };
            break;
        case 'SORT_LOCALE_STRING':
            // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
            var loc = this.i18n_loc_get_default();
            sorter = this.php_js.i18nLocales[loc].sorting;
            break;
        case 'SORT_NUMERIC':
            // compare items numerically
            sorter = function (a, b) {
                return ((a + 0) - (b + 0));
            };
            break;
        // case 'SORT_REGULAR': // compare items normally (don't change types)
        default:
            sorter = function (a, b) {
                var aFloat = parseFloat(a),
                    bFloat = parseFloat(b),
                    aNumeric = aFloat + '' === a,
                    bNumeric = bFloat + '' === b;
                if (aNumeric && bNumeric) {
                    return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
                } else if (aNumeric && !bNumeric) {
                    return 1;
                } else if (!aNumeric && bNumeric) {
                    return -1;
                }
                return a > b ? 1 : a < b ? -1 : 0;
            };
            break;
    }

    // Make a list of key names
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    keys.sort(sorter);

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
        .ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
        k = keys[i];
        tmp_arr[k] = inputArr[k];
        if (strictForIn) {
            delete inputArr[k];
        }
    }
    for (i in tmp_arr) {
        if (tmp_arr.hasOwnProperty(i)) {
            populateArr[i] = tmp_arr[i];
        }
    }

    return strictForIn || populateArr;
}
