import { v4 as uuidv4 }  from 'uuid'
const common = {
    setCookie (key,val,time){
        //设置cookie方法
        var date=new Date(); //获取当前时间
        var expiresDays=time;  //将date设置为n天以后的时间
        date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
        document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
    },
    getFlow() {
        let uuid = ""
         if (document.cookie) {
            let cookieArr = document.cookie.split(";");
            cookieArr.forEach(el => {
                let arr = el.split("=")
                if (arr[0] == "uuid") {
                    uuid = arr[1]
                }
            })
        }       
        const url = window.location.href.split("?")[0];
        if(uuid){
            new Image(1,1).src = "http://120.79.115.240:5000/flow/getFlow?url=" + url + "&uuid=" + uuid 
        }else{
            new Image(1,1).src = "http://120.79.115.240:5000/flow/getFlow?url=" + url
            common.setCookie("uuid",uuidv4(),1)
        }

    }
}
export default common;