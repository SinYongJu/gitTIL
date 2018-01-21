
/*
*
*  browser detection
*
* 1. browser sniffing
*
* 2. feacher detection
*
*
*
*
* */

const browserInfo = (function(){

if (!Object.keys) {
    Object.keys = (function() {
        'use strict';
        let hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            let result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}

// 구 자바 스크립트의 경우 지원이 안되는 메서드들에 대한 지원



    const browserNavi = navigator;


    // console.log(browserNavi)

    class BrowserInfomation {
        constructor(obj) {
            // this.name;
            // this.version;
            // this.platform;
            // this.engine;
            // this.systemTime
            let date = new Date();
            this.setInfo(obj,date)
        }

        setInfo(obj,date){

            let dateString = date.toString();
            this.timestamp = {
                'stamp' :  date.getTime(),
                'date'  :  dateString
            }
            //현재 시간을 밀리세컨드 단위로 변환하여 보여줌 그래서 시간의 비교를 가능 하게 함
            // date 객체에 대해서는 알아봐야 할듯 함

            this.setBrowserEngine(obj);
            this.os = obj.platform;
            this.setName(obj);

        }//setInfo

        setBrowserEngine(obj){
           // app version의 체크는 브라우저 어느정도 공부를 하고 나서 해야 할듯
            // 더럽게 느릴꺼 같지만....
            // 정규식의 사용도 고려해보자!
            // 그리고 이런식으로 반복적으로 들어가는거 보다는 디비에 저장된 것들로 대조해 보는 방식이 좀더 좋을 거 같기도 하다.
         this.browserEngine = 'to do 정규표현식'


        }//setAppVers

        setName(obj){
            let name = obj.userAgent.toLowerCase();

            if(obj.appVersion.indexOf('trident')== -1){

                if (name.indexOf('opr') != -1 || name.indexOf('opera') != -1){
                    this.name = 'opera';
                }

                if (name.indexOf('firefox') != -1){
                    this.name = 'firefox';
                }

                if (name.indexOf('opr') == -1 && name.indexOf('firefox') == -1 && obj.vendor.toLowerCase() === 'google inc.'){

                    this.name = 'chrome';
                }
                if (browserNavi.vendor.toLowerCase().indexOf('apple')!=-1){
                    this.name = 'safari';
                }
            }else{
                // ie
                this.name = 'ie'
            }

        }//setName




    }



    const tmpInfo = new BrowserInfomation(browserNavi);
return tmpInfo
})();

const browserHandler = (function(){

    /*
 *
 *  요건 그냥 예시로 짜보는 브라우저 판별용 js 입니다, 브라우저 공부 끝나는 데로 바로 수정할 계획
 *
 *
 * */

    if(browserInfo.name==='opera'){return "-webkit-transform"}
    if(browserInfo.name==='chrome'){return "-webkit-transform"}
    if(browserInfo.name==='safari'){return "-webkit-transform"}
    if(browserInfo.name==='firefox'){return  "-moz-transform"}

    return  "-webkit-transform"
})()




