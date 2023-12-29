$(document).ready( function () {

    const catalogName = $('.item_name');


    function CutStr(strList, maxLength) {

        strList.each(function (item) {
            if (strList[item].innerText.length > maxLength) {
                strList[item].innerText = strList[item].innerText.slice(0, maxLength)
                strList[item].innerText += '...';
                return strList[item].innerText
            }
            return strList[item].innerText
        })
        return strList
    }



















    CutStr(catalogName, 43);
})