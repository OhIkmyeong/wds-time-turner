export function get_time(){
    const DATE = new Date();
    const hh = DATE.getHours();
    const mm = DATE.getMinutes();
    const ss = DATE.getSeconds();
    return [hh,mm,ss];
}//get_time

export function get_string_time(time){
    return String(time).padStart(2,"0").split('');
}//get_string_time

export function change_text_conetnt(str,...rest){
    rest.forEach($rest => $rest.textContent = str);
}//change_text_conetnt

export function is_same_now($$card,time){
    const textTime = get_text_time($$card, "top-bg");
    const result = parseInt(textTime) == time; 
    // console.log(textTime, time, result);
    return result;
}//is_same_now

export function get_text_time($$card,clsName){
    return Array.from($$card).map($card =>{
        return $card.getElementsByClassName(clsName)[0].textContent;
    }).join('');
}//get_text_time

export function is_same_content($bBg,$tBg){
    return $bBg.textContent == $tBg.textContent;
}//is_same_content