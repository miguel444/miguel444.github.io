class Item{

    constructor(title, description, image){

        this._title       = title;
        this._description = description;
        this._image       = image;

        this._angle = 0;
        this._size  = 0;
    };

    getTitle(){ return this._title; };

    setAttribute(angle, size){
    
        this._angle = toRadian(angle);
        this._size = size;
    
    };

    html(){

        return `
            <div class="info-item>
                <div class="info-miniature">
                    <img src="${ this._image }" alt="${ this._title }" />
                </div>
                <h2>${ this._title }</h2>
                <div class="info-container">
                    ${ this._description }
                </div>
            </div>
        `;

    };
}