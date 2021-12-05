// Google translator

(function () {
    var d = "text/javascript"
        , e = "text/css"
        , f = "stylesheet"
        , g = "script"
        , h = "link"
        , k = "head"
        , l = "complete"
        , m = "UTF-8"
        , n = ".";

    function p(b) {
        var a = document.getElementsByTagName(k)[0];
        a || (a = document.body.parentNode.appendChild(document.createElement(k)));
        a.appendChild(b)
    }

    function _loadJs(b) {
        var a = document.createElement(g);
        a.type = d;
        a.charset = m;
        a.src = b;
        p(a)
    }

    function _loadCss(b) {
        var a = document.createElement(h);
        a.type = e;
        a.rel = f;
        a.charset = m;
        a.href = b;
        p(a)
    }

    function _isNS(b) {
        b = b.split(n);
        for (var a = window, c = 0; c < b.length; ++c)
            if (!(a = a[b[c]]))
                return !1;
        return !0
    }

    function _setupNS(b) {
        b = b.split(n);
        for (var a = window, c = 0; c < b.length; ++c)
            a.hasOwnProperty ? a.hasOwnProperty(b[c]) ? a = a[b[c]] : a = a[b[c]] = {} : a = a[b[c]] || (a[b[c]] = {});
        return a
    }

    window.addEventListener && "undefined" == typeof document.readyState && window.addEventListener("DOMContentLoaded", function () {
        document.readyState = l
    }, !1);

    if (_isNS('google.translate.Element')) {
        return
    }

    (function () {
        var c = _setupNS('google.translate._const');
        c._cl = 'ru';
        c._cuc = 'googleTranslateElementInit';
        c._cac = '';
        c._cam = '';
        c._ctkk = eval('((function(){var a\x3d71640675;var b\x3d-12312877;return 406476+\x27.\x27+(a+b)})())');
        var h = 'translate.googleapis.com';
        var s = (true ? 'https' : window.location.protocol == 'https:' ? 'https' : 'http') + '://';
        var b = s + h;
        c._pah = h;
        c._pas = s;
        c._pbi = b + '/translate_static/img/te_bk.gif';
        c._pci = b + '/translate_static/img/te_ctrl3.gif';
        c._pli = b + '/translate_static/img/loading.gif';
        c._plla = h + '/translate_a/l';
        c._pmi = b + '/translate_static/img/mini_google.png';
        c._ps = b + '/translate_static/css/translateelement.css';
        c._puh = 'translate.google.com';
        _loadCss(c._ps);
        _loadJs(b + '/translate_static/js/element/main_ru.js');
    })();
})();

window.onload = init;

function init() {
    const ruLang = document.getElementById("ru_lang");
    const uaLang = document.getElementById("ua_lang");
    const enLang = document.getElementById("en_lang");

    const cookie = get_cookie('googtrans');
    if (cookie == null) {
        $('.translate .lang_ru').addClass('active')
        ruLang.style.display = "none";
    } else {
        const translationLang = cookie.split('/')[2];
        $(`.translate .lang_${translationLang}`).addClass('active');

        switch (translationLang) {
            case 'uk':
                uaLang.style.display = "none";
                break;
            case 'en':
                enLang.style.display = "none";
                break;
            case 'ru':
                document.body.setAttribute('class', 'notranslate')
                ruLang.style.display = "none";
                break;
        }
    }
}

function doGTranslate(lang_pair) {
    const ruLang = document.getElementById("ru_lang");
    const uaLang = document.getElementById("ua_lang");
    const enLang = document.getElementById("en_lang");
    ruLang.style.display = "inline";
    uaLang.style.display = "inline";
    enLang.style.display = "inline";

    switch (lang_pair) {
        case 'ru|uk':
            document.body.removeAttribute('class')
            uaLang.style.display = "none";
            break;
        case 'ru|en':
            document.body.removeAttribute('class')
            enLang.style.display = "none";
            break;
        case 'ru|ru':
            document.body.setAttribute('class', 'notranslate')
            ruLang.style.display = "none";
            break;
    }

    var lang = lang_pair.split('|')[1];
    var teCombo;
    var selects = document.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) {
        if (selects[i].className == 'goog-te-combo') {
            teCombo = selects[i];
        }
    }

    teCombo.value = lang;
    GTranslateFireEvent(teCombo, 'change')
}

function GTranslateFireEvent(element, event) {
    try {
        if (document.createEventObject) {
            var evt = document.createEventObject();
            element.fireEvent('on' + event, evt)
        } else {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(event, true, true);
            element.dispatchEvent(evt)
        }
    } catch (e) {
    }
}


function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        includedLanguages: 'ru,en,uk'
    }, 'google_translate_element');
}

