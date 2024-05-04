import { useState } from 'react';
import Form from './Form';
import setInputProps from '../utilities/setInputProps';
import setInputEventHandler from '../utilities/setInputEventHandler';
import '../styles/skills.css';

let nextId = 2;
export default function Skills({ isEditing }) {
  const [skillsData, setSkillsData] = useState({
    skill: {
      id: 0,
      value: '',
    },
    skills: [
      { id: 0, value: 'test' },
      { id: 1, value: 'test again' },
    ],
  });

  const onChangeHandler = setInputEventHandler(skillsData, setSkillsData, true);
  const onChangeHandlerUpdate = setInputEventHandler(skillsData, (id, value) => {
    const newSkills = Object.values(skillsData.skills).map((skill) => {
      return skill.id === +id ? { id: +id, value } : skill;
    });

    setSkillsData({
      ...skillsData,
      skills: newSkills,
    });
  });

  const addSkillHandler = () => {
    setSkillsData({
      skill: {
        ...skillsData.skill,
        value: '',
      },
      skills: [...skillsData.skills, { id: nextId++, value: skillsData.skill.value }],
    });
  };

  const deleteSkillHandler = (e) => {
    setSkillsData({
      ...skillsData,
      skills: [...skillsData.skills.filter((skill) => skill.id !== +e.currentTarget.dataset.id)],
    });
  };

  const propsForInputs = isEditing && setInputProps({ skill: { ...skillsData.skill } });
  const propsForSkills =
    isEditing &&
    setInputProps(
      Object.values(skillsData.skills).reduce((accumulator, currentValue) => {
        return {
          ...accumulator,
          [`skill${currentValue.id}`]: { ...currentValue },
        };
      }, {}),
    );

  return (
    <section className="skills">
      <div>
        <h2>Skills</h2>
        {isEditing ? (
          <Form
            props={[
              {
                id: 0,
                inputs: propsForInputs,
                onChangeHandler: onChangeHandler,
                button: { text: 'Add', className: 'skill-add', clickHandler: addSkillHandler },
              },
              {
                id: 1,
                inputs: propsForSkills,
                onChangeHandler: onChangeHandlerUpdate,
                button: {
                  text: 'Delete',
                  className: 'skill-delete',
                  clickHandler: deleteSkillHandler,
                },
              },
            ]}
          ></Form>
        ) : (
          // <List arr={skillsData.skills} />
          <div>Hello world!</div>
        )}
      </div>
    </section>
  );
}

function List({ arr }) {
  return (
    <ul>
      {arr.map((item) => {
        return <li key={item.id}>{item.value}</li>;
      })}
    </ul>
  );
}
