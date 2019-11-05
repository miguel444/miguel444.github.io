/* MAP */

class Node{
    constructor(name, image_id){
        this._connections = [];
        this._name = [];
        this._image_id = image_id;
        
        this._items = [];
    };

    addItem(item){ this._items.push(item); };

    getTextureId(){ return this._image_id; };

    connect(node, angle){
        
        let id0 = angle2ID(angle), id1 = angle2ID((angle + 180) % 360);
        this._connections[id0] = new Connection(this, node, id0);
        node._connections[id1] = new Connection(node, this, id1);

    };

    connections(){ return this._connections; };
    connectionTo(id){ return this._connections[id].to(); }
}

class Connection{
    constructor(a, b, angle){
        this._connection_a = a;
        this._connection_b = b;
        this._angle_walk = angle;
    };

    from(){ return this._connection_a; };
    to(){ return this._connection_b; };
    angle(){ return this._angle_walk; };
}