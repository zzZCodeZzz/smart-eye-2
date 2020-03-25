/**
 * Backend returns 3 different definitions of bool -_-' -> make 'merica bool again
 * @param input -> crazy bool
 * @return boolean
 */
export const crazyToBool = (input: any): boolean => {
    if (input === "True") {
        return true;
    } else if (input === "False") {
        return false;
    } else if (input === "0") {
        return false;
    } else if (input === "1") {
        return true;
    } else if (input === 0) {
        return false;
    } else if (input === 1) {
        return true;
    } else if (typeof input === "boolean") {
        return input;
    }
    return false;
};
