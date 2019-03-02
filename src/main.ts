import { Modeller } from "./modeller/modeller";

class Main {
    public static main() {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let modeller = new Modeller(canvas);
        // let places = new HashSet<string>(hashString, eqStrings)
        // places.add("p1");
        // places.add("p2");
        // places.add("p3");
        // places.add("p4");
        // let transitions = new HashSet<string>(hashString, eqStrings)
        // transitions.add("t1");
        // transitions.add("t2");
        // transitions.add("t3");
        // transitions.add("t4");
        // let p = new Petrinet(places, transitions);
        // console.log(p);

        // console.log(clamp(12, 24, 36));
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    Main.main();
});
