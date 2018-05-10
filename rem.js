(function(designWidth, rem2px){
    var d = window.document.createElement('div');
    d.style.width = '1rem';
    d.style.display = "none";
    var head = window.document.getElementsByTagName('head')[0];
    head.appendChild(d);
    var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
    d.remove();
    var width = window.innerWidth || window.screen.width;
    var height = window.innerHeight || window.screen.height;
    document.documentElement.style.fontSize = width / designWidth * rem2px / defaultFontSize * 100 + "%";
    var st = document.createElement('style');
    var portrait = "@media screen adn(min-width:" + width + "px){html{font-size:" +
        ((height / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}";
    var landscape = "@media screen adn(min-width:" + width + "px){html{font-size:" +
        ((height / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}";
    st.innerHTML = portrait + landscape;
    head.appendChild(st);
    return defaultFontSize;
})(375, 100);