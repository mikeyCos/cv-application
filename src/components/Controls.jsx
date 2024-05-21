import GithubIcon from '../assets/icons/github-mark/github-mark.svg?react';
import '../styles/controls.css';
/* App button controls
 * Renders help and submit buttons
 */
export default function Controls({ btnRef, openModal, setModal, children }) {
  return (
    <div className="app-controls">
      <div className="btn-wrapper">
        <p>Need help?</p>
        <button
          onClick={(e) => {
            btnRef.current = e.currentTarget;
            setModal(true);
          }}
        >
          {openModal ? 'Hide help' : 'Show help'}
        </button>
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
