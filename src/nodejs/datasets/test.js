var qm = require('qminer');
var assert = require('assert')
var datasets = qm.datasets;

qm.delLock();
qm.config('qm.conf', true, 8080, 1024);

describe('qm.datasets', function () {

    describe('#describe()', function () {

        it('it should return text description of the module', function () {
            assert.ok(datasets.description());
        });

    });

    describe('#loadIrisSync() - testing synchronious version of Iris dataset loader', function () {
        var base = qm.create('qm.conf', '', true);
        var Iris = datasets.loadIrisSync(base);

        // Close base after tests
        after(function () {
            base.close();
        })

        it('it should load store with iris dataset', function () {
            assert.ok(Iris.name);
        });

        it('it should return store with name Iris', function () {
            assert.equal(Iris.name, "Iris");
        });

        it('it should return store with 150 records', function () {
            assert.equal(Iris.length, 150);
        });

    })

    describe('#loadIris() - testing asynchronious version of Iris dataset loader', function () {
        var base;
        var Iris;

        // Reload base, and wait for store to be loaded.
        before(function (done) {
            base = qm.create('qm.conf', '', true);

            datasets.loadIris(base, function (err, store) {
                if (err) throw err;
                Iris = store;
                done();
            });

        });

        // Close base after tests
        after(function () {
            base.close();
        })

        it('it should load store with iris dataset', function () {
            assert.ok(Iris.name);
        });

        it('it should return store with name Iris', function () {
            assert.equal(Iris.name, "Iris");
        });

        it('it should return store with 150 records', function () {
            assert.equal(Iris.length, 150);
        });

    });

});
