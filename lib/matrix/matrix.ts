class Matrix {
    protected data: Array<Array<number>>;

    public constructor(r: number, c: number) {
        this.data = [];
        for(let i = 0; i < r; i++) {
            this.data.push([]);
            for(let j = 0; j < c; j++) {
                this.data[i].push(0);
            }
        }
    }

    public get(row: number, col: number) {
        return this.data[row][col];
    }

    public set(row: number, col: number, value: number) {
        this.data[row][col] = value;
    }

    public rows() {
        return this.data.length;
    }

    public cols() {
        return this.rows() > 0 ? this.data[0].length : 0;
    }

    public static add(lhs: Matrix, rhs: Matrix) {
        if(!(lhs.cols() == rhs.cols() && lhs.rows() == rhs.rows())) {
            console.log("invalid matrix addition: unequal sizes");
            return null;
        }
        let result = new Matrix(lhs.rows(), rhs.rows());
        for(let r = 0; r < lhs.rows(); r++) {
            for(let c = 0; c < lhs.cols(); c++) {
                result.set(r, c, lhs.get(r,c) + rhs.get(r,c));
            }
        }
        return result;
    }

    public static mult(lhs: Matrix, rhs: Matrix) {
        if(!(lhs.cols() == rhs.rows())) {
            console.log("invalid matrix muliplication: unequal sizes");
            return null;
        }
        let result = new Matrix(lhs.rows(), rhs.cols());
        for(let r = 0; r < lhs.rows(); r++) {
            for(let c = 0; c < rhs.cols(); c++) {
                let k = 0;
                for(let cc = 0; cc < lhs.rows(); cc++) {
                    k += lhs.get(r, cc) * rhs.get(cc, c);
                }
                result.set(r,c,k);
            }
        }
        return result;
    }

    public static identity(s: number) {
        let res = new Matrix(s, s);
        for(let i = 0; i < s; i++) {
            res.set(i, i, 1);
        }
        return res;
    }
}
