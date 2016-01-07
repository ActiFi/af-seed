ngApp.constant('$MODAL_CONFIG', {
  genericModalPath:'templates/generic.modal.view.html'
})
.service("$modal", function($event, $MODAL_CONFIG) {
  var service;
  service = {
    isOpen:false,
    url: null,
    controller: null,
    size:null,
    open: function(url, ctrl, size) {
      service.url = url;
      service.controller = ctrl;
      service.size = size; // lg, md, sm
      if (!service.url) service.url = $MODAL_CONFIG.genericModalPath;
      $event.shout("Modal.open", {
        url: service.url,
        controller: service.controller,
        size: service.size
      });
      service.isOpen = true;
    },
    close: function(data) {
      if(!service.isOpen) return;
      $event.shout("Modal.close", data);
      service.isOpen = false;
      service.url = null;
      service.size = null;
      service.controller = null;
    },
    message:function(title, body){
      var ctrl = { title:null, body:''};
      if(arguments.length == 1) {
        ctrl.body = title;
      } else {
        ctrl.title = title;
        ctrl.body = body;
      }
      service.open($MODAL_CONFIG.genericModalPath, ctrl);
    }
  };
  return service;
})

.directive("modalHolder", function($modal, $timeout) {
  return {
    restrict: "A",
    scope: {},
    template: '<div id="modalHolder" class="ng-cloak" ng-if="modalURL">' +
                '{{modalURL}}' +
                '<div class="modal-backdrop fade" style="bottom:0; z-index: 1039;" ng-click="close()"></div>' +
                '<div class="modal fade" ng-click="close()" style="display:block">' +
                  '<div class="modal-dialog" ng-click="stopClickThrough($event)" ' +
                    // ios hack for rendering issues
                    'style="-webkit-transition: -webkit-transform 0ms; -webkit-transform-origin: 0px 0px; -webkit-transform: translate3d(0px, 0px, 0px);" ' +
                    'ng-include="modalURL" ng-class="size"></div>' +
                  '<div class="iosModelScrollHack" ></div>' +
                '</div>' +
              '</div>',
    link: function(scope, element, attrs) {
      scope.modalURL = $modal.url;
      scope.size = null;
      scope.close = function() {
        $('body').removeClass('modal-open');
        $("#modalHolder").children().removeClass("in");
        return scope.modalURL = null;
      };
      scope.$on("Modal.open", function() {
        scope.modalURL = $modal.url;
        scope.size = null;
        if($modal.size){
          switch($modal.size){
            case 'lg': scope.size = {'modal-lg':true}; break;
            case 'md': scope.size = {'modal-md':true}; break;
            case 'sm': scope.size = {'modal-sm':true}; break;
          }
        }
        $('body').addClass('modal-open');
        $timeout(function() {
          $("#modalHolder").children().addClass("in");
        }, 50);
      });

      scope.$on("Modal.close", scope.close);
      scope.stopClickThrough = function(event) {
        event.stopImmediatePropagation();
      };
    }
  };
})

.controller('GenericModalCtrl', function($scope, $modal) {

  /*
  Example usage
  $modal.open('client/views/analyzers/client.profitability.settings.php', {
    clickClose:() ->
      modalScope = $modal.getScope()
       * do something
      $modal.close()
  })
   */
  var defaultController, init;
  defaultController = {
    title: 'Are you sure?',
    body: 'Are you sure you wish to continue?',
    closeBtnLabel: 'Close',
    confirmBtnLabel: null,
    clickClose: function() {
      return $modal.close();
    },
    clickConfirm: function() {
      return $modal.close();
    },
    run: function() {
      var foo;
      return foo = 'override this';
    }
  };
  init = function() {
    _.extend($scope, defaultController, $modal.controller);
    //return $modal.updateModalScope($scope);
  };
  init();
  return $scope.run();
});