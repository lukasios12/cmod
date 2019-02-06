var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Feedback = /** @class */ (function () {
    function Feedback() {
        this.general = new HashSet();
        this.specific = new HashTable();
    }
    Feedback.prototype.get = function (id) {
        if (this.specific.hasKey(id)) {
            return this.specific.get(id);
        }
        return null;
    };
    Feedback.prototype.add = function (code, id) {
        if (id === void 0) { id = null; }
        if (id === null) {
            this.general.add(code);
        }
        else {
            if (!this.specific.hasKey(id)) {
                this.specific.put(id, new HashSet());
            }
            this.specific.get(id).add(code);
        }
    };
    Feedback.prototype.del = function (code, id) {
        if (id === void 0) { id = null; }
        if (id === null) {
            this.general.remove(code);
        }
        else {
            if (this.specific.hasKey(id)) {
                this.specific.get(id).remove(code);
            }
        }
    };
    return Feedback;
}());
var FeedbackCode;
(function (FeedbackCode) {
    FeedbackCode[FeedbackCode["CORRECT_INITIAL_STATE"] = 200] = "CORRECT_INITIAL_STATE";
    FeedbackCode[FeedbackCode["NO_INITIAL_STATE"] = 400] = "NO_INITIAL_STATE";
    FeedbackCode[FeedbackCode["INCORRECT_INITIAL_STATE"] = 401] = "INCORRECT_INITIAL_STATE";
    FeedbackCode[FeedbackCode["REACHABLE_FROM_PRESET"] = 220] = "REACHABLE_FROM_PRESET";
    FeedbackCode[FeedbackCode["DUPLICATE_STATE"] = 320] = "DUPLICATE_STATE";
    FeedbackCode[FeedbackCode["OMEGA_OMITTED"] = 321] = "OMEGA_OMITTED";
    FeedbackCode[FeedbackCode["NOT_REACHABLE_FROM_PRESET"] = 420] = "NOT_REACHABLE_FROM_PRESET";
    FeedbackCode[FeedbackCode["EDGE_MISSING"] = 421] = "EDGE_MISSING";
    FeedbackCode[FeedbackCode["NOT_REACHABLE_FROM_INITIAL"] = 422] = "NOT_REACHABLE_FROM_INITIAL";
    FeedbackCode[FeedbackCode["OMEGA_FROM_PRESET_OMITTED"] = 423] = "OMEGA_FROM_PRESET_OMITTED";
    FeedbackCode[FeedbackCode["ENABLED_CORRECT_POST"] = 240] = "ENABLED_CORRECT_POST";
    FeedbackCode[FeedbackCode["DUPLICATE_EDGE"] = 340] = "DUPLICATE_EDGE";
    FeedbackCode[FeedbackCode["ENABLED_CORRECT_POST_WRONG_LABEL"] = 440] = "ENABLED_CORRECT_POST_WRONG_LABEL";
    FeedbackCode[FeedbackCode["ENABLED_INCORRECT_POST"] = 441] = "ENABLED_INCORRECT_POST";
    FeedbackCode[FeedbackCode["DISABLED"] = 442] = "DISABLED";
    FeedbackCode[FeedbackCode["DISABLED_CORRECT_POST"] = 443] = "DISABLED_CORRECT_POST";
    FeedbackCode[FeedbackCode["MISSED_SELF_LOOP"] = 444] = "MISSED_SELF_LOOP";
})(FeedbackCode || (FeedbackCode = {}));
var FeedbackTranslator = /** @class */ (function () {
    function FeedbackTranslator() {
    }
    FeedbackTranslator.Translate = function (code) {
        if (FeedbackTranslator.Translations == null) {
            FeedbackTranslator.FillTranslations();
        }
        return FeedbackTranslator.Translations.get(code);
    };
    FeedbackTranslator.FillTranslations = function () {
        FeedbackTranslator.Translations = new HashTable();
        var t = FeedbackTranslator.Translations;
        // initial states
        t.put(FeedbackCode.NO_INITIAL_STATE, "No initial state is defined");
        t.put(FeedbackCode.INCORRECT_INITIAL_STATE, "The defined initial state is incorrect");
        t.put(FeedbackCode.CORRECT_INITIAL_STATE, "The initial state is correct");
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
    };
    FeedbackTranslator.Translations = null;
    return FeedbackTranslator;
}());
var FeedbackClass;
(function (FeedbackClass) {
    FeedbackClass[FeedbackClass["CORRECT"] = 200] = "CORRECT";
    FeedbackClass[FeedbackClass["WARNING"] = 300] = "WARNING";
    FeedbackClass[FeedbackClass["INCORRECT"] = 400] = "INCORRECT";
})(FeedbackClass || (FeedbackClass = {}));
var FeedbackItem;
(function (FeedbackItem) {
    FeedbackItem[FeedbackItem["INITIAL"] = 0] = "INITIAL";
    FeedbackItem[FeedbackItem["STATE"] = 20] = "STATE";
    FeedbackItem[FeedbackItem["EDGE"] = 40] = "EDGE";
})(FeedbackItem || (FeedbackItem = {}));
/// <reference path='./feedback.ts'/>
/// <reference path='./feedback-code.ts'/>
/// <reference path='./feedback-translator.ts'/>
/// <reference path='./feedback-class.ts'/>
/// <reference path='./feedback-item.ts'/>
var StyleManager = /** @class */ (function () {
    function StyleManager() {
    }
    StyleManager.setStyle = function (code, context) {
        if (StyleManager.callbacks === null) {
            StyleManager.fillCallbacks();
        }
        var action = StyleManager.callbacks.get(code);
        action.exec(context);
    };
    StyleManager.setStateStandardStyle = function (context) {
        context.strokeStyle = "black";
        context.fillStyle = "white";
        context.lineWidth = 2;
    };
    StyleManager.setStateTextStyle = function (context) {
        context.fillStyle = "black";
        context.font = "24px mono";
        context.textBaseline = "middle";
        context.textAlign = "center";
    };
    StyleManager.setEdgeStandardStyle = function (context) {
        context.strokeStyle = "black";
        context.fillStyle = "white";
        context.lineWidth = 2;
    };
    StyleManager.setEdgeTextStyle = function (context) {
        context.fillStyle = "black";
        context.font = "24px mono";
        context.textBaseline = "middle";
        context.textAlign = "center";
    };
    StyleManager.fillCallbacks = function () {
        var c = StyleManager.callbacks;
        if (c !== null) {
            return;
        }
        c = new HashTable();
        for (var code in FeedbackCode) {
            if (Number(code)) {
                var fcode = Number(code);
                var fclass = fcode >= FeedbackClass.CORRECT &&
                    fcode < FeedbackClass.WARNING ? FeedbackClass.CORRECT :
                    fcode >= FeedbackClass.WARNING &&
                        fcode < FeedbackClass.INCORRECT ? FeedbackClass.WARNING :
                        FeedbackClass.INCORRECT;
                var fdigs = Number(code.slice(1));
                var fitem = fdigs >= FeedbackItem.INITIAL &&
                    fdigs < FeedbackItem.STATE ? FeedbackItem.INITIAL :
                    fdigs >= FeedbackItem.STATE &&
                        fdigs < FeedbackItem.EDGE ? FeedbackItem.STATE :
                        FeedbackItem.EDGE;
                if (fclass === FeedbackClass.CORRECT) {
                    if (fitem === FeedbackItem.STATE) {
                        c.put(fcode, new CorrectStateStyle());
                    }
                    else if (fitem === FeedbackItem.EDGE) {
                        c.put(fcode, new CorrectEdgeStyle());
                    }
                }
                else if (fclass === FeedbackClass.WARNING) {
                    if (fitem === FeedbackItem.STATE) {
                        c.put(fcode, new WarningStateStyle());
                    }
                    else if (fitem === FeedbackItem.EDGE) {
                        c.put(fcode, new WarningEdgeStyle());
                    }
                }
                else {
                    if (fitem === FeedbackItem.STATE) {
                        c.put(fcode, new IncorrectStateStyle());
                    }
                    else if (fitem === FeedbackItem.EDGE) {
                        c.put(fcode, new IncorrectEdgeStyle());
                    }
                }
            }
        }
        StyleManager.callbacks = c;
    };
    StyleManager.callbacks = null;
    return StyleManager;
}());
var CorrectStateStyle = /** @class */ (function () {
    function CorrectStateStyle() {
    }
    CorrectStateStyle.prototype.exec = function (context) {
        context.strokeStyle = "green";
        context.fillStyle = "white";
        context.lineWidth = 25;
    };
    return CorrectStateStyle;
}());
var CorrectEdgeStyle = /** @class */ (function () {
    function CorrectEdgeStyle() {
    }
    CorrectEdgeStyle.prototype.exec = function (context) {
        context.font = "12px mono";
        context.fillStyle = "white";
        context.strokeStyle = "green";
        context.lineWidth = 12;
        context.textBaseline = "middle";
        context.textAlign = "center";
    };
    return CorrectEdgeStyle;
}());
var WarningStateStyle = /** @class */ (function () {
    function WarningStateStyle() {
    }
    WarningStateStyle.prototype.exec = function (context) {
    };
    return WarningStateStyle;
}());
var WarningEdgeStyle = /** @class */ (function () {
    function WarningEdgeStyle() {
    }
    WarningEdgeStyle.prototype.exec = function (context) {
    };
    return WarningEdgeStyle;
}());
var IncorrectStateStyle = /** @class */ (function () {
    function IncorrectStateStyle() {
    }
    IncorrectStateStyle.prototype.exec = function (context) {
    };
    return IncorrectStateStyle;
}());
var IncorrectEdgeStyle = /** @class */ (function () {
    function IncorrectEdgeStyle() {
    }
    IncorrectEdgeStyle.prototype.exec = function (context) {
    };
    return IncorrectEdgeStyle;
}());
/// <reference path='./style-manager-action.ts'/>
/// <reference path='./correct-state-style.ts'/>
/// <reference path='./correct-edge-style.ts'/>
/// <reference path='./warning-state-style.ts'/>
/// <reference path='./warning-edge-style.ts'/>
/// <reference path='./incorrect-state-style.ts'/>
/// <reference path='./incorrect-edge-style.ts'/>
/// <reference path='./style-manager.ts'/>
/// <reference path='./actions/index.ts'/>
var Matrix = /** @class */ (function () {
    function Matrix(r, c) {
        this.data = [];
        for (var i = 0; i < r; i++) {
            this.data.push([]);
            for (var j = 0; j < c; j++) {
                this.data[i].push(0);
            }
        }
    }
    Matrix.prototype.get = function (row, col) {
        return this.data[row][col];
    };
    Matrix.prototype.set = function (row, col, value) {
        this.data[row][col] = value;
    };
    Matrix.prototype.rows = function () {
        return this.data.length;
    };
    Matrix.prototype.cols = function () {
        return this.rows() > 0 ? this.data[0].length : 0;
    };
    Matrix.add = function (lhs, rhs) {
        if (!(lhs.cols() == rhs.cols() && lhs.rows() == rhs.rows())) {
            console.log("invalid matrix addition: unequal sizes");
            return null;
        }
        var result = new Matrix(lhs.rows(), rhs.rows());
        for (var r = 0; r < lhs.rows(); r++) {
            for (var c = 0; c < lhs.cols(); c++) {
                result.set(r, c, lhs.get(r, c) + rhs.get(r, c));
            }
        }
        return result;
    };
    Matrix.mult = function (lhs, rhs) {
        if (!(lhs.cols() == rhs.rows())) {
            console.log("invalid matrix muliplication: unequal sizes");
            return null;
        }
        var result = new Matrix(lhs.rows(), rhs.cols());
        for (var r = 0; r < lhs.rows(); r++) {
            for (var c = 0; c < rhs.cols(); c++) {
                var k = 0;
                for (var cc = 0; cc < lhs.rows(); cc++) {
                    k += lhs.get(r, cc) * rhs.get(cc, c);
                }
                result.set(r, c, k);
            }
        }
        return result;
    };
    Matrix.identity = function (s) {
        var res = new Matrix(s, s);
        for (var i = 0; i < s; i++) {
            res.set(i, i, 1);
        }
        return res;
    };
    return Matrix;
}());
/// <reference path='../feedback/index.ts'/>
/// <reference path='../stylemanager/index.ts'/>
/// <reference path='../../lib/matrix/matrix.ts'/>
var Drawer = /** @class */ (function () {
    function Drawer(canvas) {
        this.canvas = canvas;
        this.resize();
        this.drawingCache = null;
        this.currentTransform = Matrix.identity(3);
    }
    Drawer.prototype.draw = function (drawing, feedback) {
        if (drawing === void 0) { drawing = null; }
        if (feedback === void 0) { feedback = null; }
        this.clear();
        // this.drawGrid();
        var context = this.canvas.getContext("2d");
        // Matrix3D.setTransform(this.currentTransform, context);
        if (drawing) {
            drawing.draw(context);
        }
        else if (this.drawingCache) {
            this.drawingCache.draw(context);
        }
        this.drawingCache = drawing;
    };
    Drawer.prototype.clear = function () {
        var context = this.canvas.getContext("2d");
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        var width = this.canvas.width;
        var height = this.canvas.height;
        context.clearRect(0, 0, width, height);
        context.restore();
    };
    Drawer.prototype.registerEvents = function () {
        var _this = this;
        window.addEventListener('resize', function (event) {
            _this.resize();
        });
        var canvas = this.canvas;
        var context = canvas.getContext("2d");
        var movementSpeed = 40;
        var zoomAmount = 1.2;
        canvas.addEventListener("keydown", function (event) {
            console.log(event);
            switch (event.keyCode) {
                case 38: // up
                    _this.shift(0, -movementSpeed);
                    break;
                case 39: // right
                    _this.shift(movementSpeed);
                    break;
                case 40: // down
                    _this.shift(0, movementSpeed);
                    break;
                case 37: // left
                    _this.shift(-movementSpeed);
                    break;
                case 61: // +
                    if (event.shiftKey) {
                        _this.zoom(zoomAmount);
                    }
                    break;
                case 173:
                    _this.zoom(1 / zoomAmount);
                    break;
            }
        });
    };
    Drawer.prototype.transform = function (mat) {
        var t = Matrix.mult(this.currentTransform, mat);
        this.setTransform(t);
    };
    Drawer.prototype.setTransform = function (mat) {
        this.currentTransform = mat;
        var context = this.canvas.getContext("2d");
        context.setTransform(mat.get(0, 0), mat.get(1, 0), mat.get(0, 1), mat.get(1, 1), mat.get(0, 2), mat.get(1, 2));
        this.draw(this.drawingCache);
    };
    Drawer.prototype.resize = function () {
        var parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;
        if (this.drawingCache) {
            this.draw(this.drawingCache);
        }
    };
    Drawer.prototype.shift = function (h, v) {
        if (h === void 0) { h = 0; }
        if (v === void 0) { v = 0; }
        var mat = new Matrix(3, 3);
        mat.set(0, 2, -h);
        mat.set(1, 2, -v);
        var r = Matrix.add(mat, this.currentTransform);
        this.setTransform(r);
    };
    Drawer.prototype.zoom = function (amount) {
        var mat = Matrix.identity(3);
        mat.set(0, 0, amount);
        mat.set(1, 1, amount);
        this.transform(mat);
    };
    Drawer.prototype.globalToLocal = function (point) {
        var context = this.canvas.getContext("2d");
        var vector = new Matrix(3, 1);
        vector.set(0, 0, point.x);
        vector.set(1, 0, point.y);
        vector.set(2, 0, 1);
        var mat = this.currentTransform;
        var normalized = Matrix.mult(mat, vector);
        return new Point2D(normalized.get(0, 0), normalized.get(1, 0));
    };
    Drawer.prototype.drawGrid = function () {
        var context = this.canvas.getContext("2d");
        var width = this.canvas.width;
        var height = this.canvas.height;
        var amount = 50;
        var h = Math.round(amount);
        var v = Math.round(amount);
        context.strokeStyle = "rgba(255, 100, 100, .8)";
        context.lineWidth = 1;
        var th = this.currentTransform.get(0, 2);
        var tv = this.currentTransform.get(1, 2);
        for (var i = 0; i < amount; i++) {
            context.beginPath();
            context.moveTo(-th, i * v - tv);
            context.lineTo(width - th, i * v - tv);
            context.closePath();
            context.stroke();
        }
        for (var i = 0; i < amount; i++) {
            context.beginPath();
            context.moveTo(i * h, -th);
            context.lineTo(i * h, height);
            context.closePath();
            context.stroke();
        }
    };
    return Drawer;
}());
/// <reference path='./drawer.ts'/>
Number.prototype.hash = function () {
    return Math.floor(this);
};
Number.prototype.equals = function (rhs) {
    return this == rhs;
};
String.prototype.hash = function () {
    var hash = 0;
    if (this.length == 0)
        return hash;
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
};
String.prototype.equals = function (rhs) {
    return this == rhs;
};
/// <reference path='./number-extension.ts'/>
/// <reference path='./string-extension.ts'/>
var HashSet = /** @class */ (function () {
    function HashSet(buckets) {
        if (buckets === void 0) { buckets = 5; }
        this.map = new Array();
        for (var i = 0; i < buckets; i++) {
            this.map[i] = new Array();
        }
    }
    HashSet.prototype.add = function (key) {
        var hash = this.hash(key);
        this.remove(key);
        this.map[hash].push(key);
    };
    HashSet.prototype.remove = function (key) {
        var hash = this.hash(key);
        var bucket = this.map[hash];
        this.map[hash] = bucket.filter(function (item) {
            return !key.equals(item);
        });
    };
    HashSet.prototype.contains = function (key) {
        var hash = this.hash(key);
        return this.map[hash].indexOf(key) >= 0;
    };
    HashSet.prototype.member = function (key) {
        return this.contains(key);
    };
    HashSet.prototype.isEmpty = function () {
        for (var i = 0; i < this.map.length; i++) {
            if (this.map[i].length > 0) {
                return false;
            }
        }
        return true;
    };
    HashSet.prototype.clear = function () {
        for (var i = 0; i < this.map.length; i++) {
            this.map[i] = new Array();
        }
    };
    HashSet.prototype.each = function (f) {
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                f(this.map[i][j]);
            }
        }
    };
    HashSet.prototype.clone = function () {
        var result = new HashSet();
        this.each(function (item) {
            result.add(item);
        });
        return result;
    };
    HashSet.prototype.union = function (rhs) {
        var result = this.clone();
        rhs.each(function (item) {
            result.add(item);
        });
        return result;
    };
    HashSet.prototype.intersection = function (rhs) {
        var result = new HashSet();
        this.each(function (item) {
            if (rhs.member(item)) {
                result.add(item);
            }
        });
        return result;
    };
    HashSet.prototype.difference = function (rhs) {
        var result = new HashSet();
        this.each(function (item) {
            if (!rhs.member(item)) {
                result.add(item);
            }
        });
        return result;
    };
    HashSet.prototype.disjoint = function (rhs) {
        return this.intersection(rhs).isEmpty();
    };
    HashSet.prototype.toArray = function () {
        var result = new Array();
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                result.push(this.map[i][j]);
            }
        }
        return result;
    };
    HashSet.prototype.length = function () {
        var r = 0;
        for (var i = 0; i < this.map.length; i++) {
            r += this.map[i].length;
        }
        return r;
    };
    HashSet.prototype.hash = function (key) {
        return key.hash() % this.map.length;
    };
    return HashSet;
}());
/// <reference path='../hashable.ts'/>
/// <reference path='./hash-set.ts'/>
var HashTable = /** @class */ (function () {
    function HashTable(buckets) {
        if (buckets === void 0) { buckets = 5; }
        this.map = new Array();
        for (var i = 0; i < buckets; i++) {
            this.map[i] = new Array();
        }
    }
    HashTable.prototype.add = function (key, value) {
        var record = new HashRecord(key, value);
        var hash = this.hash(key);
        this.remove(key);
        this.map[hash].push(record);
    };
    HashTable.prototype.put = function (key, value) {
        this.add(key, value);
    };
    HashTable.prototype.get = function (key) {
        var hash = this.hash(key);
        for (var i = 0; i < this.map[hash].length; i++) {
            if (key.equals(this.map[hash][i].key)) {
                return this.map[hash][i].value;
            }
        }
        return null;
    };
    HashTable.prototype.remove = function (key) {
        var hash = this.hash(key);
        this.map[hash] = this.map[hash].filter(function (record) {
            return !key.equals(record.key);
        });
    };
    HashTable.prototype.hasKey = function (key) {
        var hash = this.hash(key);
        for (var i = 0; i < this.map[hash].length; i++) {
            if (key.equals(this.map[hash][i].key)) {
                return true;
            }
        }
        return false;
    };
    HashTable.prototype.hasValue = function (value) {
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                if (value === this.map[i][j].value) {
                    return true;
                }
            }
        }
        return false;
    };
    HashTable.prototype.keys = function () {
        var result = new Array();
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                result.push(this.map[i][j].key);
            }
        }
        return result;
    };
    HashTable.prototype.values = function () {
        var result = new Array();
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                result.push(this.map[i][j].value);
            }
        }
        return result;
    };
    HashTable.prototype.clear = function () {
        for (var i = 0; i < this.map.length; i++) {
            this.map[i] = new Array();
        }
    };
    HashTable.prototype.toArray = function () {
        var result = [];
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                result.push(this.map[i][j]);
            }
        }
        return result;
    };
    HashTable.prototype.length = function () {
        var r = 0;
        for (var i = 0; i < this.map.length; i++) {
            r += this.map[i].length;
        }
        return r;
    };
    HashTable.prototype.hash = function (key) {
        return key.hash() % this.map.length;
    };
    return HashTable;
}());
var HashRecord = /** @class */ (function () {
    function HashRecord(key, value) {
        this.key = key;
        this.value = value;
    }
    return HashRecord;
}());
/// <reference path='../hashable.ts'/>
/// <reference path='./hash-table.ts'/>
/// <reference path='./hash-record.ts'/>
/// <reference path='./hashable.ts'/>
/// <reference path='./extensions/index.ts'/>
/// <reference path='./hashset/index.ts'/>
/// <reference path='./hashtable/index.ts'/>
/// <reference path='../../../lib/collections/index.ts'/>
var Graph = /** @class */ (function () {
    function Graph() {
        this.states = new HashTable();
        this.edges = new HashTable();
        this.initial = null;
        this.counter = 0;
    }
    Graph.prototype.addState = function (state) {
        console.log("adding state: " + state);
        return this.counter++;
    };
    Graph.prototype.addEdge = function (edge) {
        console.log("adding edge: " + edge);
        return this.counter++;
    };
    Graph.prototype.delState = function (id) {
        console.log("removing state with id: " + id);
    };
    Graph.prototype.delEdge = function (id) {
        console.log("removing edge with id: " + id);
    };
    Graph.prototype.setInitial = function (id) {
        this.initial = id;
    };
    Graph.prototype.getInitial = function () {
        return this.initial;
    };
    return Graph;
}());
var Edge = /** @class */ (function () {
    function Edge(from, to, label) {
        this.from = from;
        this.to = to;
        this.label = label;
    }
    return Edge;
}());
/// <reference path='./graph.ts'/>
/// <reference path='./edge.ts'/>
/// <reference path='./state.ts'/>
var CanvasRenderingContext2DUtils = /** @class */ (function () {
    function CanvasRenderingContext2DUtils() {
    }
    CanvasRenderingContext2DUtils.getFontSize = function (context) {
        return Number(/\d+(?=px)/i.exec(context.font)[0]);
    };
    return CanvasRenderingContext2DUtils;
}());
/// <reference path='../system/graph/index.ts'/>
/// <reference path='../stylemanager/index.ts'/>
/// <reference path='../utils/canvas-rendering-context-2d-utils.ts'/>
var StateDrawing = /** @class */ (function () {
    function StateDrawing(state, position) {
        if (position === void 0) { position = null; }
        this.state = state;
        if (position) {
            this.position = position;
        }
        else {
            this.position = new Point2D(0, 0);
        }
    }
    StateDrawing.prototype.draw = function (context) {
        context.save();
        StyleManager.setStateTextStyle(context);
        var text = this.state.toString();
        var width = this.getWidth(context);
        var height = this.getHeight(context);
        var box = new Rectangle(this.position.x, this.position.y, width, height);
        context.restore();
        box.fill(context);
        box.stroke(context);
        StyleManager.setStateTextStyle(context);
        context.fillText(text, this.position.x + width / 2, this.position.y + height / 2);
    };
    StateDrawing.prototype.hit = function (point, context) {
        console.log(point);
        var height = this.getHeight(context);
        var width = this.getHeight(context);
        console.log(this.position, width, height);
        return (point.x >= this.position.x && point.x <= this.position.x + width &&
            point.y >= this.position.y && point.y <= this.position.y + height);
    };
    StateDrawing.prototype.drag = function (point, context) {
        var width = this.getWidth(context);
        var height = this.getHeight(context);
        var newPos = new Point2D(point.x - (width / 2), point.y - (height / 2));
        this.position = newPos;
    };
    StateDrawing.prototype.getHeight = function (context) {
        return 2 * CanvasRenderingContext2DUtils.getFontSize(context);
    };
    StateDrawing.prototype.getWidth = function (context) {
        return context.measureText(this.state.toString()).width + 10;
    };
    return StateDrawing;
}());
var EdgeDrawing = /** @class */ (function () {
    function EdgeDrawing(edge) {
        this.edge = edge;
    }
    EdgeDrawing.prototype.draw = function (context) {
        console.log("edge drawing");
    };
    return EdgeDrawing;
}());
var GraphDrawing = /** @class */ (function () {
    function GraphDrawing(options) {
        if (options === void 0) { options = null; }
        this.states = new HashTable();
        this.edges = new HashTable();
        this.initial = null;
        this.options = options;
    }
    GraphDrawing.prototype.draw = function (context) {
        var states = this.states;
        var edges = this.edges;
        var stateIds = states.keys();
        var edgeIds = edges.keys();
        for (var i = 0; i < stateIds.length; i++) {
            var state = states.get(stateIds[i]);
            var codes = this.options.feedback.get(stateIds[i]);
            if (codes !== null) {
                var codeArray = codes.toArray();
                codeArray.sort().reverse();
                StyleManager.setStyle(codeArray[0], context);
                state.draw(context);
            }
            StyleManager.setStateStandardStyle(context);
            state.draw(context);
        }
    };
    GraphDrawing.prototype.addState = function (id, state, position) {
        if (position === void 0) { position = null; }
        var drawing = new StateDrawing(state, position);
        this.states.put(id, drawing);
    };
    GraphDrawing.prototype.addEdge = function (id, edge) {
        var drawing = new EdgeDrawing(edge);
        this.edges.put(id, drawing);
    };
    GraphDrawing.prototype.delState = function (id) {
        this.states.remove(id);
    };
    GraphDrawing.prototype.delEdge = function (id) {
        this.edges.remove(id);
    };
    GraphDrawing.prototype.getStateDrawing = function (pos, context) {
        var keys = this.states.keys();
        for (var i = 0; i < keys.length; i++) {
            if (this.states.get(keys[i]).hit(pos, context)) {
                return this.states.get(keys[i]);
            }
        }
        return null;
    };
    GraphDrawing.prototype.getEdgeDrawing = function (pos, context) {
    };
    GraphDrawing.prototype.getSelfloopDrawing = function (pos, context) {
    };
    return GraphDrawing;
}());
/// <reference path='../feedback/index.ts'/>
var GraphDrawingOptions = /** @class */ (function () {
    function GraphDrawingOptions(feedback, selected) {
        if (feedback === void 0) { feedback = null; }
        if (selected === void 0) { selected = null; }
        this.feedback = feedback;
        this.selected = selected;
    }
    return GraphDrawingOptions;
}());
var Point2D = /** @class */ (function () {
    function Point2D(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point2D;
}());
var Line = /** @class */ (function () {
    function Line(x1, y1, x2, y2) {
        this.source = new Point2D(x1, y1);
        this.target = new Point2D(x2, y2);
    }
    Line.prototype.stroke = function (context) {
        this.preparePath(context);
        context.stroke();
    };
    Line.prototype.fill = function (context) {
        this.preparePath(context);
        context.fill();
    };
    Line.prototype.hit = function (point, context) {
        return false;
    };
    Line.prototype.preparePath = function (context) {
        context.beginPath();
        context.moveTo(this.source.x, this.source.y);
        context.lineTo(this.target.x, this.target.y);
    };
    return Line;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, w, h) {
        this.source = new Point2D(x, y);
        this.width = w;
        this.height = h;
    }
    Rectangle.prototype.stroke = function (context) {
        context.strokeRect(this.source.x, this.source.y, this.width, this.height);
    };
    Rectangle.prototype.fill = function (context) {
        context.fillRect(this.source.x, this.source.y, this.width, this.height);
    };
    Rectangle.prototype.hit = function (point, context) {
        return false;
    };
    return Rectangle;
}());
/// <reference path='./shape2d.ts'/>
/// <reference path='./point2d.ts'/>
/// <reference path='./line.ts'/>
/// <reference path='./rectangle.ts'/>
/// <reference path='./drawing.ts'/>
/// <reference path='./hittable-drawing.ts'/>
/// <reference path='./state-drawing.ts'/>
/// <reference path='./edge-drawing.ts'/>
/// <reference path='./graph-drawing.ts'/>
/// <reference path='./graph-drawing-options.ts'/>
/// <reference path='../shapes/index.ts'/>
var TokenCount = /** @class */ (function () {
    function TokenCount() {
    }
    return TokenCount;
}());
var IntegerTokenCount = /** @class */ (function (_super) {
    __extends(IntegerTokenCount, _super);
    function IntegerTokenCount(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    IntegerTokenCount.prototype.add = function (rhs) {
        if (rhs instanceof IntegerTokenCount) {
            var value = this.value + rhs.value;
            return new IntegerTokenCount(value);
        }
        else if (rhs instanceof OmegaTokenCount) {
            return new OmegaTokenCount;
        }
        else if (typeof rhs === "number") {
            var value = this.value + rhs;
            return new IntegerTokenCount(value);
        }
        else {
            return this;
        }
    };
    IntegerTokenCount.prototype.subtract = function (rhs) {
        if (rhs instanceof IntegerTokenCount) {
            var value = this.value - rhs.value;
            return new IntegerTokenCount(value);
        }
        else if (rhs instanceof OmegaTokenCount) {
            return new OmegaTokenCount;
        }
        else if (typeof rhs === "number") {
            var value = this.value - rhs;
            return new IntegerTokenCount(value);
        }
        else {
            return this;
        }
    };
    IntegerTokenCount.prototype.toString = function () {
        return this.value.toString();
    };
    return IntegerTokenCount;
}(TokenCount));
var OmegaTokenCount = /** @class */ (function (_super) {
    __extends(OmegaTokenCount, _super);
    function OmegaTokenCount() {
        return _super.call(this) || this;
    }
    OmegaTokenCount.prototype.add = function (rhs) {
        return new OmegaTokenCount();
    };
    OmegaTokenCount.prototype.subtract = function (rhs) {
        return new OmegaTokenCount();
    };
    OmegaTokenCount.prototype.toString = function () {
        return "OMEGA";
    };
    return OmegaTokenCount;
}(TokenCount));
/// <reference path='./token-count.ts'/>
/// <reference path='./integer-token-count.ts'/>
/// <reference path='./omega-token-count.ts'/>
/// <reference path='../marking.ts'/>
/// <reference path='../../../lib/collections/index.ts'/>
var Petrinet = /** @class */ (function () {
    function Petrinet(p, t) {
        this.places = p;
        this.transitions = t;
    }
    Petrinet.prototype.getPlaces = function () {
        return this.places;
    };
    Petrinet.prototype.getTransitions = function () {
        return this.transitions;
    };
    return Petrinet;
}());
/// <reference path='./petrinet.ts'/>
/// <reference path='./tokens/index.ts'/>
/// <reference path='./petrinet/index.ts'/>
/// <reference path='../../lib/collections/index.ts'/>
var Marking = /** @class */ (function () {
    function Marking(petrinet, map) {
        if (map === void 0) { map = null; }
        this.map = new HashTable();
        var places = petrinet.getPlaces().toArray();
        for (var i = 0; i < places.length; i++) {
            this.map.put(places[i], new IntegerTokenCount(0));
        }
    }
    Marking.prototype.set = function (place, tokens) {
        this.map.put(place, tokens);
    };
    Marking.prototype.get = function (place) {
        return this.map.get(place);
    };
    Marking.prototype.toString = function () {
        var places = this.map.keys();
        var result = new Array();
        for (var i = 0; i < places.length; i++) {
            result.push(places[i] + ": " + this.map.get(places[i]));
        }
        return "[" + result.join(", ") + "]";
    };
    return Marking;
}());
/// <reference path='./marking.ts'/>
/// <reference path='./graph/index.ts'/>
/// <reference path='./tokens/index.ts'/>
/// <reference path='./petrinet/index.ts'/>
/// <reference path='./action.ts'/>
/// <reference path='./undoable-action.ts'/>
/// <reference path='../action/index.ts'/>
var ActionManager = /** @class */ (function () {
    function ActionManager() {
        this.history = new Array();
        this.pointer = this.history.length - 1;
    }
    ActionManager.prototype.exec = function (action) {
        action.exec();
        if (this.pointer == this.history.length - 1) {
            this.history.push(action);
        }
        else {
            this.history[this.pointer + 1] = action;
        }
        this.pointer++;
        this.history.splice(this.pointer);
    };
    ActionManager.prototype.undo = function () {
        if (this.pointer >= 0) {
            var action = this.history[this.pointer];
            action.undo();
        }
        this.pointer = Math.max(-1, this.pointer - 1);
    };
    ActionManager.prototype.redo = function () {
        if (this.pointer < this.history.length - 1) {
            this.pointer = Math.min(this.pointer + 1, this.history.length - 1);
            var action = this.history[this.pointer];
            action.exec();
        }
    };
    return ActionManager;
}());
/// <reference path='./action-manager.ts'/>
/// <reference path='./drawer/index.ts'/>
/// <reference path='./drawing/index.ts'/>
/// <reference path='./system/index.ts'/>
/// <reference path='./feedback/index.ts'/>
/// <reference path='../lib/action-manager/index.ts'/>
/// <reference path='../lib/matrix/matrix.ts'/>
var Modeller = /** @class */ (function () {
    function Modeller(canvas, petrinet) {
        if (petrinet === void 0) { petrinet = null; }
        this.drawer = new Drawer(canvas);
        this.actionManager = new ActionManager();
        this.registerEvents();
        var places = new HashSet();
        places.add("p1");
        places.add("p2");
        places.add("p3");
        places.add("p4");
        var transitions = new HashSet();
        transitions.add("t1");
        transitions.add("t2");
        transitions.add("t3");
        transitions.add("t4");
        this.petrinet = new Petrinet(places, transitions);
        var a = Matrix.identity(3);
        a.set(0, 2, -2);
        a.set(1, 2, -1);
        var b = new Matrix(3, 1);
        b.set(0, 0, 17);
        b.set(1, 0, 10);
        b.set(2, 0, 1);
        var r = Matrix.mult(a, b);
        console.log(r);
        this.graph = new Graph();
        this.graphDrawing = new GraphDrawing();
        this.graphDrawingOptions = new GraphDrawingOptions();
        var feedback = new Feedback();
        feedback.add(FeedbackCode.REACHABLE_FROM_PRESET, 0);
        this.setFeedback(feedback);
        var s = new Marking(this.petrinet);
        s.set("p1", new IntegerTokenCount(1));
        this.addState(s);
        this.drawer.draw(this.graphDrawing);
    }
    Modeller.prototype.addState = function (state, position) {
        if (position === void 0) { position = null; }
        var id = this.graph.addState(state);
        this.graphDrawing.addState(id, state, position);
    };
    Modeller.prototype.addEdge = function (edge) {
        var id = this.graph.addEdge(edge);
        this.graphDrawing.addEdge(id, edge);
    };
    Modeller.prototype.delState = function (id) {
        this.graph.delState(id);
        this.graphDrawing.delState(id);
    };
    Modeller.prototype.delEdge = function (id) {
        this.graph.delEdge(id);
        this.graphDrawing.delEdge(id);
    };
    Modeller.prototype.setFeedback = function (feedback) {
        this.feedback = feedback;
        this.graphDrawingOptions.feedback = feedback;
        this.graphDrawing.options = this.graphDrawingOptions;
    };
    Modeller.prototype.registerEvents = function () {
        var _this = this;
        this.drawer.registerEvents();
        window.addEventListener("offline", function (event) {
            alert("You seem to be offline, you cannot receive feedback while offline");
        });
        var canvas = this.drawer.canvas;
        var context = canvas.getContext("2d");
        canvas.addEventListener("click", function (event) {
            var point = new Point2D(event.clientX, event.clientY);
            var tpoint = _this.drawer.globalToLocal(point);
            context.fillRect(tpoint.x, tpoint.y, 10, 10);
        });
    };
    return Modeller;
}());
/// <reference path='./src/modeller.ts'/>
/// <reference path='./src/system/marking.ts'/>
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.main = function () {
        var canvas = document.getElementById("canvas");
        var modeller = new Modeller(canvas);
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
    };
    return Main;
}());
document.addEventListener("DOMContentLoaded", function (event) {
    Main.main();
});
