function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function sort(items){
    var len = items.length,
        i, j, stop;
    for (i=0; i < len; i++){
        for (j=0, stop=len-i; j < stop; j++){
            if (items[j] > items[j+1]){
                swap(items, j, j+1);
            }
        }
    }
    return items;
}
console.log(sort([]));
console.log(sort([5]));
console.log(sort([4,1]));
console.log(sort([3,2,3]));
console.log(sort([5,3,8,9,4,1]));