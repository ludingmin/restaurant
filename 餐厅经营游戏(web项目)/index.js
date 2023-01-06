let timer = false;//暂停的判断值
let iffirsttime = true;
let cookers = [];//厨师数组
let customers = new Array(4);//顾客数组
let waiting_customer = [];//等待数组
let table = [true, true, true, true];
let customer_img = ["images/customer1.png", "images/customer2.png", "images/customer3.png", "images/customer4.png", "images/customer5.png", "images/customer6.png"];
let Name = ["luci", "lili", "xzx", "zzk", "hyl", "zhh"];
let dishlist = [];//顾客点菜的栈
let piont = 0; //指向第i个位置
let week = 1;
let day = 1;
let X = 240;//一天有240秒
let countor = 0;//计秒器
let mymoney = 500;


let Allchefs = document.querySelectorAll('.chef');
let Allcustomer = document.querySelectorAll('.cumtomer');
let tableofkitchen = document.querySelector('.kitchen');
let addchef = document.querySelector('#employChef');
let employ_page = document.querySelector('.employ-page');
let fire_page = document.querySelector('.fire-page');
let sure_employ = document.querySelector('.sure-employ');
let cancel_emloy = document.querySelector('.cancel-employ');
let sure_fire = document.querySelector('.sure-fire');
let cancel_fire = document.querySelector('.cancel-fire')
let warning_success_employ = document.querySelector('.warning-success-employ');
let warning_success_fire = document.querySelector('.warning-success-fire');
let ordering_page = document.getElementById("ordering-page");
let finish_oder = document.getElementById("accept");
let warning_finish_oder = document.querySelector('.warning-ordering-finish');
let waiting_area = document.querySelector('.waitingarea');
let warning_customer_leaving = document.querySelector('#warning-customer-leaving');
let noenough_money = document.querySelector('.noenough_money');
let aweek = document.getElementById('week');
let aday = document.getElementById('day');
let salary = document.getElementById('salary');
let noenough_firemoney = document.querySelector('.noenough_firemoney');
let noenough_firemoney1 = document.querySelector('.noenough_firemoney1');
let textofjieyue = document.getElementById('jieyue');
let textofemplynum = document.getElementById('emplynum');
let textofgivemoney =document.getElementById('givemoney');
let warning_eating_finish = document.querySelector('.warning-eating-finish');
let refuse = document.getElementById('refuse');
let orderpic = document.getElementById('customer-picture');
let ordering_title = document.getElementById('ordering-title');

class customer {
    constructor(name, headpictrue) {
        this.headpictrue = headpictrue;
        this.name = name;
        this.ordercount = 0;//点单的数量
        this.dissatisfied = 0;//超时的数量
        this.shangcai = 0;//已经上菜的数量
        this.waitfood = new Array(3);//存储客人点的菜
        this.waittime = 0;//等待时间
        this.ifeating = false;//是否正在吃东西
        this.ifwaiting = true;
        this.shouldpay = 0;
    }
}

class chef {
    constructor() {
        this.dishtime = 0;//这道菜的烹饪时间
        this.cooktime = 0;//已经烹饪时间--用来写进度条
        this.workday = 1;
        this.worktime = 0;
        this.dishname = 'none';//烹饪的菜
        this.isworking = false;
        this.finishdish = false;
        this.freashtime = 0;
    }
}

class dish {
    constructor(name, time, sell) {
        this.name = name;
        this.needtime = 10;
        this.sell = sell;
        this.ifovertime = false;
        this.shangcai =false;
    }

}
let dishes = [[new dish("凉拌SAN", 20, 6), new dish("冷切DOM", 20, 4)],
[new dish("UL炖LI", 30, 12), new dish("红烧HEAD", 30, 15), new dish("酥炸EC", 30, 18), new dish("炙烤CSS", 30, 16), new dish("清蒸DIV", 30, 12)],
[new dish("鲜榨flex", 20, 5), new dish("小程序奶茶", 20, 6)]];//菜的数组


function init() {
    //初始化
    cookers.push(new chef);//创建第一个厨师
    finishdish = [0, 0, 0, 0, 0, 0];
    let t =document.getElementById('start');
    t.addEventListener('click',Event=>{
        document.querySelector('.welcome').style.display = 'none';
    })
}
init();

function employ() {//招聘
    if (cookers.length == 6)//不能超过六个厨师
        return false;
    let tempcooker = document.createElement('div');
    let tempx = document.createElement('div');
    let img = document.createElement('img');
    img.src = "images/chef.png";
    tempcooker.appendChild(img);
    img.className = "yuan yuan1";
    tempcooker.className = "chef";
    tempx.className = "fireChef";
    tempx.id = "fre" + cookers.length;
    if (cookers.length > 1)
        document.getElementById("fre" + (cookers.length - 1)).style.display = "none";
    tempx.innerHTML = "x";
    tempcooker.appendChild(tempx);
    tableofkitchen.insertBefore(tempcooker, addchef);
    cookers.push(new chef);
    /////////////////添加x的监听
    tempx.addEventListener('click', (Event) => {
        fire_page.style.display = "block";
        salary.innerText = cookers[cookers.length-1].workday*20+140;
    })
    //////////////////
    return true;
}

function intorestrant() {//主要把头像弄进去
    let tempcustomer = document.createElement('img');
    for (let i = 0; i < 4; i++) {
        if (table[i]) {
            table[i] = false;
            tempcustomer.src = waiting_customer[0].headpictrue;
            tempcustomer.className = "addcustomer delete" + (i + 1);
            let temp = document.getElementById('t' + (i + 1));
            temp.style.backgroundColor = '#dca53f';
            temp.style.borderColor = '#ded070';
            temp.appendChild(tempcustomer);
            customers[i] = waiting_customer[0];//添加到顾客名单
            waiting_customer.shift();//在等待队列中移除
            piont = (i + 1);
            return true;
        }
    }
    return false;
}

refuse.addEventListener('click', (Event) => {
    ordering_page.style.display = "none";
})

//监听器的添加
addchef.addEventListener('click', (Event) => {
    employ_page.style.display = 'block';
});
sure_employ.addEventListener('click', (Event) => {
    employ_page.style.display = 'none';

    if (cookers.length < 6 && mymoney>=100) {
        employ();
        console.log(cookers.length);
        textofemplynum.innerText = '招聘厨师成功！您已经有'+ cookers.length +'名厨师';
        warning_success_employ.style.display = 'block';
        mymoney = mymoney - 100;
        setTimeout(function () { warning_success_employ.style.display = 'none'; }, 3000);
    }
    else if(mymoney <100){
        noenough_money.style.display = 'block';
        setTimeout(function () { noenough_money.style.display = 'none'; }, 3000);
    }
    if (cookers.length == 6)
        addchef.style.display = 'none';
})

cancel_emloy.addEventListener('click', (Event) =>{
    employ_page.style.display = 'none';
})

sure_fire.addEventListener('click', (Event) => {
    fire_page.style.display = 'none';
    if (mymoney >= cookers[cookers.length-1].workday*20+140) {//先用true代替，后面用钱来判断
        let Allchefs = document.querySelectorAll('.chef');
        let wide = Allchefs[Allchefs.length - 1].remove();
        cookers.pop();
        if (cookers.length < 6)
            addchef.style.display = 'block';
        if (cookers.length > 1)
            document.getElementById("fre" + (cookers.length - 1)).style.display = "block";
        warning_success_fire.style.display = 'block';
        textofjieyue.innerText = '解约厨师成功，解约支出￥'+(cookers[cookers.length-1].workday*20+140);
        setTimeout(function () { warning_success_fire.style.display = 'none'; }, 3000);
        mymoney = mymoney -(cookers[cookers.length-1].workday*20+140);
    }
    else{
        noenough_firemoney.style.display = 'block';
        noenough_firemoney1.innerText = '你没有'+ (cookers[cookers.length-1].workday*20+140) +'块支付解约费';
        setTimeout(function () { noenough_firemoney.style.display = 'none'; }, 3000);
    }
    

})

cancel_fire.addEventListener('click', (Event) =>{
    fire_page.style.display = 'none';
})

////
document.querySelector(".waitingcustomer_1")//等待队列顾客监听器
function listener() {
    
    document.querySelector(".waitingcustomer_1").remove();//将第一个等待的客户移除等待列表
    ordering_page.style.display = "block";
    orderpic.src = waiting_customer[0].headpictrue;
    ordering_title.innerText = '   '+waiting_customer[0].name+'正在点菜 !!!';
    let otherwating = document.querySelectorAll(".waitingcustomer_other");
    if (otherwating.length > 0) {
        otherwating[0].className = "waitingcustomer_1";
        document.querySelector(".waitingcustomer_1").addEventListener('click', listener);
    }
    return true;
}
////

//提交菜单按钮监听
function mysubmit(menu) {
    let formdata = new FormData(menu);
    let choice1 = formdata.get('choice1');
    if (!intorestrant()){}
    if (choice1 != null) {//点第一道菜
        let t = document.getElementById('t' + piont);
        let a = document.createElement('div');
        let a1 = document.createElement('div');
        let p = document.createElement('p');
        p.innerText = dishes[0][(choice1 - 1)].name;
        p.className = 'ming delete' + piont;
        a.appendChild(p);
        a.className = "d1 delete" + piont;
        a1.className = "dd1 delete" + piont;
        a1.id = "t"+(piont-1)+"0";
        dishlist.push(new dish(dishes[0][(choice1 - 1)].name, dishes[0][(choice1 - 1)].time, dishes[0][(choice1 - 1)].sell));
        a.appendChild(a1);
        t.appendChild(a);
        customers[piont - 1].waitfood[0] = new dish(dishes[0][(choice1 - 1)].name, dishes[0][(choice1 - 1)].time, dishes[0][(choice1 - 1)].sell);
        customers[piont - 1].ordercount = customers[piont - 1].ordercount + 1;
    }

    let choice2 = formdata.get('choice2');
    if (choice2 != null) {//点第2道菜
        let t = document.getElementById('t' + piont);
        let a = document.createElement('div');
        let a1 = document.createElement('div');
        let p = document.createElement('p');
        p.innerText = dishes[1][(choice2 - 1)].name;
        p.className = 'ming delete' + piont;
        a.appendChild(p);
        a1.className = "dd1 delete" + piont;
        a.className = "d2 delete" + piont;
        a1.id = "t"+(piont-1)+"1";
        dishlist.push(new dish(dishes[1][(choice2 - 1)].name, dishes[1][(choice2 - 1)].time, dishes[1][(choice2 - 1)].sell));//
        a.appendChild(a1);
        t.appendChild(a);
        customers[piont - 1].waitfood[1] = new dish(dishes[1][(choice2 - 1)].name, dishes[1][(choice2 - 1)].time, dishes[1][(choice2 - 1)].sell);
        customers[piont - 1].ordercount = customers[piont - 1].ordercount + 1;
    }

    let choice3 = formdata.get('choice3');
    if (choice3 != null) {//点第3道菜
        let t = document.getElementById('t' + piont);
        let a = document.createElement('div');
        let a1 = document.createElement('div');
        let p = document.createElement('p');
        p.innerText = dishes[2][(choice3 - 1)].name;
        p.className = 'ming delete' + piont;
        a.appendChild(p);
        a1.className = "dd1 delete" + piont;
        a.className = "d3 delete" + piont;
        a1.id = "t"+(piont-1)+"2";
        dishlist.push(new dish(dishes[2][(choice3 - 1)].name, dishes[2][(choice3 - 1)].time, dishes[2][(choice3 - 1)].sell));
        a.appendChild(a1);
        t.appendChild(a);
        customers[piont - 1].waitfood[2] = new dish(dishes[2][(choice3 - 1)].name, dishes[2][(choice3 - 1)].time, dishes[2][(choice3 - 1)].sell);
        customers[piont - 1].ordercount = customers[piont - 1].ordercount + 1;
    }

    ordering_page.style.display = "none";
    warning_finish_oder.style.display = "block";
    setTimeout(function () { warning_finish_oder.style.display = 'none'; }, 3000);
    console.log("fuck");
    timer = true;
    return false;//防止提交后刷新
}

//
function creatwaiting() {
    let tempcus = new customer(Name[Math.round(Math.random() * 5)], customer_img[Math.round(Math.random() * 5)]);
    waiting_customer.push(tempcus);
    let newcus = document.createElement('div');
    let newimg = document.createElement('img');
    newimg.className = "cimg";
    newimg.src = tempcus.headpictrue;
    newcus.appendChild(newimg);
    if (waiting_customer.length == 1) {
        newcus.className = "waitingcustomer_1";
        waiting_area.appendChild(newcus);
        document.querySelector(".waitingcustomer_1").addEventListener('click', listener);
    }
    else {
        waiting_area.appendChild(newcus);
        newcus.className = "waitingcustomer_other";
    }
}
creatwaiting();
creatwaiting();


//**********************


//上菜
function shangcai(x, y, p,width) {
    let temp = document.getElementById('t'+x+y);
    let temp1 = document.getElementById('c'+p);
    let temp2 = document.querySelectorAll('.yuan1');
    temp1.remove();
    temp2[p].style.backgroundColor = 'aliceblue';
    temp.style.width = (width-5) +'px';
    temp.style.backgroundColor = '#6bcc6b';
    customers[x].shouldpay = customers[x].shouldpay + customers[x].waitfood[y].sell;
    cookers[p].isworking = false;
    cookers[p].freashtime = 0;
    cookers[p].finishdish = false;
    cookers[p].dishname = 'none';
    cookers[p].cooktime = 0;
    cookers[p].dishtime = 0;
    customers[x].waitfood[y].shangcai =true;
    customers[x].shangcai++;
    if(customers[x].shangcai + customers[x].dissatisfied == customers[x].ordercount){
        let img = document.createElement('img');
        img.src = 'images/money.png';
        img.className = 'qian';
        let tt=document.getElementById('t'+(x+1));
        tt.appendChild(img);
        tt.style.background = 'rgb(80 181 72)';
        tt.style.borderColor = 'rgb(183 233 137)';
        img.addEventListener('click', (Event) => {//为这个钱添加监听事件
            mymoney = customers[x].shouldpay + mymoney;
            console.log(mymoney);
            textofgivemoney.innerText =  customers[x].name +'完成用餐，收获￥'+ customers[x].shouldpay;
            customers[x] = null;
            let num = document.querySelectorAll('.delete' + (x + 1));
            for (let tt = 0; tt < num.length; tt++) {
                num[tt].remove();
            }
            tt.style.background = 'aliceblue';
            tt.style.borderColor = 'gray';
            img.remove();
            warning_eating_finish.style.display = 'block';
            setTimeout(function () { warning_eating_finish.style.display = 'none'; }, 3000);
            table[x]=true;
        }) 
    }
}

function clock() {
    document.querySelector('.total-incom').innerText = mymoney;
    if (timer) {
        //遍历顾客数组
        let n = 0;
        let z;
        let wide = 106;
        let allbox = document.querySelectorAll('.dd1');//选中所有进度条的盒子
        let D1 = document.querySelectorAll('.d1');
        let n1 = 0;
        let D2 = document.querySelectorAll('.d2');
        let n2 = 0;
        let D3 = document.querySelectorAll('.d3');
        let n3 = 0;
        let chef_going1 = document.querySelectorAll('.chef_dd1');
        for (let x = 0; x < 4; x++) {
            if (customers[x] != null) {
                customers[x].waittime++;
                for (let y = 0; y < 3; y++) {
                    if (customers[x].waitfood[y] != null && !customers[x].waitfood[y].ifovertime && !customers[x].waitfood[y].shangcai) {
                        if (customers[x].waittime >= 30) {
                            customers[x].waitfood[y].ifovertime = true;
                            let line = document.createElement('div');//当顾客等的菜超时的时候，添加一条白线
                            line.className = 'line';
                            allbox[n].appendChild(line);
                            customers[x].dissatisfied = customers[x].dissatisfied + 1;
                            if(customers[x].shangcai + customers[x].dissatisfied == customers[x].ordercount && customers[x].dissatisfied != customers[x].ordercount){
                                let img = document.createElement('img');
                                img.src = 'images/money.png';
                                img.className = 'qian';
                                let tt=document.getElementById('t'+(x+1));
                                tt.appendChild(img);
                                tt.style.background = 'rgb(80 181 72)';
                                tt.style.borderColor = 'rgb(183 233 137)';
                                img.addEventListener('click', (Event) => {//为这个qian添加监听事件
                                    mymoney = customers[x].shouldpay + mymoney;
                                    textofgivemoney.innerText =  customers[x].name +'完成用餐，收获￥'+ customers[x].shouldpay;
                                    customers[x] = null;
                                    let num = document.querySelectorAll('.delete' + (x + 1));
                                    for (let tt = 0; tt < num.length; tt++) {
                                        num[tt].remove();
                                    }
                                    tt.style.background = 'aliceblue';
                                    tt.style.borderColor = 'gray';
                                    img.remove();
                                    warning_eating_finish.style.display = 'block';
                                    setTimeout(function () { warning_eating_finish.style.display = 'none'; }, 3000);
                                    table[x]=true;
                                })
                            }
                            if (customers[x].dissatisfied == customers[x].ordercount) {
                                let tt=document.getElementById('t'+(x+1));
                                tt.style.background = '#773020';
                                tt.style.borderColor = '#612525';
                                let hreat = document.createElement('img');
                                hreat.src = "images/heart.png";
                                hreat.className = 'heart delete' + (x + 1);
                                let c1 = document.getElementById('t' + (x + 1));
                                c1.appendChild(hreat);
                                hreat.addEventListener('click', (Event) => {//为这个心添加监听事件
                                    customers[x] = null;
                                    let num = document.querySelectorAll('.delete' + (x + 1));
                                    for (let tt = 0; tt < num.length; tt++) {
                                        num[tt].remove();
                                    }
                                    let tt=document.getElementById('t'+(x+1));
                                    tt.style.background = 'aliceblue';
                                    tt.style.borderColor = 'gray';
                                    warning_customer_leaving.style.display = 'block';
                                    setTimeout(function () { warning_customer_leaving.style.display = 'none'; }, 3000);
                                    table[x]=true;
                                })
                            }

                        }

                        else {
                            z = 30;
                            allbox[n].style.width = (wide / z) * customers[x].waittime + "px";
                        }
                    }//等待进度条
                    // 遍历每一个厨师，看是否有自的菜做好了。
                    if (customers[x].waitfood[y] != null) {
                        for (let p = 0; p < cookers.length; p++) {
                            //console.log(p);
                            if (cookers[p].finishdish == true && cookers[p].dishname == customers[x].waitfood[y].name && customers[x].waitfood[y].ifovertime == false) {
                                //console.log(cookers[p]);
                                let f = document.createElement('img');
                                f.onclick = function(){
                                    shangcai(x,y,p,wide);
                                }
                                f.src = 'images/food.png';
                                f.className = 'Food food' + x + y;
                                let cc = document.querySelectorAll('.food' + x + y);
                                if (cc.length == 0) {
                                    if (y == 0) {
                                        D1[n1].appendChild(f);
                                        break;
                                    }
                                    else if (y == 1) {
                                        D2[n2].appendChild(f);
                                        break;
                                    }
                                    else {
                                        D3[n3].appendChild(f);
                                        break;
                                    }
                                }
                                break;
                                
                            }
                            else {
                                //console.log("no");
                                let cc = document.querySelectorAll('.food' + x + y);
                                if (cc.length > 0) {
                                    cc[0].remove(); console.log("ljy");
                                }
                            }

                        }
                        if (y == 0) {
                            n1++;
                        }
                        else if (y == 1) {

                            n2++;
                        }
                        else {
                            n3++;
                        }
                    } else {
                        //console.log("no");
                        let cc = document.querySelectorAll('.food' + x + y);
                        if (cc.length > 0) {
                            cc[0].remove(); console.log("ljy");
                        }
                    }
                    if (customers[x].waitfood[y] != null) {
                        n++;
                    }
                }
            }
        }


        //厨师
        let Allchefs = document.querySelectorAll('.yuan1');
        let chef_going = document.querySelectorAll('.chef_d1');
        let d1 = 0;
        for (let p = 0; p < cookers.length; p++) {
            if (cookers[p].isworking == false) {//如果这个厨师没有在做菜
                if (dishlist.length > 0) {
                    cookers[p].dishname = dishlist[0].name;
                    cookers[p].dishtime = dishlist[0].needtime;
                    cookers[p].isworking = true;
                    Allchefs[p].style.backgroundColor = '#d49636';
                    let temp_div = document.createElement('div');
                    temp_div.className = "chef_dd1"
                    temp_div.id = 'c'+p;
                    let temp_div1 = document.createElement('div');
                    temp_div1.className = "chef_d1";
                    let p1 = document.createElement('p');
                    p1.style.zIndex = '10';
                    p1.className = 'chef_p';
                    p1.innerText = dishlist[0].name;
                    temp_div.appendChild(p1);
                    temp_div.appendChild(temp_div1);
                    let te = document.querySelectorAll('.chef');
                    te[p].appendChild(temp_div);
                    dishlist.shift();
                }
            }
            else if (cookers[p].finishdish == false) {//如果这个厨师在做菜
                cookers[p].cooktime = cookers[p].cooktime + 1;
                chef_going[d1].style.width = ((130 / cookers[p].dishtime) * cookers[p].cooktime) + 'px';
                if (cookers[p].cooktime == cookers[p].dishtime) {
                    cookers[p].finishdish = true;
                }
                d1++;
            }
            else {//如果这个厨师做完菜
                Allchefs[p].style.backgroundColor = 'rgb(36 54 162)';
                cookers[p].freashtime = cookers[p].freashtime + 1;
                if (cookers[p].freashtime == 6) {//这个菜过期了
                    cookers[p].isworking = false;
                    cookers[p].freashtime = 0;
                    cookers[p].finishdish = false;
                    cookers[p].dishname = 'none';
                    cookers[p].cooktime = 0;
                    cookers[p].dishtime = 0;
                    chef_going1[d1].remove();
                    Allchefs[p].style.backgroundColor = 'aliceblue';
                }
                d1++;

            }
        }

    }
    countor++;
    if(countor % 20 == 0 && waiting_customer.length<=4){
        creatwaiting();
    }
    if(countor == X){
        countor = 0;
        day++;
        for (let p = 0; p < cookers.length; p++){
            cookers[p].workday++;
        }
        if(day == 8){
            day=1;
            week++;
            for (let p = 0; p < cookers.length; p++){//结算工资
                mymoney = mymoney - (cookers[p].workday*20);
                cookers[p].workday=1;
            }
        }
    }
    aday.innerText = 'D'+day;
    aweek.innerText = 'W'+week;
}
setInterval("clock()", 1000);





