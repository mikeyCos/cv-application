# Changelog
---
### 17 MAY 2024
- 
---
### 16 MAY 2024
- Created `footer` module, `help` and `textarea` stylesheets.
- Updated `stringToSentenceCase` utility module; returns a string with the first letter capitalized and the rest of the characters/words are lowercase.
- Split `FormItem` component module into separate component modules, `Input`/`Select`/`Textarea`.
- Implemented a 'show help'/'hide help' button that will toggle help content.
- Fixed state issue for skills due to an incorrect `dataAttributes` property; changed `'data-key': 'skill'` to `'data-key': 'skills'`
---
### 15 MAY 2024
- Currently, the `header`/`contact` and 'existing forms' will need to pass form/input validation; 'existing forms' are forms or form items that were added during `isEditing` is true state.
- Forms with the class `no-validate-all` will be ignored during `validateForms`.
The `form` parameter will always need to be a form element instead of an event.
- Delete handlers no longer depend on a the `Event` interface, instead the handler is called as a callback in the `Modal` component, and a `btn` element is passed in.
- Created a `Modal` component for item delete confirmation; currently, only renders two buttons, 'cancel' and 'confirm'.
- Deleted `setInputEventHandler` utility module.
- Created `data.inputPatternErrors` and imported it in `formValidation` module.
- Rewrote month input into two elements for education section.
- Added `degree` and `schoolName` to `inputs` objects in `formValidation` module.
- Temporarily removed default export from `formValidation` module.
- No longer passing `validateForm` as a prop in `app` module; importing `validateForm` directly into modules.
---
### 14 MAY 2024
- Added `month`/`year`/`description` to `inputs` objects in `formValidation` module.
- Changed `dateFrom` and `dateTo` string properties into object properties with `month` and `year` as their properties.
- Split the input of type month into select and input elements; the select element is for months and input is for the year.
---
### 13 MAY 2024
- `FormItem` component now adds a container for input error messages.
- Input pattern added to object properties in `formValidation` module.
- Form validation added to a handful of inputs.
- Created `form-validation` branch.
- Commit before merge `module-form` branch to main branch.
---
### 10 MAY 2024
- Created `formValidation` module and is imported into the `app` module; `validateForm` is assigned `formValidation` and is passed into section's prop.
- Added `placeholder` property to inputs, excluding inputs of `type: 'month'`.
- Created `parseDate` module; reformats date from 'YYYY-MM' to 'MMM YYYY'.
---
### 09 MAY 2024
- Deleted `inputsProperties`.
- Created `validateForms` and `areFormsValid` in `App` module; names could change in the future.
- Changed button property `clickHandler` to `onClick`.
- Created `data.initialStates`; contains initial states for each module.
---
### 08 MAY 2024
- Renamed `keyToSentenceCase` to `stringToSentenceCase`.
- Created `inputsProperties` in `data` directory.
- Properties passed into a `FormItem` component look as follows:
```js
<FormItem
  id="dateFrom"
  value={workData.work.dateFrom}
  name="dateFrom"
  onChange={onChangeHandler}
  type="month"
  dataAttributes={{ 'data-key': 'work' }}
/>
```
- Created `FormItem` module that will return a list item with label and input elements, and children components.
- Checked out CHANGELOG.md from `module-form` branch to `main` and `form-input` branches.
- The `module-form` branch accepts inputs without form validation and renders appropriately; little to no props usage.
- Sections involving an add button have the ability to edit and delete their children.
---
### 07 MAY 2024
- Job descriptions can be added and deleted; inputs are not cleared when job descriptions are added.
- Added `nextId` property to work objects to create new id's when adding descriptions; no memoization used. 
- Work can be added and deleted.
- Added `description` and `descriptions` properties to `work` objects.
- Created `onChangeHandlerDescription` in `Works` module.
---
### 06 MAY 2024
- Hardcoded form elements and their respective children in each section.
- Created `module-form` branch; this does not practice passing props to components.
- Re-enabled some sections.
- Commit before creating another branch.
---
### 05 MAY 2024
- Rewrote `createInputsProps` to reduce and call itself if the `root` parameter is an array.
- If `set` property exists from `props` parameter for the `Form` component, the `set` will be mapped over to create one or more `FormItemList` components.
- Disabled the majority of sections.
- Disabled the `setInputEventHandler`.
---
### 04 MAY 2024
- Created two properties for the `formProps` object, `default` is for the inputs adding new data and `set` is for existing data that can change or be deleted.
- Set up boilerplate event handlers in a variety of components; they do not currently update any state.
- Renamed `setInputProps` to `createInputsProps` and rewrote function body to map through entries instead of keys.
- Created `form-input` branch.
---
### 03 MAY 2024
- Commit before creating a branch.
- Created `setInputEventHandler` utility module; accepts a `data` object, a `callback` function, and a `isDefault` boolean. Inputs `onChange` event is handled by the `callback` function.
- User can add and remove skills.
---
### 02 MAY 2024
- Created `setInputProps` utility module; returns an array of property objects for input elements. For example:
```js
const [headerData, setHeaderData] = useState({
    firstName: { id: 0, value: '' },
    lastName: { id: 1, value: '' },
    jobTitle: { id: 2, value: '' },
  });
const propsForInputs = isEditing && setInputProps(headerData);
console.log(propsForInputs[0]);
// returns {id: 0, value: '', label: 'first Name', name: 'firstName', type: 'text'}
```
- Copied `README` boilerplate from [Best README Template](https://github.com/othneildrew/Best-README-Template).
- Created `CHANGELOG.md`.
- Created `keysToSentenceCase` utility module; returns a key in sentence case. For example:
```js
const label = keysToSentenceCase('firstName');
console.log(label);
// returns 'first Name';
```
- Created `concatenateNames` utility module; returns a string conditionally made up of `firstName` and `lastName`. There will be no space in the beginning or end if `firstName` or `lastName` have no characters, respectively. For example:
```js
concatenateNames('', 'Woody');
// returns 'Woody'
concatenateNames('Joe', '');
// returns 'Joe'
```
- Created `utilities` subdirectory in `src` directory.
- Created a variety of stylesheets and applied basic CSS properties to each section.
- Initialized components; `Button`/`Contact`/`Education`/`Form`/`Header`/`References`/`Skills`/`Work`.
- Created static skeleton.
---
### 01 MAY 2024
- Initial commit.
- Removed boilerplate code from template.
- Ran `npm create vite@latest cv-application -- --template react`
---