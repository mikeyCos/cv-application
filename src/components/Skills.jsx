import { useState } from 'react';
import { skills as initialSkillsState } from '../data/data.initialStates';
import FormItem from './FormItem';
import Button from './Button';
import { validateForm, validateInput } from '../utilities/formValidation';
import DeleteMessageBox from './DeleteMessageBox';
import '../styles/skills.css';
// https://codesandbox.io/p/sandbox/react-dev-64n8l5?file=%2Fsrc%2FTaskList.js&utm_medium=sandpack
// https://www.w3.org/WAI/tutorials/forms/labels/
// https://dev.to/ajones_codes/a-better-guide-to-forms-in-react-47f0
let nextId = 1;

export default function Skills({ isEditing, setModal, deleteRef, btnRef }) {
  const [skillsData, setSkillsData] = useState({
    ...initialSkillsState,
  });

  const onChangeHandler = (e) => {
    // Temporarily does not work
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

  const deleteSkillHandler = (btn) => {
    const { id } = btn.dataset;
    setSkillsData({
      ...skillsData,
      skills: skillsData.skills.filter((skill) => {
        return skill.id !== +id && skill;
      }),
    });
  };

  return (
    <section className="skills" data-is-editing={isEditing}>
      <div>
        <h2 className="content-heading">Skills</h2>
        {isEditing ? (
          <div>
            <form
              className="no-validate-all"
              noValidate={true}
              onSubmit={(e) => validateForm(e, addSkillHandler)}
            >
              <ul>
                <FormItem
                  id="skill"
                  value={skillsData.skill}
                  name="skill"
                  onBlur={validateInput}
                  onChange={onChangeHandler}
                  dataAttributes={{ 'data-key': 'skill' }}
                  placeholder="ex. 'Critical Thinking'"
                  label={{ text: '*' }}
                >
                  <div className="btn-container">
                    <Button className="btn-form btn-add" type="submit" text="Add" />
                  </div>
                </FormItem>
              </ul>
            </form>
            {skillsData.skills.length > 0 && (
              <form noValidate={true} onSubmit={(e) => validateForm(e)}>
                <ul>
                  {skillsData.skills.map((skill) => {
                    return (
                      <FormItem
                        key={skill.id}
                        id={`skill_${skill.id}`}
                        value={skill.value}
                        type="text"
                        name="skill"
                        onBlur={validateInput}
                        onChange={onChangeHandler}
                        dataAttributes={{ 'data-id': skill.id, 'data-key': 'skills' }}
                        placeholder="Edit or delete skills"
                        label={{ className: 'visibility-hidden' }}
                      >
                        <div className="btn-container">
                          <Button
                            className="btn-form btn-delete"
                            text="Delete skill"
                            onClick={(e) => {
                              const btn = e.currentTarget;
                              btnRef.current = btn;
                              deleteRef.current = {
                                callback: deleteSkillHandler,
                                btn: btn,
                                message: (
                                  <DeleteMessageBox
                                    btn={btn}
                                    arr={skillsData.skills}
                                    options={{
                                      section: 'skill',
                                      keys: ['value'],
                                    }}
                                  />
                                ),
                              };
                              setModal(true);
                            }}
                            dataAttributes={{ 'data-id': skill.id }}
                          />
                        </div>
                      </FormItem>
                    );
                  })}
                </ul>
              </form>
            )}
          </div>
        ) : (
          skillsData.skills.length > 0 && (
            <ul className="skills-container">
              {skillsData.skills.map((skill) => {
                return <li key={skill.id}>{skill.value}</li>;
              })}
            </ul>
          )
        )}
      </div>
    </section>
  );
}
