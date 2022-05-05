/**
 * 数字转为中文计数字符串
 * @param {Number} num 
 * @returns xx.x万，xxx.x亿
 */
export function getNumToString(num) {
  if (num < 10000) {
    return num
  }
  if (num >= 10000 && num < 100000000) {
    return `${(num + '').slice(0, -4)}${(num + '').slice(-4, -3) === '0' ? '' : '.' + (num + '').slice(-4, -3)}万`
  }
  if (num >= 100000000) {
    return `${(num + '').slice(0, -8)}${(num + '').slice(-8, -7) === '0' ? '' : '.' + (num + '').slice(-8, -7)}亿`
  }
}

/**
 * 数字转为时间格式
 * @param {Number} num 
 * @returns 时:分:秒
 */
export function getTimeToString(num) {
  let h, m, s
  s = num % 60
  s = s < 10 ? '0' + s : s
  if (num < 60) {
    return `0:${s}`
  }
  m = Math.floor((num / 60) % 60)
  m = num >= 3600 && m < 10 ? '0' + m : m
  if (num >= 60 && num < 3600) {
    return `${m}:${s}`
  }
  h = Math.floor(num / 3600)
  if (num >= 3600) {
    return `${h}:${m}:${s}`
  }
}

/**
 * 按字节截取字符串，溢出打点
 * @param {String} str 待截取字符串
 * @param {Number} byteLeng 截取字节数
 * @returns 
 */
export function sliceByBytes(str, byteLeng) {
  /** 
   * 按字节计算字符串长度 
   * @param {String} str 待计算字符串
   * @returns 
   */
  function byteLength(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      //UTF8编码一个中文按3个字节算（GBK编码一个中文按2个字节）  
      len += (str.charCodeAt(i) > 255 ? 2 : 1);
      //len += str.replace(/[^\x00-\xff]/g, 'xxx').length;  
    }
    return len;
  };
  /**
   * 按字节截取字符串
   * @param {String} str 待截取字符串
   * @param {Number} bytes 截取字节数
   * @returns 
   */
  function sliceByByte(str, bytes) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      //UTF8编码一个中文按3个字节算（GBK编码一个中文按2个字节）  
      len += (str.charCodeAt(i) > 255 ? 2 : 1);
      if (len > bytes) {
        return str.substring(0, i);
      }
    }
    return str;
  };
  if (byteLength(str) <= byteLeng) {
    return str
  }
  return sliceByByte(str, byteLeng) + '...'
}