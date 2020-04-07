export default {

    /**
     * 生成随机数
     * @param {number} max 最大值（取不到）
     * @param {number} min 最小值
     */
    num_random (max, min = 0) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    /**
     * 数字求和
     * @param  {...number} args
     */
    num_sum (...args) {
        return args.reduce((s, item) => s + item, 0)
    },
    
    /**
     * 生成指定长度的数组
     * @param {number} len 数组的长度
     */
    arr_create (len){
        return [...new Array(len).keys()];
    },

    /**
     * 创建指定长度的随机数组，且规定范围
     * @param {number} len 指定长度
     * @param {number} max 最大值（取不到）
     * @param {number} min 最小值
     */
    arr_createRandom (len, max = 10, min = 0) {
        let arr = new Array(len);
        const self = this;
        const uniqueArr = arr => [...new Set(arr)];  // 数组去重
        // 生成数组
        (function produceArr() {
            let i = 0;
            while (i < arr.length) {
                arr[i] = self.num_random(max, min);
                i++;
            }
            return uniqueArr(arr).length < len && produceArr();  // 去重后的数组小于数组的长度，再次生成数组
        }());
        return arr;
    },

    /**
     * 数组去重
     * @param {array} arr 被去重数组
     */
    arr_unique (arr) {
        return [...new Set(arr)];
    },

    /**
     * 数组降维
     * @param {number} arr 被降维数组
     */
    arr_dropDimension (arr) {
        return Array.prototype.concat.apply([], arr)
    },

    /**
     * 类数组转数组
     * @param {*} classArr 类数组对象
     */
    arr_classChange(classArr){
        return Array.from(classArr);
    },

    /**
     * 浅层克隆
     * @param {object} origin 被克隆对象
     * @param {object} target 克隆对象
     */
    obj_clone (origin, target = {}) {
        for (const prop in origin) {
            target[prop] = origin[prop];
        }
        return target;
    },

    /**
     * 深度克隆
     * @param {object} origin 被克隆对象
     * @param {object} target 克隆对象
     */
    obj_deepClone (origin, target = {}) {
        const toStr = Object.prototype.toString;
        for (const prop in origin) {
            if (origin.hasOwnProperty(prop)) {  // 查看自身属性是否存在
                // 判断是数组还是对象
                if (typeof (origin[prop]) !== 'null' && typeof (origin[prop]) === 'object') {
                    target[prop] = toStr.call(origin[prop]) == '[object Array]' ? [] : {};
                    this.obj_deepClone(origin[prop], target[prop]);  // 重新克隆子级
                } else {
                    target[prop] = origin[prop];
                }
            }
        }
        return target;
    },
    
    /**
     * 生成重复字符串
     * @param {string} str 传入字符串
     * @param {number} n 重复次数
     */
    str_repeat (str, n = 1) {
        let num = Math.abs(n), res = '';  // 防止传入负数，造成死循环
        while (num) {
            num % 2 === 1 && (res += str);
            num > 1 && (str += str);

            num >>= 1;  // 左位移1位
        }
        return res;
    },

    /**
     * 计算字符串字节长度
     * @param {string} str 传入字符串
     */
    str_bytesLength (str) {
        let len = str.length, i = 0;
        while (i < len) {
            str.charCodeAt(i) > 255 && len++;  // .charCodeAt() 返回指定位置的字符的 Unicode 编码
            i++;
        }
        return len;
    },
}