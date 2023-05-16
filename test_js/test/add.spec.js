// const assert = require('assert');
var expect = require('chai').expect;
const addUtility = require('./../add.js');

describe('Add', function() {
    describe('addUtility', function() {
        it('deberia tener un metodo sumar', function() {
            // assert.equal(typeof addUtility, 'object');
            // assert.equal(typeof addUtility.sumar, 'function');
            expect(addUtility).to.be.an('object');
            expect(addUtility).to.have.property('sumar');
        });

        it('addUtility.sumar(5, 4) debe regresar 9', function(){
            // assert.deepEqual(addUtility.sumar(5, 4), 9);
            expect(addUtility.sumar(5, 4)).to.deep.equal(9);
        });

        it('addUtility.sumar(100, 6) debe regresar 106', function() {
            expect(addUtility.sumar(100, 6)).to.deep.equal(106);
        });
    });
});