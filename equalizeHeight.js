angular.module('de.equalizeHeight')
    .service('equalizeHeightService', ['$rootScope', function($rootScope) {
        this.equalizeHeights = function () {
            $rootScope.$broadcast('equalizeHeights');
        }
    }])

    .directive('equalizeHeight', [
        '$timeout', function ($timeout) {
            var els = [];
            var distinctGroups = [];
            return {
                restrict: 'A',
                controller: function() {
                    this.registerElement = function (el, group) {
                        els.push({ group: group, el: el });
                        if (distinctGroups.indexOf(group) == -1) distinctGroups.push(group);
                    }
                },
                link: function ($scope, $elem, $attrs) {
                    var equalizeHeights = function() {
                        $timeout(function() {
                            // TODO: if no elements found with attributes [height-group], all children need to be of the same height.
                            for (var i = 0, l = distinctGroups.length; i < l; i++) {
                                var elsInGroup = els.filter(function(el) {
                                    return el.group == distinctGroups[i];
                                });

                                var maxHeight = 0;
                                for (var j = 0, jl = elsInGroup.length; j < jl; j++) {
                                    elsInGroup[j].el.css('height', '');
                                    var h = elsInGroup[j].el[0].offsetHeight;
                                    if (h > maxHeight) maxHeight = h;
                                }
                                
                                for (var k = 0, kl = elsInGroup.length; k < kl; k++) {
                                    elsInGroup[k].el.css('height', maxHeight + 'px');
                                }
                            }
                        });
                    }


                    equalizeHeights();
                    var timeoutHandler = undefined;

                    angular.element(window).on('resize', function() {
                        // wrap equalizeHeights() call into timeoutHandler so that it's called only when window resize is complete
                        if (timeoutHandler) clearTimeout(timeoutHandler);
                        timeoutHandler = setTimeout(function () {
                            equalizeHeights();
                        }, 200);
                    });

                    $scope.$on('equalizeHeights', equalizeHeights);
                }
            };
        }
    ])

    .directive('heightGroup', [function() {
        return {
            restrict: 'A',
            require: '^equalizeHeight',
            link: function($scope, $elem, $attrs, $ctrl) {
                $ctrl.registerElement($elem, $attrs.heightGroup);
            }
        };
    }]
);
