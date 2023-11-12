import React, { useEffect, useState } from 'react';

export default function SelectPresentation() {
  const [list, setList] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(process.env.PUBLIC_URL + '/db.json');
      const responseList = await response.json();
      setList(responseList);
      console.log(responseList);
    })();
  }, []);

  const exportPresentation = async (id) => {
    await window.versions.exportPresentation(id);
  };

  return (
    <div>
      SelectPresentation
      {list?.presentations &&
        Object.values(list?.presentations).map((presentation, index) => (
          <div key={index}>
            <a href={`/display/${presentation.id}`}>{presentation.name}</a>{' '}
            <span
              style={{ background: 'green' }}
              onClick={() => exportPresentation(presentation.id)}
            >
              exportPresentation
            </span>
          </div>
        ))}
    </div>
  );
}
