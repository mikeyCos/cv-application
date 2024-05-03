# Changelog
---
### 03 MAY 2024
- 
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