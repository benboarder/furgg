var Furgg= (function(){
  var $el = $('#furgg-main'),
    $sections = $el.children('section'),
    $sectionWork = $('#furgg-work-section'),
    $workItems = $('#furgg-work-items > div'),
    $workPanelsContainer = $('#furgg-panel-work-items'),
    $workPanels = $workPanelsContainer.children('div'),
    totalWorkPanels = $workPanels.length,
    $nextWorkItem = $workPanelsContainer.find('nav > span.furgg-next-work'),
    isAnimating = false,
    $closeWorkItem = $workPanelsContainer.find('nav > span.furgg-icon-close'),
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
    supportTransitions = Modernizr.csstransitions;

  function init(){
    initScreenEvents();
    initAlignmentEvents();
  }

  function initAlignmentEvents(){
    $(".free-wall").each(function(){
      var wall = new freewall(this);
      wall.reset({
        selector: '.size320',
        cellW: 320,
        cellH: 320,
        fixSize: 0,
        gutterY: 20,
        gutterX: 20,
        onResize: function(){
          wall.fitWidth();
        }
      })
      wall.fitWidth();
    });

    $(window).trigger("resize");
  }

  function initScreenEvents(){
    $workItems.on('click', function(event){
      $workPanelsContainer.addClass('furgg-panel-items-show');
      var $panel = $workPanelsContainer.find("[data-panel='" + $(this).data('panel') + "']");
      currentWorkPanel = $panel.index();
      $panel.addClass('furgg-show-work');

      return false;
    });

    $nextWorkItem.on('click', function(event){
      if(isAnimating){

        return false;
      }
      isAnimating = true;
      var $currentPanel = $workPanels.eq(currentWorkPanel);
      currentWorkPanel = currentWorkPanel < totalWorkPanels - 1 ? currentWorkPanel + 1 : 0;
      var $nextPanel = $workPanels.eq(currentWorkPanel);
      $currentPanel.removeClass('furgg-show-work').addClass('furgg-hide-current-work').on(transEndEventName, function(event){
        if(!$(event.target).is('div')){

          return false;
        }
        $(this).off(transEndEventName).removeClass('furgg-hide-current-work');
        isAnimating = false;
      });
      if(!supportTransitions){
        $currentPanel.removeClass('furgg-hide-current-work');
        isAnimating = false;
      }
      $nextPanel.addClass('furgg-show-work');

      return false;
    });

    $closeWorkItem.on('click', function(event){
      $workPanels.eq(currentWorkPanel).removeClass('furgg-show-work');

      return false;
    });
  }

  return{
    init: init
  };
})();