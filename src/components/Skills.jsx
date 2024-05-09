import { useState } from 'react';
import FormItem from './FormItem';
import Button from './Button';
import fetchProp from '../data/inputsProperties';
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

  Object.entries(skillsData).map(([key, value]) => {
    console.log(key);
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
              <FormItem
                id="skill"
                value={skillsData.skill}
                name="skill"
                onChange={onChangeHandler}
                dataAttributes={{ 'data-key': 'skill' }}
              />
              <Button text="Add" clickHandler={addSkillHandler}></Button>
            </ul>

            <ul>
              {skillsData.skills.map((skill) => {
                return (
                  <FormItem
                    key={skill.id}
                    id={`skill_${skill.id}`}
                    value={skill.value}
                    type="text"
                    name="skills"
                    onChange={onChangeHandler}
                    dataAttributes={{ 'data-id': skill.id, 'data-key': 'skill' }}
                  >
                    <Button
                      text="Delete skill"
                      clickHandler={deleteSkillHandler}
                      dataAttributes={{ 'data-id': skill.id }}
                    ></Button>
                  </FormItem>
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
