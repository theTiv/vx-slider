var riscroll = function($el) {

    var self = this;

    this.$el = $el;

    this.run = function() {
        this.element_class_complete = 'ri-scroll-complete';
        this.dataAttr = 'data-ri-scroll';

        // Default options
        this.options = {
            animation: 'slide',
            offset: 50,
            delay: 0
        };

        // Set options
        this.setOptions();

        this.element_class_ready = 'ri-scroll-' + this.options.animation + '-ready';
        this.element_class = 'ri-scroll';

        this.setUp();

        $(window).scroll(function() {
            self.check();
        });
    };

    this.setOptions = function() {
        $.extend(this.options, createJsonFromData(this.$el.attr(this.dataAttr)));
    };

    this.setUp = function() {
        if (self.visible() === false) {
            this.$el.addClass(self.element_class_ready).removeAttr(self.element_data_attr);
        }
    };
    this.check = function() {
        if (self.visible()) {
            setTimeout(function() {
                self.$el.addClass(self.element_class).addClass(self.element_class_complete).removeClass(self.element_class_ready);    
            }, self.options.delay);
        } else {
            console.log("not visible");
            self.$el.addClass(self.element_class_ready).removeClass(self.element_class_complete); 
        }
    };
    this.visible = function() {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elementTop = this.$el.offset().top;
        var offset = this.options.offset;
        return ((elementTop <= docViewBottom - offset) && (elementTop >= docViewTop));
    };

    function createJsonFromData(str) {
        if (str === undefined) {
            return {};
        }
        var split1 = str.split(',');
        var jsonObj = {}
        for (var i = 0; i < split1.length; i++) {
            var split2 = split1[i].split(":");
            var newJsonObj
            var properyName = split2[0];
            var properyValue = split2[1];
            jsonObj[properyName] = properyValue;
        }
        return jsonObj;
    };
    
};

$(document).ready(function() {
    
    var $elements = $('[data-ri-scroll]');
    $elements.each(function() {
        var riScrollAnim = new riscroll($(this));
        riScrollAnim.run();
    });

    var slider = $.fn.vxSlider({
        speed               : 1000,
        bodyID              : 'vx-slider',
        selector            : '> .vx-slider__slide',
        mouseSwipeDistance  : 40,
        afterSlide          : function(){},
        beforeSlide         : function(){},
        endSlide            : function(){},
        mouseWheelEvents    : true,
        mouseWheelDelay     : false,
        mouseDragEvents     : true,
        touchEvents         : true,
        arrowKeyEvents      : true,
        pagination          : true,
        nthClasses          : 2,
        detectHash          : true
    });

});