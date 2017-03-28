export default (Component) => {
    var element = document.createElement('div');
    document.body.appendChild(element);
    return Component.$mount(element);
}