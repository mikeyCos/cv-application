import { useState } from 'react';
import Form from './Form';
import createInputsProps from '../utilities/createInputsProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/skills.css';
// https://codesandbox.io/p/sandbox/react-dev-64n8l5?file=%2Fsrc%2FTaskList.js&utm_medium=sandpack
// https://www.w3.org/WAI/tutorials/forms/labels/
let nextId = 1;

export default function Skills({ isEditing }) {
  const [skillsData, setSkillsData] = useState({
    skill: '',
    skills: [
      { id: 0, value: 'test' },
      { id: 1, value: 'test again' },
    ],
  });

  const onChangeHandler = (e) => {
    const input = e.currentTarget;
    const value = input.value;
    const { id, key, prop } = { prop: input.name, ...input.dataset };
    const data = skillsData[key];
    const newSkill = Array.isArray(data)
      ? data.map((item) => {
          return item.id === +id ? { ...item, value } : item;
        })
      : value;

    setSkillsData({
      ...skillsData,
      [key]: newSkill,
    });
  };

  const addSkillHandler = () => {
    const newSkill = { id: ++nextId, value: skillsData.skill };
    setSkillsData({
      skill: '',
      skills: [...skillsData.skills, newSkill],
    });
  };

  const deleteSkillHandler = (e) => {
    const btn = e.currentTarget;
    const { id } = btn.dataset;
    setSkillsData({
      ...skillsData,
      skills: skillsData.skills.filter((skill) => {
        return skill.id !== +id && skill;
      }),
    });
  };

  return (
    <section className="skills">
      <div>
        <h2>Skills</h2>
        {isEditing ? (
          <form>
            <ul>
              <li>
                <label>Skill</label>
                <input
                  id="skill"
                  value={skillsData.skill}
                  type="text"
                  name="skill"
                  onChange={onChangeHandler}
                  data-key="skill"
                />
              </li>
              <button type="button" onClick={addSkillHandler}>
                Add
              </button>
            </ul>

            <ul>
              {skillsData.skills.map((skill) => {
                return (
                  <li key={skill.id}>
                    <label htmlFor={`skill_${skill.id}`}></label>
                    <input
                      id={`skill_${skill.id}`}
                      value={skill.value}
                      type="text"
                      name="skills"
                      onChange={onChangeHandler}
                      data-id={skill.id}
                      data-key="skills"
                    />
                    <button type="button" data-id={skill.id} onClick={deleteSkillHandler}>
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </form>
        ) : (
          <ul>
            {skillsData.skills.map((skill) => {
              return <li key={skill.id}>{skill.value}</li>;
            })}
          </ul>
        )}
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
