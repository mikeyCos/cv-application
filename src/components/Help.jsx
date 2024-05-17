import { useState } from 'react';
import '../styles/help.css';

export default function Help() {
  const [showHelp, setHelp] = useState(true);
  return (
    <article className="help">
      <p>Need help?</p>
      <button onClick={() => setHelp(!showHelp)}>{showHelp ? 'Hide help' : 'Show help'}</button>
      {showHelp && (
        <div>
          <p>
            Before clicking the &apos;Submit CV&apos; button, labels denoted with two asterisks (**)
            require the input to be filled appropriately.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur perferendis ut
            officia magnam consectetur hic fugiat excepturi ea, distinctio sit numquam quod dicta.
          </p>
        </div>
      )}
    </article>
  );
}
