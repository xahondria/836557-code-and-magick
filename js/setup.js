'use strict';

// wizard constructor

var wizards = [];
var wizardsNumber = 4;

var generateWisardName = function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  return NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
};

var generateWizardCoatColor = function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  return COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
};

var generateWizardEyesColor = function () {
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  return EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];
};

for (var i = 0; i < wizardsNumber; i++) {
  wizards[i] = {
    name: generateWisardName(),
    coatColor: generateWizardCoatColor(),
    eyesColor: generateWizardEyesColor()
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

var generateDOMElements = function (array, elementGenerator, positionInDOM) {
  var fragment = document.createDocumentFragment();

  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(elementGenerator(array[i]));
  }
  positionInDOM.appendChild(fragment);
};

generateDOMElements(wizards, renderWizard, similarListElement);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
