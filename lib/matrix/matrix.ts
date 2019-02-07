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

    public minor(row: number, col: number) {
        if(this.rows() <= 1 || this.cols() <= 1) {
            console.error("Could not compute minor of matrix.");
        }
        let m = new Matrix(this.rows() - 1, this.cols() - 1);
        for(let r = 0; r < this.rows(); r++) {
            for (let c = 0; c < this.cols(); c++) {
                if(r == row || c == col) {
                    continue;
                }
                let roffset = 0;
                let coffset = 0;
                if(r > row) roffset = 1;
                if(c > col) coffset = 1;
                m.set(r - roffset, c - coffset, this.get(r, c));
            }
        }
        return m;
    }

    public cofactor(row: number, col: number) {
        if (this.rows() != this.cols()) {
            console.error("Could not cofactor for non-square matrix");
        }
        if (this.rows() == 1) {
            return Math.pow(-1, row + col) * this.get(0, 0);
        }
        return Math.pow(-1, row + col) * this.minor(row, col).determinant();
    }

    public determinant() {
        if(this.rows() != this.cols()) {
            console.error("Could not compute determinant for non-square matrix");
        }
        if(this.rows() == 1) {
            return this.get(0, 0);
        }
        let s = 0;
        for(let i = 0; i < this.rows(); i++) {
            s += this.get(0,i) * this.cofactor(0, i);
        }
        return s;
    }

    public inverse() {
        if(this.rows() != this.cols()) {
            console.error("Could not compute inverse of matrix with data: ", this.data,
                        "Matrix is not square");
        }
        let i = new Matrix(this.rows(), this.rows());
        let d = this.determinant();
        for(let r = 0; r < this.rows(); r++) {
            for(let c = 0; c < this.cols(); c++) {
                i.set(r, c, this.minor(r, c).determinant() / d);
            }
        }
        return i.transpose();
    }

    public transpose() {
        let m = new Matrix(this.cols(), this.rows());
        for(let r = 0; r < this.rows(); r++) {
            for(let c = 0; c < this.cols(); c++) {
                m.set(c, r, this.get(r, c));
            }
        }
        return m;
    }

    public static add(lhs: Matrix, rhs: Matrix) {
        if(!(lhs.cols() == rhs.cols() && lhs.rows() == rhs.rows())) {
            console.error("invalid matrix addition: unequal sizes");
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
