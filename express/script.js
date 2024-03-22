$(document).ready(function () {
  $(".member-photo").hover(
    function () {
      $(this).css("transform", "scale(1.1)");
    },
    function () {
      $(this).css("transform", "scale(1)");
    }
  );

  $(".show-ticket-modal").click(function () {
    $("#ticketModal").show();
  });

  $(".hide-ticket-modal").click(function () {
    $("#ticketModal").hide();
  });

  $(document).click(function (event) {
    const $target = $(event.target);
    if ($target.is($("#ticketModal"))) {
      $("#ticketModal").hide();
    }
  });

  $(".toggle-navigation").click(function () {
    $("#navigation").toggleClass("w3-show");
  });

  $.validator.addMethod("enoughTickets", function (value) {
    return value <= $("#ticketCount").text();
  });

  $("form[name='buy-ticket']").validate({
    rules: {
      purchaseCount: {
        required: true,
        enoughTickets: true,
      },
      purchaseEmail: {
        required: true,
        email: true,
      },
    },
    messages: {
      purchaseCount: "Please, enter a valid ticket amount.",
      purchaseEmail: "Please, enter a valid email address.",
    },
    submitHandler: function (form) {
      const ticketsPurchased = $("#purchaseCount").val();
      const ticketsRemaining = $("#ticketCount").text() - ticketsPurchased;

      if (ticketsRemaining > 0) {
        $("#ticketCount").text(ticketsRemaining);
      } else {
        $(".show-ticket-modal").attr("disabled", true);
        $("#ticketCount").replaceWith(
          '<span class="w3-tag w3-red w3-right w3-margin-right">Sold out</span>'
        );
      }

      $("#ticketModal").hide();
      form.reset();
    },
  });

  function slideCarousel() {
    const $first = $(".carousel").find(">div:first");
    $first.animate({ marginLeft: -$first.width() }, 1000, function () {
      const $last = $(".carousel").find(">div:last");
      $first.css({ marginLeft: 0 });
      $last.after($first);
    });
  }

  window.setInterval(slideCarousel, 3000);
});
