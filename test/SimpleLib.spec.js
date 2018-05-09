var SimpleLib = artifacts.require("./SimpleLib.sol");
//var TotoContract = artifacts.require("./TotoContract.sol");

contract('SimpleLib', accounts => {

    it("should have an instance of SimpleLib", () => {
        return SimpleLib.new(0)
            .then(instance => assert.isTrue(!!instance.address))
    })

    it.skip("should SimpleLib default value to 0", () => {
        let SimpleLib
        return SimpleLib.deployed()
            .then(instance => SimpleLib = instance)
            .then(() => SimpleLib.libCall())
            .then(result => assert.equal(result.logs[0].args.totoLog.valueOf(), 0))
            .then(() => SimpleLib.libCall.call())
            .then(result => assert.equal(result.valueOf(), 0))
    })

    it.skip("should SimpleLib set default value to 12345", () => {
        let SimpleLib
        return SimpleLib.new(12345)
            .then(instance => SimpleLib = instance)
            .then(() => SimpleLib.libCall())
            .then(result => assert.equal(result.logs[0].args.totoLog.valueOf(), 12345))
            .then(() => SimpleLib.libCall.call())
            .then(result => assert.equal(result.valueOf(), 12345))
    })

    it.skip("should SimpleLib returns default value", () => {
        return SimpleLib.new(12345)
            .then(instance => instance.libCall.call())
            .then(result => assert.equal(result.valueOf(), 12345))
    })

    it.skip('should have an instance of TotoContract', () => {
        return SimpleLib.new(1)
            .then(instance => instance.address)
            .then(libAddress => TotoContract.new(libAddress))
            .then(instance => instance.myCall())
            .then(result => assert.equal(result.logs[0].args.totoContract.valueOf(), 1))
    })

    it.skip('should TotoContract update SimpleLib version', () => {
        const LIB_PARAM_1 = 12345
        const LIB_PARAM_2 = 67890
        let libAddress1, libAddress2, totoContract

        return SimpleLib.new(LIB_PARAM_1)
            .then(instance => libAddress1 = instance.address)
            .then(() => SimpleLib.new(LIB_PARAM_2))
            .then(instance => libAddress2 = instance.address)
            .then(() => TotoContract.new(libAddress1))
            .then(instance => totoContract = instance)

            .then(() => totoContract.myCall())
            .then(result => assert.equal(result.logs[0].args.totoContract.valueOf(), LIB_PARAM_1))

            .then(() => totoContract.setLib(libAddress2))
            .then(() => totoContract.myCall())
            .then(result => assert.equal(result.logs[0].args.totoContract.valueOf(), LIB_PARAM_2))
    })

});
