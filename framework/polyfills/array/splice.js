Array.prototype.splice = function (startIndex, numItems) {
    var array = this;
    var endIndex = startIndex + numItems;

    var itemsBeforeSplice = [];
    var splicedItems = [];
    var itemsAfterSplice = [];

    for (var i = 0; i < array.length; i++) {
        if (i < startIndex) { itemsBeforeSplice.push(array[i]); }
        if (i >= startIndex && i < endIndex) { splicedItems.push(array[i]); }
        if (i >= endIndex) { itemsAfterSplice.push(array[i]); }
    }


    for (var i = 2; i < arguments.length; i++) {
        itemsBeforeSplice.push(arguments[i]);
    }


    var remainingItems = itemsBeforeSplice.concat(itemsAfterSplice);


    for (var i = 0, len = Math.max(array.length, remainingItems.length); i < len; i++) {
        if (remainingItems.length > i) {
            array[i] = remainingItems[i];
        } else {
            array.pop();
        }
    }
    return splicedItems;
}