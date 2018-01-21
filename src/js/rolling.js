
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



