'use strict';

describe('Service: FileReader', function () {

  // load the service's module
  beforeEach(module('filereader'));

  // instantiate service
  var FileReader, MockFileReader, $window, $scope;

  beforeEach(function () {

    // Mock FileReader
    MockFileReader = {
      readAsDataURL: function (file) {
        if (file === 'file') {
          this.result = 'readedFile';
          this.onload();
        } else if (file === 'progress') {
          this.onprogress({total: 70, loaded: 30});
        } else {
          this.result = 'fileError';
          this.onerror();
        }
      },
      readAsText: function (file, encoding) {
        if (file === 'file') {
          this.result = 'readedFile';
          this.onload();
        } else if (file === 'progress') {
          this.onprogress({total: 70, loaded: 30});
        } else {
          this.result = 'fileError';
          this.onerror();
        }
      },
      readAsBinaryString: function (file) {
        if (file === 'file') {
          this.result = 'readedFile';
          this.onload();
        } else if (file === 'progress') {
          this.onprogress({total: 70, loaded: 30});
        } else {
          this.result = 'fileError';
          this.onerror();
        }
      },
    };

    spyOn(MockFileReader, 'readAsDataURL').and.callThrough();
    spyOn(MockFileReader, 'readAsText').and.callThrough();
    spyOn(MockFileReader, 'readAsBinaryString').and.callThrough();

    // Mock window
    $window = {
      FileReader: jasmine.createSpy('FileReader').and.returnValue(MockFileReader)
    };


    module(function ($provide){
      $provide.value('$window', $window);
    });
  });

  beforeEach(inject(function (_FileReader_, $rootScope) {
    FileReader = _FileReader_;
    $scope = $rootScope.$new();
  }));

  describe('Method: readAsDataURL', function () {

    it('should return a promise', function () {
      var promise = FileReader.readAsDataURL('file', $scope);
      expect(promise.then).toBeDefined();
    });

    it('should instantiate a FileReader instance', function () {
      FileReader.readAsDataURL('file', $scope);
      expect($window.FileReader).toHaveBeenCalled();
    });

    it('should call readAsDataURL', function () {
      FileReader.readAsDataURL('file', $scope);
      expect(MockFileReader.readAsDataURL).toHaveBeenCalledWith('file');
    });

    it('should resolve promise when onload is called', function () {
      var promise = FileReader.readAsDataURL('file', $scope);
      var success, error;

      promise.then(function (resp) {
        success = resp;
      }, function () {
        error = 'this should never happen';
      });

      $scope.$apply();

      expect(error).not.toBeDefined();
      expect(success).toEqual('readedFile');
    });

    it('should reject promise when onerror is called', function () {
      var promise = FileReader.readAsDataURL('error', $scope);
      var success, error;

      promise.then(function () {
        success = 'this should never happen';
      }, function (err) {
        error = err;
      });

      $scope.$apply();

      expect(success).not.toBeDefined();
      expect(error).toEqual('fileError');
    });

    it('should broadcast an event when onprogress is called', function () {
      var total, loaded;

      $scope.$on('fileProgress', function (event, data) {
        total = data.total;
        loaded = data.loaded;
      });

      FileReader.readAsDataURL('progress', $scope);

      $scope.$apply();

      expect(total).toEqual(70);
      expect(loaded).toEqual(30);
    });

  });

  describe('Method: readAsText', function () {

    it('should return a promise', function () {
      var promise = FileReader.readAsText('file', 'utf-8', $scope);
      expect(promise.then).toBeDefined();
    });

    it('should instantiate a FileReader instance', function () {
      FileReader.readAsText('file', 'utf-8', $scope);
      expect($window.FileReader).toHaveBeenCalled();
    });

    it('should call readAsText', function () {
      FileReader.readAsText('file', 'encoding', $scope);
      expect(MockFileReader.readAsText).toHaveBeenCalledWith('file', 'encoding');
    });

    it('should resolve promise when onload is called', function () {
      var promise = FileReader.readAsText('file', 'encoding', $scope);
      var success, error;

      promise.then(function (resp) {
        success = resp;
      }, function () {
        error = 'this should never happen';
      });

      $scope.$apply();

      expect(error).not.toBeDefined();
      expect(success).toEqual('readedFile');
    });

    it('should reject promise when onerror is called', function () {
      var promise = FileReader.readAsText('error', 'encoding', $scope);
      var success, error;

      promise.then(function () {
        success = 'this should never happen';
      }, function (err) {
        error = err;
      });

      $scope.$apply();

      expect(success).not.toBeDefined();
      expect(error).toEqual('fileError');
    });

    it('should broadcast an event when onprogress is called', function () {
      var total, loaded;

      $scope.$on('fileProgress', function (event, data) {
        total = data.total;
        loaded = data.loaded;
      });

      FileReader.readAsText('progress', 'utf-8', $scope);

      $scope.$apply();

      expect(total).toEqual(70);
      expect(loaded).toEqual(30);
    });

  });

  describe('Method: readAsBinaryString', function () {

    it('should return a promise', function () {
      var promise = FileReader.readAsBinaryString('file', $scope);
      expect(promise.then).toBeDefined();
    });

    it('should instantiate a FileReader instance', function () {
      FileReader.readAsBinaryString('file', $scope);
      expect($window.FileReader).toHaveBeenCalled();
    });

    it('should call readAsBinaryString', function () {
      FileReader.readAsBinaryString('file', $scope);
      expect(MockFileReader.readAsBinaryString).toHaveBeenCalledWith('file');
    });

    it('should resolve promise when onload is called', function () {
      var promise = FileReader.readAsBinaryString('file', $scope);
      var success, error;

      promise.then(function (resp) {
        success = resp;
      }, function () {
        error = 'this should never happen';
      });

      $scope.$apply();

      expect(error).not.toBeDefined();
      expect(success).toEqual('readedFile');
    });

    it('should reject promise when onerror is called', function () {
      var promise = FileReader.readAsBinaryString('error', $scope);
      var success, error;

      promise.then(function () {
        success = 'this should never happen';
      }, function (err) {
        error = err;
      });

      $scope.$apply();

      expect(success).not.toBeDefined();
      expect(error).toEqual('fileError');
    });

    it('should broadcast an event when onprogress is called', function () {
      var total, loaded;

      $scope.$on('fileProgress', function (event, data) {
        total = data.total;
        loaded = data.loaded;
      });

      FileReader.readAsBinaryString('progress', $scope);

      $scope.$apply();

      expect(total).toEqual(70);
      expect(loaded).toEqual(30);
    });

  });
});
