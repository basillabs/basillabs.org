// Navigation:
$(function() {
  // Highlight active tab:
  $('.nav-menu').on('click', '.nav-item', function(event) {

    $('.nav-item').removeClass('active');
    $(this).addClass('active');

    var linked = $(this.hash);

    if (linked.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: linked.offset().top,
        duration: 800
      });

      history.replaceState({}, '', this.hash);
    }
  });

  $('.logo-nav').click(function() {
    $('html, body').animate({
      scrollTop: 0,
      duration: 800
    });
  })
});

// From https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// As you scroll tab highlighting:
$(function() {
  var menuItems = $('.nav-menu .nav-item');
  // Get sections on the page:
  var scrollItems = menuItems.map(function() {
    var section = $($(this).attr('href'));
    if (section.length) {
      return section;
    }
  });

  var topMenuHeight = $('.navbar').outerHeight();
  var lastId;

  function updateScrolledToTab() {
    // Container scroll position:
    var fromTop = $(this).scrollTop() + topMenuHeight;

    var current = scrollItems.map(function() {
      if ($(this).offset().top < fromTop) {
        return this;
      }
    });

    var last = current[current.length - 1];
    var id = last && last.length ? last[0].id : '';

    if (id !== lastId) {
      lastId = id;
      menuItems.removeClass('active');
      menuItems.filter("[href='#" + id + "']").addClass('active');
      history.replaceState({}, '', '#' + id);
    }
  }

  updateScrolledToTab();
  $(window).scroll(debounce(updateScrolledToTab, 50));
});
