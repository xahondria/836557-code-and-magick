'use strict';

// wizard constructor

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizards = [];
var wizardsNumber = 4;

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

for (var i = 0; i < wizardsNumber; i++) {
  wizards[i] = {
    name: getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
}

var playerWizard = {
  element: document.querySelector('.setup-player'),

  generateCoatColor: function () {
    var $this = this;

    this.element.querySelector('.wizard-coat').addEventListener('click', function () {
      var newColor = getRandomElement(COAT_COLORS);
      $this.element.querySelector('.wizard-coat').style.fill = newColor;
      $this.element.querySelector('.coat-color').value = newColor;
    });
  },

  generateEyesColor: function () {
    var $this = this;
    this.element.querySelector('.wizard-eyes').addEventListener('click', function () {
      var newColor = getRandomElement(EYES_COLORS);
      $this.element.querySelector('.wizard-eyes').style.fill = newColor;
      $this.element.querySelector('.eyes-color').value = newColor;
    });
  },

  generateFireballColor: function () {
    var $this = this;
    this.element.querySelector('.setup-fireball-wrap').addEventListener('click', function () {
      var newColor = getRandomElement(FIREBALL_COLORS);
      $this.element.querySelector('.setup-fireball-wrap').style.backgroundColor = newColor;
      $this.element.querySelector('.fireball-color').value = newColor;
    });
  },

};

playerWizard.generateCoatColor();
playerWizard.generateEyesColor();
playerWizard.generateFireballColor();

// wizard constructor end

// Events

var userDialog = document.querySelector('.setup');
var handle = userDialog.querySelector('.upload');

var buttonSetupOpen = document.querySelector('.setup-open');
var buttonSetupClose = document.querySelector('.setup-close');

var nameInput = userDialog.querySelector('.setup-user-name');

var show = function (element, top) {
  element.classList.remove('hidden');
  element.style.top = top + 'px';
  element.style.left = 50 + '%';
};

buttonSetupOpen.addEventListener('click', function (ev) {
  ev.preventDefault();
  ev.stopPropagation();
  show(userDialog, 80);
});

buttonSetupOpen.querySelector('.setup-open-icon').addEventListener('keydown', function (ev) {
  if (ev.key === 'Enter') {
    ev.preventDefault();
    ev.stopPropagation();
    show(userDialog, 80);
  }
});

buttonSetupClose.addEventListener('click', function (ev) {
  ev.preventDefault();
  ev.stopPropagation();
  userDialog.classList.add('hidden');
});


window.addEventListener('keydown', function (ev) {
  if (ev.key === 'Escape') {
    ev.preventDefault();
    ev.stopPropagation();

    if (!userDialog.classList.contains('hidden') && nameInput !== document.activeElement) {
      userDialog.classList.add('hidden');
    }
  }
});

buttonSetupClose.addEventListener('keydown', function (ev) {
  if (ev.key === 'Enter') {
    ev.preventDefault();
    ev.stopPropagation();
    userDialog.classList.add('hidden');
  }
});

// Events end


var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// функция перетаскивания окна
var moveElement = function (element, elementHandle) {

  elementHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // перемещаем этот элемент
      element.style.top = (element.offsetTop - shift.y) + 'px';
      element.style.left = (element.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (ev) {
          ev.preventDefault();
          elementHandle.removeEventListener('click', onClickPreventDefault);
        };
        elementHandle.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

};

moveElement(userDialog, handle);


// функция заполнения блока DOM-элементами на основе массива JS-объектов

var createDOMElements = function (array, elementGenerator, positionInDOM) {
  var fragment = document.createDocumentFragment();

  for (i = 0; i < array.length; i++) {
    fragment.appendChild(elementGenerator(array[i]));
  }
  positionInDOM.appendChild(fragment);
};

createDOMElements(wizards, renderWizard, similarListElement);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
