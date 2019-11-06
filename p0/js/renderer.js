/* RENDERER */

class Renderer{

  constructor(cache, id){
    if(!!Renderer.instance) return Renderer.instance;

    Renderer.instance = this;

    this._element     = document.getElementById(id);
    this._labels_html = document.createElement("div");
    this._labels_html.id = `${id}_labels`;
    this._element.parentNode.appendChild(this._labels_html);

    this._cache         = cache;
    this._current_node  = null;
    this._azimuth_angle = 0;

    
    this._raycast = new THREE.Raycaster();

    // Renderer
    this.createRenderer();
    
    // Camera 
    this.createCamera();

    // Control
    this.createControls();
  
    this.createScene();
    this.initDOMEvents();
    this.resize();

    this._stop = true;

    return this;
  };

  createRenderer(){

    const renderer = new THREE.WebGLRenderer({ canvas: this._element });
    renderer.autoClearColor = false;
    this._renderer = renderer;

  };

  createControls(){
    
    const controls = new THREE.OrbitControls(this._camera, this._element);
    controls.enableZoom = false;
    controls.update();
    this._controls = controls;

  };

  createCamera(){
    
    const camera = new THREE.PerspectiveCamera(75., 2., .1, 200.);
    camera.position.z = 3;
    //camera.position.set(0., 0., 0.)
    this._camera = camera;

  };

  createScene(){

    // Create scene
    const scene = new THREE.Scene();

    // Add constant light
    const light = new THREE.AmbientLight(0xFFFFFF);
    scene.add(light);

    // Background Scene
    const bgScene = new THREE.Scene();
    const shader = THREE.ShaderLib.equirect;
    const material = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide,
    });
    this._material = material;
    
    const plane = new THREE.BoxBufferGeometry(2, 2, 2);
    const bgMesh = new THREE.Mesh(plane, material);
    bgScene.add(bgMesh);

    this._background_mesh  = bgMesh;
    this._background_scene = bgScene;
    this._foreground_scene = scene;

  };

  updateDirection(){

    const used = [0, 1, 2, 3];
    used.forEach(e => document.querySelectorAll(".preview-button")[e].classList.remove("blocked"));

    this._current_node.connections().forEach(connection => {
      
      const id = mod(connection.angle() - this._azimuth_angle, 4);

      const image = this._cache.get(`image_${connection.to().getTextureId()}`);
      const element = document.querySelectorAll(".preview-button")[id];

      element.innerHTML = '';
      element.appendChild(image);
      used.splice(used.indexOf(id), 1);

    });

    used.forEach(e => document.querySelectorAll(".preview-button")[e].classList.add("blocked"));
  };

  rayCast(x, y){

    const position = new THREE.Vector2(x, y);
    this._raycast.setFromCamera(position, this._camera);
    
    let collide = this._raycast.intersectObjects(this._foreground_scene.children);

    collide = collide.map(e => e.object);
    collide = collide.map(e => this._current_node._items.find(k => k._shape.uuid === e.uuid));

    return collide;
  };

  moveTo(node){

    this._material.uniforms.tEquirect.value = this._cache.get(`texture_${node.getTextureId()}`);
    this._controls.target.set(0, 0, 0);
    this._controls.update();
    this._current_node = node;
    this.updateDirection();
    this.putItems();

  };

  putItems(){
    
    // Clear Items
    while(this._foreground_scene.children.length > 1){ this._foreground_scene.children.pop(); this._labels_html.firstChild.remove(); }
    
    this._current_node._items.forEach(item => {
      
      /* Three JS */
      this._foreground_scene.add(item.getShape());

      /* HTML */
      const label = document.createElement("span");
      label.innerText = item.getTitle();
      this._labels_html.appendChild(label);

    });

  }

  initDOMEvents(){

    window.addEventListener("resize", _ => this.resize());

    let self = this;
    this._controls.addEventListener("change", function(e){

      const degrees = toAngle(this.getAzimuthalAngle());
      const id = angle2ID(degrees);
      if(self.azimuth_angle != id){
        
        self._azimuth_angle = id;
        self.updateDirection();
      
      }
  
    });

  };

  resize(){

    this._renderer.setSize(this._element.clientWidth, this._element.clientHeight, false);
    this._camera.aspect = this._element.clientWidth / this._element.clientHeight;
    this._camera.updateProjectionMatrix();

  };

  start(){
    
    this._stop = false;
    requestAnimationFrame(time => this.render(time));

  };

  stop(){

    this._stop = true;

  };

  renderObject(){
    
    const tempV = new THREE.Vector3();

    const tempW = new THREE.Vector3();
    const tempP = new THREE.Vector3();

    for(let i = 1; i < this._foreground_scene.children.length; ++i){
      
      const element = this._foreground_scene.children[i];
      const item = this._current_node._items[i - 1];
      
      element.lookAt(this._camera.position);
      
      element.getWorldPosition(tempV);
      tempP.copy(tempV);

      tempV.project(this._camera);

      const span = this._labels_html.children[i - 1];
      const x = (tempV.x *  .5 + .5) * this._element.clientWidth;
      const y = (tempV.y * -.5 + .5) * this._element.clientHeight;
      
      this._camera.getWorldDirection(tempW);
      
      const dot = tempW.dot(tempP);

      span.style.display = dot >= 0 ? `block` : `none`;
      span.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    }

  };

  render(time){
    
    this.renderObject();

    this._background_mesh.position.copy(this._camera.position);
    this._renderer.render(this._background_scene, this._camera);
    this._renderer.render(this._foreground_scene, this._camera);
    
    if(!this._stop){
      requestAnimationFrame(time => this.render(time));
    }

  };

};