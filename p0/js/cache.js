/* Cache System */
const FILE = {
    TEXTURE: 1,
    IMAGE: 2
};

/* Cache Singleton */
class Cache{
    constructor(callback){
        if(!!Cache.instance) return Cache.instance;

        Cache.instance = this;

        this._length = 0;
        this._cache  = {};
        this._callback = callback;

        return this;
    };

    add(prefix, id, img){
        this._cache[`${prefix}_${id}`] = img;
        ++this._length;
        this._callback();
    };

    get(id){
        return this._cache[id];
    }

    cacheImage(e){
        return new Promise((resolve, reject) => {

            const image = new Image();
            image.onload = _ => {
                this.add("image", e.id, image);
                resolve();
            };
            image.src = e.src;
      
        });
    };
      
    cacheTexture(e){
        return new Promise((resolve, reject) => {
      
            const loader = new THREE.TextureLoader();
            const texture = loader.load(e.src);
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearFilter;
            this.add("texture", e.id, texture);
            resolve();
        
      });
    }

    loadAll(array){
        const loaded = [];

        array.forEach(e => {
            for(let i = 0; (e.type >> i) > 0; ++i){
                switch(e.type & (1 << i)){
                    case   FILE.IMAGE: loaded.push(this.cacheImage(e));   break;
                    case FILE.TEXTURE: loaded.push(this.cacheTexture(e)); break;
                }
            }
        });

        return Promise.all(loaded);
    };

}