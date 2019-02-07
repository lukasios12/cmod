/// <reference path='./src/modeller.ts'/>

/// <reference path='./src/system/marking.ts'/>

/// <reference path='./lib/matrix/matrix.ts'/>

class Main {
    public static main() {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let modeller = new Modeller(canvas);

        let m = Matrix.identity(3);
        m.set(0, 0, 3);
        m.set(1, 1, 3);
        m.set(2, 2, 3);
        console.log(m, m.inverse());
        // m.set(0, 0, -5);
        // m.set(0, 1, 0);
        // m.set(0, 2, -1);
        // m.set(1, 0, 1);
        // m.set(1, 1, 2);
        // m.set(1, 2, -1);
        // m.set(2, 0, -3);
        // m.set(2, 1, 4);
        // m.set(2, 2, 1);
        // let d = m.determinant();
        // console.log(m, d);
        // let places = new HashSet<string>();
        // places.add("p1");
        // places.add("p2");
        // places.add("p3");
        // places.add("p4");

        // let transitions = new HashSet<string>();
        // transitions.add("t1");
        // transitions.add("t2");
        // transitions.add("t3");
        // transitions.add("t4");

        // let petrinet = new Petrinet(places, transitions);

        // let marking = new Marking(petrinet);

        // console.log(petrinet.getPlaces());

    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    Main.main();
});
