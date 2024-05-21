import getData from '../utilities/getData';

export default function GenerateDeleteMessage({ btn, arr, options }) {
  const { keys, section } = options;
  const data = getData(btn, arr);
  return (
    <p>
      Are you sure you want to delete{' '}
      <span>
        &quot;
        {keys.reduce((accumulator, currentValue, index) => {
          return accumulator + `${index >= 1 ? ' ' : ''}` + data[currentValue];
        }, '')}
        &quot;
      </span>{' '}
      from the &quot;<span>{section}</span>&quot; section?
    </p>
  );
}
