import { get_time, get_string_time, change_text_conetnt, is_same_now, is_same_content } from "./fn.js";

export class Clock{
    constructor(){
        this.$$cardH = document.querySelectorAll('[data-card="hour"]');
        this.$$cardM = document.querySelectorAll('[data-card="min"]');
        this.$$cardS = document.querySelectorAll('[data-card="sec"]');
    }//constructor

    //[init]
    init = ()=> {
        const [hh,mm,ss] = get_time();
        this.display_time(ss,this.$$cardS);
        this.display_time(mm,this.$$cardM);
        this.display_time(hh,this.$$cardH,"hour");
    }//init

    repeat(){ setInterval(this.init,1000);}

    /* [display_time] */
    display_time(time,$$card,type = null){
        if(is_same_now($$card,time)) return;

        const prevTime = (time - 1 < 0) ? (type == "hour" ? 23 : 59) : time - 1;
        const [$card1, $card2] = $$card;
        const pt = get_string_time(prevTime);
        const nt = get_string_time(time);
        // console.log(pt,nt);

        this.change_time($card1,pt[0],nt[0]);
        this.change_time($card2,pt[1],nt[1]);
    }//display_time

    /* change time */
    change_time($card,prevTime,nowTime){
        const [$bBg,$tBg,$tMv,$bMv] = Array.from($card.getElementsByTagName('SPAN'));
        change_text_conetnt(prevTime, $bBg, $tMv);
        change_text_conetnt(nowTime, $tBg, $bMv);
        /* 💚 여기가 관건 ㅎㅎ */
        if(!is_same_content($bBg,$tBg)){
            this.toggle_mv($card,nowTime,$bBg,$tMv);
        }//if
    }//change_time

    /* $mv 에 클래스 on toggle 및, 텍스트 갈아치우기 */
    toggle_mv($card,nowTime,$bBg,$tMv){
        const $mv = $card.getElementsByClassName('mv')[0];
        $mv.classList.add('on');
        $mv.addEventListener('transitionend',()=>{
            $mv.classList.remove('on');
            change_text_conetnt(nowTime,$bBg,$tMv);
        },{once:true});
    }//toggle_mv
}//Clock