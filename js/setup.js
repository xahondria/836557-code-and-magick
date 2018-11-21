'use strict';

// wizard constructor

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

// wizard constructor end


var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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


// функция заполнения блока DOM-элементами на основе массива JS-объектов

var createDOMElements = function (array, elementGenerator, positionInDOM) {
  var fragment = document.createDocumentFragment();

  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(elementGenerator(array[i]));
  }
  positionInDOM.appendChild(fragment);
};

createDOMElements(wizards, renderWizard, similarListElement);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
