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
        context.font = "16px monospace";
        context.textBaseline = "middle";
        context.textAlign = "center";
    }

    public static setStateSelectedStyle(context: CanvasRenderingContext2D) {
        context.strokeStyle = "rgba(50, 193, 229, 0.6)";
        context.fillStyle = "white";
        context.lineWidth = 15;
    }

    public static setStateTextStyle(context: CanvasRenderingContext2D) {
        context.fillStyle = "black";
    }

    public static setEdgeStandardStyle(context: CanvasRenderingContext2D) {
        context.strokeStyle = "black";
        context.fillStyle = "black";
        context.lineWidth = 2;
        context.font = "16px mono";
        context.textBaseline = "middle";
        context.textAlign = "center";
    }

    public static setEdgeSelectedStyle(context: CanvasRenderingContext2D) {
        context.strokeStyle = "rgba(50, 193, 229, 0.6)";
        context.lineWidth = 15;
    }

    public static setEdgeTextStyle(context: CanvasRenderingContext2D) {
        context.fillStyle = "black";
    }

    protected static fillCallbacks() {
        let c = StyleManager.callbacks;
        if (c !== null) {
            return;
        }
        c = new HashTable<FeedbackCode, StyleManagerAction>();
        for(let code in FeedbackCode) {
            let fcode = Number(code) as FeedbackCode;
            let h = Math.floor(fcode / 100);
            let t = Math.floor((fcode - h * 100) / 10);
            if(Number(h)) {
                switch(h) {
                    case 2:
                        if (t == 2 || t == 3) {
                            c.add(fcode, new CorrectStateStyle());
                        } else if (t == 4 || t == 5) {
                            c.add(fcode, new CorrectEdgeStyle());
                        }
                        break;
                    case 3:
                        if (t == 2 || t == 3) {
                            c.add(fcode, new WarningStateStyle());
                        } else if (t == 4 || t == 5) {
                            c.add(fcode, new WarningEdgeStyle());
                        }
                        break;
                    case 4:
                        if (t == 2 || t == 3) {
                            c.add(fcode, new IncorrectStateStyle());
                        } else if (t == 4 || t == 5) {
                            c.add(fcode, new IncorrectEdgeStyle());
                        }
                        break;
                }
            }
        }
        StyleManager.callbacks = c;
    }
}


