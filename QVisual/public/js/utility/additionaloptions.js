﻿/**
 * Containes the jQuery function for the additional options. 
 * 
 */

// changes the text of the graph type selector dropdown menu
$(function () {
    $("#dropdown-container .dropdown-menu").on("click", "li a", function () {
        $("#graph-type").text($(this).text());
        $("#graph-type").val($(this).val());
    })
});

// toggles the visibility of the additional options container
function toggleOptions() {
    var button = $("#options");
    if (button.attr("data-value") == "right") {
        button.removeClass("glyphicon-chevron-right")
            .addClass("glyphicon-chevron-down");
        button.attr("data-value", "down");
    } else if (button.attr("data-value") == "down") {
        button.removeClass("glyphicon-chevron-down")
        .addClass("glyphicon-chevron-right");
        button.attr("data-value", "right");
    }
    $("#additional-options").slideToggle("slow");
}

// autocomplete for the topics and tokenfield
var availableTopics = undefined;
var autoCompleteTimeout = null;
$(function () {
    $("#search-input").tokenfield();
    $(".token-input").on("input", function () {
        var topic = $(this).val();
        window.clearTimeout(autoCompleteTimeout);
        autoCompleteTimeout = window.setTimeout(function () {
            if (topic.length < 4) {
                return;
            }
            $.ajax({
                type: 'POST',
                url: '/',
                data: { type: "autocomplete", value: topic },
                success: function (data) {
                    availableTopics = data;
                    $("#search-input").data('bs.tokenfield').$input.autocomplete({
                        source: availableTopics,
                        delay: 0
                    });
                }
            });
        }, 400)
    });
});

$(function () {
    $("#search-input").on('tokenfield:createtoken', function (event) {
        var existingTokens = $(this).tokenfield('getTokens');
        $.each(existingTokens, function (index, token) {
            if (token.value === event.attrs.value) {
                $(".token-input").val("");
                event.preventDefault();
            }
        });
    });
});