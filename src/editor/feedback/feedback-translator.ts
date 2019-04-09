import FeedbackCode from "./feedback-code";

import { HashTable } from "lib/collections/hashtable/hash-table";
import { hashNumber, eqNumbers } from "lib/collections/extensions/number-extension"

export default class FeedbackTranslator
{
    protected static translations: HashTable<FeedbackCode, string> | null = null;

    public static translate(code: FeedbackCode): string {
        if(FeedbackTranslator.translations == null) {
            FeedbackTranslator.fillTranslations();
        }
        if (FeedbackTranslator.translations!.hasKey(code)) {
            return FeedbackTranslator.translations!.get(code)!;
        }
        throw new Error(`Could not retrieve translation for code ${code}`)
    }

    protected static fillTranslations(): void {
        FeedbackTranslator.translations = new HashTable<FeedbackCode, string>(hashNumber, eqNumbers);

        let t = FeedbackTranslator.translations;
        
        // initial states
        t.put(FeedbackCode.NO_INITIAL_STATE, "No initial state is defined");
        t.put(FeedbackCode.INCORRECT_INITIAL_STATE, "The defined initial state is incorrect");
        t.put(FeedbackCode.CORRECT_INITIAL_STATE, "The initial state is correct");
        t.put(FeedbackCode.OMEGA_IN_INITIAL, "One of the places in the initial state is marked as unbounded. This is impossible");

        // states
        t.put(FeedbackCode.NOT_REACHABLE_FROM_PRESET, "This state is not reachable from one of the markings in its pre-set");
        t.put(FeedbackCode.REACHABLE_FROM_PRESET, "This state is reachable");
        t.put(FeedbackCode.EDGE_MISSING, "This state is missing an outgoing edge");
        t.put(FeedbackCode.DUPLICATE_STATE, "This state occurs multiple times in the graph");
        t.put(FeedbackCode.OMEGA_OMITTED, "One of the places can be marked unbounded");
        t.put(FeedbackCode.NOT_REACHABLE_FROM_INITIAL, "This state is not reachable from the initial state of the graph");
        t.put(FeedbackCode.OMEGA_FROM_PRESET_OMITTED, "One or more places does not have ω assigned to it, while at least one of the states in the preset does.");

        // edges
        t.put(FeedbackCode.ENABLED_CORRECT_POST, "This transition is enabled and points to the correct state");
        t.put(FeedbackCode.ENABLED_CORRECT_POST_WRONG_LABEL, "This edge's label is incorrect");
        t.put(FeedbackCode.ENABLED_INCORRECT_POST, "This transition does not lead to this state");
        t.put(FeedbackCode.DISABLED, "This transition can't fire");
        t.put(FeedbackCode.DISABLED_CORRECT_POST, "This transition is disabled, but this state is reachable");
        t.put(FeedbackCode.DUPLICATE_EDGE, "This transition leads to multiple states");
        t.put(FeedbackCode.MISSED_SELF_LOOP, "This edge should points to its source");
    }
}
