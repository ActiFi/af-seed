ngApp.directive("colorBar", function() {
  return {
    restrict: "A",
    replace:true,
    template:'<div class="tenant-color-bar" style="height:2px;"></div>'
  };
});