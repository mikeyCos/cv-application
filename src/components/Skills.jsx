import { useState } from 'react';
import Form from './Form';
import createInputsProps from '../utilities/createInputsProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/skills.css';
// https://codesandbox.io/p/sandbox/react-dev-64n8l5?file=%2Fsrc%2FTaskList.js&utm_medium=sandpack
// https://www.w3.org/WAI/tutorials/forms/labels/
let nextId = 3;

export default function Skills({ isEditing }) {
  const [skillsData, setSkillsData] = useState({
    skill: {
      id: 0,
      value: '',
    },
    skills: [
      { id: 0, skill: { value: 'test' } },
      { id: 1, skill: { value: 'test again' } },
      // { id: 0, value: 'test' },
      // { id: 1, value: 'test again' },
    ],
  });

  const onChangeHandler = (e) => {
    console.log('onChangeHandler firing!');
    console.log(e.currentTarget);
  };

  const changeSkillHandler = (e) => {
    console.log(`changeSkillHandler is firing!`);
    console.log(e.currentTarget);
  };

  const addSkillHandler = (e) => {
    console.log(`addSkillHandler firing!`);
  };

  const deleteSkillHandler = (e) => {
    console.log(`deleteSkillHandler`);
  };

  const formProps = isEditing && {
    default: {
      inputs: createInputsProps(skillsData.skill, {
        onChangeHandler,
      }),
      button: {
        text: 'Add',
        className: 'btn skill-add',
        clickHandler: addSkillHandler,
      },
    },
    set: {
      inputs: createInputsProps(skillsData.skills, {
        className: 'visually-hidden',
        name: 'skill',
        onChangeHandler: changeSkillHandler,
      }),
      button: {
        text: 'Delete',
        className: 'btn skill-delete',
        clickHandler: deleteSkillHandler,
      },
    },
  };

  console.log(formProps);

  return (
    <section className="skills">
      <div>
        <h2>Skills</h2>
        {isEditing ? <Form className="form_skills" props={formProps} /> : <div>Loading</div>}
      </div>
    </section>
  );
}

/*
<form>
  <ul>
    <li class='form-item'>
      <label>Skill:</label>
      <input type='text'></input>
    </li>
    <button>Add</button>
  </ul>

  <ul>
    <li class='form-item'>
      <label>Skill0:</label>
      <input type='text'></input>
    </li>
    <button>Delete</button>
  </ul>

  <ul>
    <li class='form-item'>
      <label>Skill1:</label>
      <input type='text'></input>
      <button>Delete</button>
    </li>
  <ul>

  <ul>
    <li class='form-item'>
      <label>Skill2:</label>
      <input type='text'></input>
      <button>Delete</button>
    </li>
  </ul>
</form>
*/
