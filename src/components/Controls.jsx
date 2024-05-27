import { useEffect, useRef } from 'react';
import Button from './Button';
import GithubIcon from '../assets/icons/github-mark/github-mark.svg?react';
import '../styles/controls.css';
/* App button controls
 * Renders help and submit buttons
 */
export default function Controls({ btnRef, openModal, setModal, children }) {
  const controls = useRef(null);
  useEffect(() => {
    const onScroll = (e) => callback(controls.current);
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <div ref={controls} className="app-controls">
      <div className="btn-wrapper">
        <p>Need help?</p>
        <Button
          type="button"
          text={openModal ? 'Hide help' : 'Show help'}
          onClick={(e) => {
            btnRef.current = e.currentTarget;
            setModal(true);
          }}
        />
      </div>
      <div className="btn-wrapper">{children}</div>
      <div className="anchor-wrapper">
        <a href="https://github.com/mikeyCos/cv-application" target="_blank">
          <GithubIcon className="icon github" />
        </a>
      </div>
    </div>
  );
}

const callback = (controls) => {
  controls.classList.toggle('sticky', window.scrollY > controls.offsetTop);
};
