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
  var offset = 20;
  var lastId;

  function updateScrolledToTab() {
    // Container scroll position:
    var fromTop = $(this).scrollTop() + topMenuHeight + offset;

    var current = scrollItems.map(function() {
      if ($(this).offset().top < fromTop) {
        return this;
      }
    });

    var last = current[current.length - 1];
    var id = last && last.length ? last[0].id : '';
    if (id !== lastId) {
      // Just scrolled into a new section.
      lastId = id;
      menuItems.removeClass('active');
      menuItems.filter("[href='#" + id + "']").addClass('active');
      history.replaceState({}, '', '#' + id);

      var blobChanges = [
        {
          value:
          "M82.3125163,136.904969 C-84.4024933,338.95148 25.7539357,438.00277 202.749483,447.640024 C379.74503,457.277278 492.268482,270.209901 646.499982,270.209901 C800.731482,270.209901 865.875405,133.406193 814.941434,65.5627367 C764.007464,-2.28071919 249.027526,-65.141543 82.3125163,136.904969 Z"
        },
        {
          value:
          "M151.864639,32.5397656 C-3.01036113,100.383222 -72.4590333,337.027512 104.536514,346.664766 C281.532061,356.30202 401.945639,463.586039 556.177139,463.586039 C710.408639,463.586039 725.083794,149.352208 674.149823,81.5087523 C623.215853,13.6652964 306.739639,-35.3036902 151.864639,32.5397656 Z"
        },
        {
          value:
          "M132.921875,21.21875 C-21.953125,89.0622059 -27.1769723,159.743492 45.5365139,276.664766 C118.25,393.586039 415.182403,445.156454 497.177139,393.586039 C579.171875,342.015625 476.355845,201.468456 425.421875,133.625 C374.487905,65.7815441 287.796875,-46.6247059 132.921875,21.21875 Z"
        }
      ];
      var change = blobChanges[Math.floor(Math.random() * blobChanges.length)];

      anime({
        targets: "#blob path",
        easing: "easeOutQuad",
        duration: 2000,
        direction: "alternate",
        loop: false,
        d: change,
      });
    }
  }

  updateScrolledToTab();
  $(window).scroll(debounce(updateScrolledToTab, 50));
});
