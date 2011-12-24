(function($) {    
    
    var methods = {        
        init: function(behavior) {                       
            var $this = $(this), data = $this.data('dmSimpleTabsBehavior');
            if (data && behavior.dm_behavior_id != data.dm_behavior_id) { // There is attached the same, so we must report it
                alert('You can not attach symple tabs behavior to same content'); // TODO TheCelavi - adminsitration mechanizm for this? Reporting error
            };
            $this.data('dmSimpleTabsBehavior', behavior);
        },
        
        start: function(behavior) {  
            var $this = $(this),
            stopIndex = 0,
            $tabs = $this.children(), 
            $tabsNavigation = $('<ul class="dmSimpleTabsNavigation"></ul>').data('animationRunning', false),
            $tabContainer = $('<div class="dmSimpleTabsContainer"></div>').addClass(behavior.theme);
            $.each($tabs, function(index){
                $tabContainer.append($tabs[index]);
                if (index > 0) $(this).hide();
                stopIndex = index;
            });
            $this.prepend($tabContainer);
            $tabContainer.prepend($tabsNavigation);
            for (var i=0; i<=stopIndex; i++) {
                try {
                    $tabsNavigation.append($('<li></li>').append($('<a href="#" rel="' + i + '" class="tab"></a>').html(behavior.titles[i])));                    
                } catch (e) {
                    $tabsNavigation.append($('<li></li>').append($('<a href="#" rel="' + i + '" class="tab"></a>').html('Undefined')));
                }
                if (i == 0) $tabsNavigation.find('a.tab').addClass('selected');
            }
            
            $('a.tab', $tabsNavigation).bind(behavior.event, function(){
                if ($tabsNavigation.data('animationRunning')) return false;
                $tabsNavigation.data('animationRunning', true);
                $tabs = $('.dmSimpleTabsContainer').children().not('.dmSimpleTabsNavigation');                 
                var $show = $($tabs[parseInt($(this).prop('rel'))]);
                var $hide = $tabs.filter(':visible');                 
                switch(behavior.animation) {
                    case 'slide': {
                        $hide.slideUp(behavior.duration, behavior.easing, function(){
                            $show.slideDown(behavior.duration, behavior.easing, function(){
                                $tabsNavigation.data('animationRunning', false);
                            });
                        });
                    }
                    break;
                    case 'fade': {
                        $hide.fadeOut(behavior.duration, behavior.easing, function(){
                            $show.fadeIn(behavior.duration, behavior.easing, function(){
                                $tabsNavigation.data('animationRunning', false);
                            });
                        });
                    }
                    break;
                    case 'show' : {
                        $hide.hide(behavior.duration, behavior.easing, function(){
                            $show.show(behavior.duration, behavior.easing, function(){
                                $tabsNavigation.data('animationRunning', false);
                            });
                        });                             
                    }
                    break;
                    default: {
                        $hide.hide(0, behavior.easing, function(){
                            $show.show(0, behavior.easing, function(){
                                $tabsNavigation.data('animationRunning', false);
                            });
                        });
                    }
                    break;
                }
                $('a.tab', $tabsNavigation).removeClass('selected');
                $(this).addClass('selected');
                return false;
            });            
        },
        stop: function(behavior) {
            var $this = $(this),
            $tabContainer = $('.dmSimpleTabsContainer', $this);
            $('.dmSimpleTabsNavigation', $tabContainer).remove();
            var $returnItems = $tabContainer.children();
            for (var i = $returnItems.length - 1; i >= 0; i--) {
                var $item = $($returnItems[i]); 
                $this.prepend($item);
                $item.show();
            }
            $tabContainer.remove();
        },
        destroy: function(behavior) {            
            var $this = $(this);
            $this.data('dmSimpleTabsBehavior', null);
        }
    }
    
    $.fn.dmSimpleTabsBehavior = function(method, behavior){
        
        return this.each(function() {
            if ( methods[method] ) {
                return methods[ method ].apply( this, [behavior]);
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, [method] );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.dmSimpleTabsBehavior' );
            }  
        });
    };

    $.extend($.dm.behaviors, {        
        dmSimpleTabsBehavior: {
            init: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmSimpleTabsBehavior('init', behavior);
            },
            start: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmSimpleTabsBehavior('start', behavior);
            },
            stop: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmSimpleTabsBehavior('stop', behavior);
            },
            destroy: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmSimpleTabsBehavior('destroy', behavior);
            }
        }
    });
    
})(jQuery);