import { useState } from 'react';
import { skills as initialSkillsState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import '../styles/skills.css';
// https://codesandbox.io/p/sandbox/react-dev-64n8l5?file=%2Fsrc%2FTaskList.js&utm_medium=sandpack
// https://www.w3.org/WAI/tutorials/forms/labels/
// https://dev.to/ajones_codes/a-better-guide-to-forms-in-react-47f0
let nextId = 1;

export default function Skills({ isEditing, validateForm }) {
  const [skillsData, setSkillsData] = useState({
    ...initialSkillsState,
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
          <>
            <form noValidate={true} onSubmit={validateForm(() => console.log('callback firing'))}>
              <ul>
                <FormItem
                  id="skill"
                  value={skillsData.skill}
                  name="skill"
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'skill' }}
                  placeholder="ex. 'Critical Thinking'"
                  props={{ minLength: 3, required: true }}
                />
                {/* <Button type="submit" text="Add" onClick={addSkillHandler}></Button> */}
                <Button type="submit" text="Add"></Button>
              </ul>
            </form>
            <form>
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
                      placeholder="Edit or delete skills"
                      label={{ className: 'visibility-hidden' }}
                    >
                      <Button
                        text="Delete skill"
                        onClick={deleteSkillHandler}
                        dataAttributes={{ 'data-id': skill.id }}
                      ></Button>
                    </FormItem>
                  );
                })}
              </ul>
            </form>
          </>
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
