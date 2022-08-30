//util.js文件主要写的是会经常使用到的工具类
//校验邮箱格式
function checkEmail(email) {
	return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(
		email);
}
//校验手机格式
function checkMobile(mobile) {
	var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	return myreg.test(mobile);
}
// 密码格式
function pwds(val) {
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
	return reg.test(val)
}
/*url地址参数获取*/
function GetQueryString(name) {
	var reg = new RegExp("(^|&|)" + name + "=([^&?]*)(&|$|)", "i");
	var r = window.location.search.substr(1).match(reg);
	var context = "";
	if (r != null)
		context = r[2];
	reg = null;
	r = null;
	return context == null || context == "" || context == "undefined" ? "" : context;
};

// 设置富文本发来的图片大小
const checkImg = (html) => {
	let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
		match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
		match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
		match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
		return match;
	});
	newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
		match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
			'max-width:100%;');
		return match;
	});
	newContent = newContent.replace(/<br[^>]*\/>/gi, '');

	newContent = newContent.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
		// let domainURL = "https://www.cucine.wang";
		// capture = domainURL + capture.split(domainURL + "")[0];
		let arr = capture.split("//");
		let str = arr[0] + "//" + arr[arr.length - 1];
		var newStr = "<img src=" + str + ' alt="" />';
		return newStr;
	});

	newContent = newContent.replace(/\<img/gi,
		'<img style="max-width:100%;height:auto;display:block;margin:0 auto;"');
	return newContent;
}
const filterHtmlTag = (str = "") => {
  let content = str.replace(/<\/?[^>]*>/g,"");//去除标签
  content = content .replace(/[|]*\n/,"");//去除行尾空格
  return content;
}
export default {
	checkEmail,
	checkMobile,
	pwds,
	GetQueryString,
	checkImg,
	filterHtmlTag
}
