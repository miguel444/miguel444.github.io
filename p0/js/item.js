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

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, 1.),
            new THREE.MeshPhongMaterial({ color: 0xFF0000, opacity: 0.5, transparent: true })
        );

        cube.rotation.set(0, angle, 0);
        cube.position.set(
            Math.cos(angle) * 100.,
            0,
            Math.sin(angle) * 100.
        );

        this._shape = cube;

    };

    getShape(){ return this._shape; };

    html(){

        return `
            <h2>${ this._title }</h2>
            <p>
                ${this._image != null ? `<figure><img src="${ this._image }" alt="${ this._title }" /></figure>` : ''}
                ${ this._description }
            </p>
        `;

    };
}