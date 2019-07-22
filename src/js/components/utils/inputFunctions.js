const checkLength = (input) => {
    return input.length > 0;
}

const checkIfAuthorized = (input) => {
   return /^[A-z0-9\s-]+$/.test(input);
}

export const checkInput = (input) => {
    return checkLength(input) && checkIfAuthorized(input);
}