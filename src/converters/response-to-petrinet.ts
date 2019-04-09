import Petrinet from "src/system/petrinet/petrinet";
import { PetrinetResponse } from "src/types";

import { HashSet } from "lib/collections/hashset/hash-set";
import { hashString, eqStrings } from "lib/collections/extensions/string-extension";

export default class ResponseToPetrinet {
    public static convert(response: PetrinetResponse) {
        let places = new HashSet<string>(hashString, eqStrings);
        let transitions = new HashSet<string>(hashString, eqStrings);

        for(let i = 0; i < response.places.length; i++) {
            places.add(response.places[i]);
        }

        for(let i = 0; i < response.transitions.length; i++) {
            transitions.add(response.transitions[i]);
        }

        let petrinet = new Petrinet(places, transitions);
        return petrinet;
    }
}
