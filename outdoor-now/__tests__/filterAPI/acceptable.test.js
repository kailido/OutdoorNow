import isAcceptable from "../../src/helpers/filer/acceptable";

test("should return true when passee equal conditions", () => {
    const currCondition = 'sunny';
    const minCondition = 'sunny';
    const result = isAcceptable(minCondition, currCondition);
    //assert true
    expect(result).toBe(true);
})

test("should return true when passed current conditons that are deemed greater than minCondition", () => {
    const currCondition = 'cloudy';
    const minCondition = 'rain';
    const result = isAcceptable(minCondition, currCondition);
    //assert true
    expect(result).toBe(true);
})

test("should return false when currentConditons are deemed less than minCondition", () => {
    const currCondition = 'snow';
    const minCondition = 'sunny';
    const result = isAcceptable(minCondition, currCondition);
    //assert false
    expect(result).toBe(false);
})