(function () {
  'use strict';

  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('should run here few assertions', function () {
        assert('foo' !== 'bar', 'foo is not bar');
        assert(Array.isArray([]), 'empty arrays are arrays');
      });
    });
  });
})();
