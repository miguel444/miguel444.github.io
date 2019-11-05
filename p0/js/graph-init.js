/* Declaration */
const arrayanes = new Node("Palacio de Arrayanes", "arrayanes");
const court_lions = new Node("Palacio de Leones", "court_lions");
court_lions.addItem(leones);

const dusk = new Node("Dusk", "dusk");
const dos_hermanas = new Node("Dos Hermanas", "dos_hermanas");
dos_hermanas.setPosition(100, 200);

const golden_room = new Node("Habitación dorada", "golden_room");
const mocarabes = new Node("Mocarabes", "mocarabes");
const generalife = new Node("Generalife", "generalife");
const pool = new Node("Piscina de la alhambra", "pool");

arrayanes.connect(court_lions, 0);
arrayanes.connect(dusk, 90);
arrayanes.connect(pool, 180);


dusk.connect(generalife, 90);