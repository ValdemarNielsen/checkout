//Test for zipCode with specefic zipCode, should return correct city

const {describe} = require('@jest/globals')

describe('zipCode', () => {
    const {it, expect} = require('@jest/globals')

    it('should return correct city', async () => {
        const newZipCode = "2860";
        let cityName = "";

        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${newZipCode}`);
            const json = await response.json();
            cityName = json[0]?.navn || "";
        }catch {
            expect(cityName).toBe("Søborg");
        }expect(cityName).toBe("Søborg");
    });
});