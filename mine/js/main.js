import { get_time, get_string_time, change_text_conetnt, is_same_now, get_text_time, is_same_content } from "./fn.js";

const $$cardH = document.querySelectorAll('[data-card="hour"]');
const $$cardM = document.querySelectorAll('[data-card="min"]');
const $$cardS = document.querySelectorAll('[data-card="sec"]');

function init(){
    const [hh,mm,ss] = get_time();
    display_time(ss,$$cardS);
    display_time(mm,$$cardM);
    display_time(hh,$$cardH,"hour");
}//init


function display_time(time,$$card,type = null){
    if(is_same_now($$card,time)) return;

    const prevTime = (time - 1 < 0) ? (type == "hour" ? 23 : 59) : time - 1;
    const [$card1, $card2] = $$card;
    const pt = get_string_time(prevTime);
    const nt = get_string_time(time);
    // console.log(pt,nt);

    change_time($card1,pt[0],nt[0]);
    change_time($card2,pt[1],nt[1]);
}//display_time

function change_time($card,prevTime,nowTime){
    const [$bBg,$tBg,$tMv,$bMv] = Array.from($card.getElementsByTagName('SPAN'));
    const $mv = $card.getElementsByClassName('mv')[0];
    change_text_conetnt(prevTime, $bBg, $tMv);
    change_text_conetnt(nowTime, $tBg, $bMv);
    /* 💚 여기가 관건 ㅎㅎ */
    if(!is_same_content($bBg,$tBg)){
        $mv.classList.toggle('on',true);
        $mv.addEventListener('transitionend',()=>{
            $mv.classList.remove('on');
            change_text_conetnt(nowTime,$bBg,$tMv);
        },{once:true});
    }//if
}//change_time


/* 실행 */
(function(){
    setInterval(()=>init(),1000);
})();