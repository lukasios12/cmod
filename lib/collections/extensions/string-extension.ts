function hashString(str: string) {
        let hash = 0;
        if (str.length == 0) return hash;
        for(let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
}

function eqStrings(l: string, r: string) {
    return l === r;
}

export { hashString, eqStrings };


// import { Hashable } from "../hashable";

// class hstring implements Hashable<hstring> { 
//     public value: string;
    
//     public constructor(val: string) {
//         this.value = val;
//     }
    
//     public hash(): number {
//         let hash = 0;
//         if (this.value.length == 0) return hash;
//         for(let i = 0; i < this.value.length; i++) {
//             let char = this.value.charCodeAt(i);
//             hash = ((hash << 5) - hash) + char;
//             hash = hash & hash;
//         }
//         return hash;
//     }
    
//     public equals(rhs: hstring): boolean {
//         return this.value == rhs.value;
//     }
    
//     public static fromString(str: string): hstring {
//         return new hstring(str);
//     }
// }

// export { hstring };