
function goto_marry()
{
    setTimeout(function() {
        window.location.href="../marry_me.html"
    }, 1000);
}

let fake_button_clicked = 0;
function add_fake_button()
{
    let newBtn = document.createElement("input");
    newBtn.type = "button";
    newBtn.value = "不行";
    newBtn.style.display = "inline";
    newBtn.setAttribute("class", "button");
    newBtn.onmouseover = function() { this.style.backgroundColor = "#FF2020"; };
    newBtn.onmouseout = function() { this.style.backgroundColor = "dodgerblue"; };
    newBtn.onclick = function() {
        alert("这个按钮是坏的");
        let inner = "请按第一个";
        if (fake_button_clicked == 0) {
            inner = "请按第一个";
        } else if (fake_button_clicked == 1) {
            inner = "请按第二个";
        } else if (fake_button_clicked % 2 == 0) {
            inner = "第一个\\(c.c)";
        } else {
            inner = "第二个(s_s)/";
        }
        document.getElementById("verbose").innerHTML = inner;
        fake_button_clicked += 1;
        if (fake_button_clicked > 5)
        {
            document.getElementById("confirm_button").removeChild(this);
        }
    };
    document.getElementById("confirm_button").appendChild(newBtn);
}

let step = 1
let enen = [
    { // 0
        q: "我们去看婚纱照吧",
        no_ok: true,
        no_tk: true,
        func: goto_marry,
    },
    { // 1
        q: "李永江 向你求婚，要不要答应呀",
        ok_text: "好啊",
        tk_text: "我再想想",
        tk_verbose: "啊？还要想想呀？",
        ok_to: 0,
        tk_to: 2,
    },
    { // 2
        q: "那是因为什么呢?",
        ok_text: "你太笨了",
        tk_text: "你太烦了",
        ok_verbose: "哦，因为我笨呀？ 那 ...",
        tk_verbose: "啊，我有很烦吗？",
        ok_to: 5,
        tk_to: 3,
    },
    { // 3
        q: "请问你知道我的生日吗?",
        ok_text: "十一月十七",
        tk_text: "12月10号",
        ok_verbose: "好厉害，农历我自己都不太记得",
        ok_to: 4,
        tk_to: 4,
    },
    { // 4
        q: "嘿嘿，你果然是记得的!",
        ok_text: "当然了",
        tk_text: "哼！",
        tk_verbose: "好啦好啦你不准生气",
        ok_to: 0,
        tk_to: 5,
    },
    { // 5
        q: "你说我有没有很胖?",
        ok_text: "还用说",
        tk_text: "你不胖，你还可以再吃100斤",
        ok_verbose: "那我努力减肥... 呜呜",
        tk_verbose: "还是你对我最好",
        ok_to: 6,
        tk_to: 6,
    },
    { // 6
        q: "嫁给我吧~",
        ok_text: "好",
        tk_text: "好了好了",
        ok_verbose: "爱你~",
        ok_to: 0,
        tk_to: 0,
        func: add_fake_button,
    },
];

function click_confirm(ok)
{
    console.log("thank you!");
    let cur = enen[step];
    if (ok) {
        step = cur.ok_to;
        start_propose(cur.ok_verbose);
    } else {
        step = cur.tk_to;
        start_propose(cur.tk_verbose);
    }
}

function start_propose(verbose=null)
{
    // document.getElementById("debug").innerHTML = "step: " + step;

    let verbose_p = document.getElementById("verbose");
    let question_p = document.getElementById("question");
    let btns = document.getElementById("confirm_button");
    let btn_ok = document.getElementById("confirm_button_ok");
    let btn_tk = document.getElementById("confirm_button_tk");

    let cur = enen[step];

    if (verbose == null) {
        verbose_p.style.display = "none";
    } else {
        verbose_p.style.display = "inline";
        verbose_p.innerHTML = verbose;
    }

    question_p.innerHTML = cur.q;
    if (cur.no_ok && cur.no_tk) {
        btns.style.display = "none";
    } else {
        btns.style.display = "inline";
    }

    if (cur.no_ok) {
        btn_ok.style.display="none";
    } else {
        btn_ok.value = cur.ok_text;
        btn_ok.style.display="inline";
    }

    if (cur.no_tk) {
        btn_tk.style.display="none";
    } else {
        btn_tk.value = cur.tk_text;
        btn_tk.style.display="inline";
    }

    if (cur.func) {
        cur.func();
    }
}

function body_onload(prefix="你好,")
{
	var vistor = prompt(prefix + " 请问你是谁呀？ ","");
    var allow_list = ["liuli", "liliu", "LiuLi", "ll", "刘丽", "dhull", "tjull"];
    var allow = false;
    for (i in allow_list) {
        if (vistor == allow_list[i]) {
            allow = true;
        }
    }

    if (allow) {
        document.getElementById("content").style.display = "inline";
        welcome = "你好呀，" + vistor +"";
        document.getElementById("welcome").innerHTML = welcome;
        setTimeout(function() {
            document.getElementById("welcome").style.display = "none";
            start_propose();
        }, 1500);
    } else {
        body_onload("你好呀，但是我要找的是别人。");
    }
}
