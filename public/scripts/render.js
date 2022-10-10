class Render{
    constructor(element, content){
        this.element = element;
        this.content = content;
    }

    do(){
       this.element.innerHtml = content; 
    }
}