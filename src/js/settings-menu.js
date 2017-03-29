/* global $ */

let $settingsIcon = $('#settings-icon')
let $settingsMenu = $('#settings-menu')
let $tempToggle = $('#temp-toggle')
let $toggleItems = $('.toggle-item')

let $temp = $('#temp')

// show or hide settings menu
$settingsIcon.on('click', () => {
  if (settingsAreVisible()) {
    hideSettings()
  } else {
    showSettings()
  }
})

// select units on page load
$(document).ready(() => {
  let tempPref = document.cookie.match(/temp=(f|c)/)[1] || 'f'
  console.log($(`[data-units='${tempPref}']`))
  $(`[data-units='${tempPref}']`).addClass('selected')
})

// toggle units
$toggleItems.on('click', (e) => {
  let $target = $(e.target)
  // only do something if selecting different units
  if (optionIsNotSelected($target)) {
    let units = $target.attr('data-units')
    $toggleItems.toggleClass('selected')
    // reset cookie
    document.cookie = 'temp=' + units
    // then replace temp in DOM
    $temp.text(window.weather[units] + ' °' + units.toUpperCase())
    hideSettings()
  }
})

/* function definitions */

function settingsAreVisible () {
  return $settingsMenu.css('max-height') !== '0px'
}

function hideSettings () {
  $tempToggle.animate({'opacity': 0}, 250, () => {
    $settingsMenu.animate({'max-height': '0px'}, 500)
  })
}

function showSettings () {
  let iconRightPosition = $settingsIcon.position().left + $settingsIcon.width()
  $settingsMenu.css('left', iconRightPosition - $settingsMenu.width())
  $settingsMenu.animate({'max-height': '100px'}, 500, () => {
    $tempToggle.animate({'opacity': 1}, 250)
  })
}

function optionIsNotSelected (target) {
  // target should be jQuery object
  return !target.hasClass('selected')
}
