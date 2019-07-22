export const getItemsPosition = (itemType) => {
    let items = document.getElementsByClassName(itemType);
    let arrayOfPosition = [];
    for(let i = 0; i < items.length; i++){
        arrayOfPosition.push(items[i].offsetParent.offsetLeft);
    }
    return arrayOfPosition;
}

export const isAboveOtherItem = (itemsPositions, currentTranslation, initialXPosition) => {
    for(let i = 0; i < itemsPositions.length; i++){
        if(((itemsPositions[i] - initialXPosition) >= currentTranslation && (itemsPositions[i] - initialXPosition) < (currentTranslation + 100)) || ((itemsPositions[i] - initialXPosition) <= currentTranslation && (itemsPositions[i] - initialXPosition) > (currentTranslation - 100))){
            return i;
        }  
    }
    return false;
}