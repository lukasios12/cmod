/// <reference path='./src/modeller.ts'/>

/// <reference path='./src/system/marking.ts'/>

class Main {
    public static main() {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let modeller = new Modeller(canvas);

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
