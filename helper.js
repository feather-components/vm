export default{
    offset(element){
        var top = 0, left = 0;

        do{
            top += element.offsetTop;
            left += element.offsetLeft;
        }while(element = element.offsetParent);

        return {
            left,
            top
        }
    },

    siblings(element){
        return [].filter.call(element.parentNode.children, (child) => child !== element);
    },

    height(element){
        return this.isDoc(element) ? document.documentElement.clientHeight : element.offsetHeight;
    },

    width(element){
        return this.isDoc(element) ? document.documentElement.clientWidth : element.offsetWidth;
    },

    isDoc(element){
        return element === document.documentElement || element === document;
    },

    assign(obj){
        [].slice.call(arguments, 1).forEach((args) => {
            for(var i in args){
                obj[i] = args[i];
            }
        })

        return obj
    },

    $: (str) => {
        return typeof str == 'string' ? document.querySelector(str) : str;
    }
}

!Object.assign && (Object.assign = assign);