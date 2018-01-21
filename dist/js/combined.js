
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






/*
*
*  17/12/31 까지 한거 일단 css를 이용한 롤링 슬라이더를 구현 하였다 소스가 조금 많이 더럽다
*
*   앞서서 구현한 클릭 rolling 일방향 슬라이더와 통합 하는 과정을 진행 하려고 합니다.
*
*    1. rolling false일때 일방향
*
*
*   아래 pagination btn 적용의 클래스 붙였다 띄었다 하는 util함수의 생성
* */



"use strict";

class RollingSlide{

    constructor(slideContainer,slide,rolling = true){

        this.rolling = rolling
        this.isInit = false;
        this.slideContainerClassname = slideContainer
        this.slideClassname =slide
        this.setContainer(slideContainer);
        this.setSlides(slide);
        this.slideLength = this.slides.length;
        this.init(this.rolling,slide);


        //
        // let cssHandler = {
        //     'width' : function(){this.}
        // }
        //
        //

    }

    leftMovement(callback){

        let tmparr = [];
        let slideLastIndex = this.slideLength-1;

        this.slides.forEach((item, index, items)=>{
            if(index == 0){

                tmparr[index] = items[slideLastIndex];

            }else{

                tmparr[index] = items[index-1]

            }
        });

        for(let i =0; i < tmparr.length; i++){

            if(i == 1)tmparr[i].classList.add('on')

            this.container.appendChild(tmparr[i])

        }



        if(typeof callback === 'function' && callback()){

            console.log('left animate func');

        }


    }

    rightMovement(callback){

        let tmparr = [];
        let slideLastIndex = this.slideLength-1;

        this.slides.forEach((item, index, items)=>{

            if(index == 0){

                tmparr[slideLastIndex] = items[index];

            }else{

                tmparr[index-1] = items[index]

            }
        });



        // util 화
        for(let i =0; i < tmparr.length; i++){
            if(i == 1)tmparr[i].classList.add('on')
            this.container.appendChild(tmparr[i])

        }




        if(typeof callback === 'function'  && callback() ){

            console.log('right animate func');
        }

    }

    initStyleCss(el,obj){




    }



    init(rolling,slide){

               console.log('welcome')

        // util 화

        this.container.style['width'] = this.slideLength * this.slides[0].clientWidth + 'px';
        this.container.style['position'] = 'absolute'
        this.container.style['left'] = -this.slides[0].clientWidth + 'px';

        // this.slides.forEach((item,index,items)=>{
            this.container.style['transition'] = '500ms'
        // });


        if(rolling){
            this.convertRoll(slide)

        }else{
            this.convertOneway(slide)

        }

        this.isInit = true;


    }

    convertRoll(slide){

        this.leftMovement()
        this.slides = this.setSlides(slide);

    }



    convertOneway(slide){

        this.leftMovement()
        this.slides = this.setSlides(slide);

    }


    onewayAnimate(type){

    }

    animate(type){

    }


    setContainer(str){

        return this.container =  document.querySelector(str);

    }

    setSlides(str){

        this.slides =  document.querySelectorAll(str);

        return  this.slides
    }

}



class slideV3 extends RollingSlide{

    constructor(slideContainer,slide,rolling){

        super(slideContainer,slide,rolling);


        document.addEventListener('click',(event)=>{
        //왜인지 여기서 문제가 생기는 듯 함. 따로 지정해 줘야 할 것 같음
            event.preventDefault();

            // console.log(this)
            this.target = document.querySelector(this.slideContainerClassname+'>'+this.slideClassname+'.on');

            let type = event.target.getAttribute('data-dir');

            // this.target = document.querySelector(this.slideClassname+'.on');





            if(type == null)return


            console.log(this.target)

            this.target.classList.remove('on');


            console.log(typeof this.animate)


            if(type ==='right'){

                this.animate(type,()=>this.rightMovement());

            }else if(type ==='left'){

                this.animate(type,()=>this.leftMovement());

            }


            this.slides = this.setSlides(this.slideClassname);
        });

    }

    animate(type,callback){
        let directionType = 'move_'+type

        console.log(directionType)


        this.target.classList.add(directionType);
        this.target.previousElementSibling.classList.add(directionType)
        this.target.nextElementSibling.classList.add(directionType)
        // this.target.style['marginLeft'] = '-20%'

        setTimeout(()=>{
            this.target.classList.remove(directionType);
            this.target.previousElementSibling.classList.remove(directionType);
            this.target.nextElementSibling.classList.remove(directionType)
            if(typeof callback === 'function'  && callback() ){

                console.log('seiko')

            }

        },500)
            console.log('right animate func');


    }


}


class slideV2 extends RollingSlide{

    constructor(slideContainer,slide,rolling){

        super(slideContainer,slide,rolling);


        document.addEventListener('click',(event)=>{
            //왜인지 여기서 문제가 생기는 듯 함. 따로 지정해 줘야 할 것 같음
            event.preventDefault();


            let type = event.target.getAttribute('data-dir');

            this.target = document.querySelector(this.slideContainerClassname+'>'+this.slideClassname+'.on');


            if(!this.rolling){
                let str= event.target.classList.value
                if(str.indexOf(this.slideClassname.substr(1))!= -1){
                    this.onewayAnimate(event.target,()=>{this.rightMovement()});
                }
            }




            this.slides = this.setSlides(this.slideClassname);
        });

    }


    onewayAnimate(target,callback){
        let directionType = 'one_direction';
        this.target = document.querySelector(this.slideClassname+'.on');
        this.target.classList.remove('on');




        target.classList.add(directionType);
        target.nextElementSibling.classList.add(directionType);
        setTimeout(()=>{

            target.classList.remove(directionType);
            target.nextElementSibling.classList.remove(directionType);
            if(typeof callback === 'function'  && callback() && console.log('yes')){

                console.log('seiko')

            }

        },500)

        this.slides = this.setSlides(this.slideClassname);

        console.log('right animate func');
    }

}




let slide1 = new slideV2('#container_slide','.slide',false);
let slide2 = new slideV3('#container_slide2','.slide2');











let test = (obj)=>{
    if(obj === null || obj === undefined) return

    let tmpObj = {}
    Object.keys(obj).forEach((item, index)=>{
       tmpObj[item] = obj[item]
    });

    return tmpObj

}




(function(){
    const items = document.getElementsByClassName('item');

    console.log(items)

    // function Slider(){
    //  this.view,
    //  this.prev,
    //  this.next;
    //
    //
    // }



})();