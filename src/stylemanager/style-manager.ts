class StyleManager {
    protected static callbacks: HashTable<FeedbackCode, StyleManagerAction> = null;

    public static setStyle(code: FeedbackCode, context: CanvasRenderingContext2D) {
        if(StyleManager.callbacks === null) {
            StyleManager.fillCallbacks();
        }
        let action = StyleManager.callbacks.get(code);
        action.exec(context);
    }

    public static setStateStandardStyle(context: CanvasRenderingContext2D) {
        context.strokeStyle = "black";
        context.fillStyle = "white";
        context.lineWidth = 2;
    }

    public static setStateTextStyle(context: CanvasRenderingContext2D) {
        context.fillStyle = "black";
        context.font = "24px mono";
        context.textBaseline = "middle";
        context.textAlign = "center";
    }

    public static setEdgeStandardStyle(context: CanvasRenderingContext2D) {
        context.strokeStyle = "black";
        context.fillStyle = "white";
        context.lineWidth = 2;
    }

    public static setEdgeTextStyle(context: CanvasRenderingContext2D) {
        context.fillStyle = "black";
        context.font = "24px mono";
        context.textBaseline = "middle";
        context.textAlign = "center";
    }

    protected static fillCallbacks() {
        let c = StyleManager.callbacks;
        if (c !== null) {
            return;
        }
        c = new HashTable<FeedbackCode, StyleManagerAction>();
        for(let code in FeedbackCode) {
            if(Number(code)) {
                let fcode  = Number(code) as FeedbackCode;
                let fclass = fcode >= FeedbackClass.CORRECT &&
                             fcode < FeedbackClass.WARNING ? FeedbackClass.CORRECT :
                             fcode >= FeedbackClass.WARNING &&
                             fcode < FeedbackClass.INCORRECT ? FeedbackClass.WARNING :
                             FeedbackClass.INCORRECT;
                let fdigs = Number(code.slice(1));
                let fitem = fdigs >= FeedbackItem.INITIAL &&
                            fdigs < FeedbackItem.STATE ? FeedbackItem.INITIAL :
                            fdigs >= FeedbackItem.STATE &&
                            fdigs < FeedbackItem.EDGE ? FeedbackItem.STATE :
                            FeedbackItem.EDGE;
                if(fclass === FeedbackClass.CORRECT) {
                    if(fitem === FeedbackItem.STATE) {
                        c.put(fcode, new CorrectStateStyle());
                    } else if (fitem === FeedbackItem.EDGE) {
                        c.put(fcode, new CorrectEdgeStyle());
                    }
                } else if(fclass === FeedbackClass.WARNING) {
                    if(fitem === FeedbackItem.STATE) {
                        c.put(fcode, new WarningStateStyle());
                    } else if(fitem === FeedbackItem.EDGE) {
                        c.put(fcode, new WarningEdgeStyle());
                    }
                } else {
                    if(fitem === FeedbackItem.STATE) {
                        c.put(fcode, new IncorrectStateStyle());
                    } else if(fitem === FeedbackItem.EDGE) {
                        c.put(fcode, new IncorrectEdgeStyle());
                    }
                }
            }
        }
        StyleManager.callbacks = c;
    }
}


