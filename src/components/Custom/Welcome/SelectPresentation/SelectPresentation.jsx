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

  const uploadPre = async (e) => {
    await window.versions.importPresentation({
      fileName: e.target.files[0].name,
      filePath: e.target.files[0].path,
    });
  };
  const deletePre = async (id) => {
    await window.versions.deletePresentation(id);
  };

  return (
    <div>
      SelectPresentation
      {list?.presentations &&
        Object.values(list?.presentations).map((presentation, index) => (
          <div key={index}>
            <a href={`/display/${presentation.id}`}>{presentation.name}</a>
            <span
              style={{ background: 'green' }}
              onClick={() => exportPresentation(presentation.id)}
            >
              exportPresentation
            </span>
            <span
              style={{ background: 'red', padding: '5px' }}
              onClick={() => deletePre(presentation.id)}
            >
              x
            </span>
          </div>
        ))}
      <hr />
      <hr />
      <div className="uploadPresentation">
        <input type="file" name="file" id="" onChange={(e) => uploadPre(e)} />
      </div>
    </div>
  );
}
