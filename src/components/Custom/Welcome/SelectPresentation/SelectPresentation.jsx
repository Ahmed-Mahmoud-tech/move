import React, { useEffect, useState } from 'react';
import Button from '../../../Shard/Button/Button';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Pagination from '../../../Shard/PresentationCarousel/PresentationCarousel';
import FileUpload from '../../../Shard/FileUpload/FileUpload';
import UplaodPresentation from '../UploadPresentation/UploadPresentation';

export default function SelectPresentation() {
  const [list, setList] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(process.env.PUBLIC_URL + '/db.json');
      const responseList = await response.json();
      setList(responseList);
    })();
  }, []);

  const exportPresentation = async (id) => {
    await window.versions.exportPresentation(id);
  };

  const deletePre = async (id) => {
    await window.versions.deletePresentation(id);
  };

  return (
    <div className="w-[40%] min-w-[340px] mx-auto">
      <h2 className="text-2xl font-semibold text-yellowColor">Library</h2>
      <div className="search relative  my-2">
        <FaMagnifyingGlass className="absolute top-3 left-3" />

        <input
          type="text"
          name=""
          id=""
          className="w-full p-2 pl-9 bg-blackColor border border-whiteColor rounded-lg overflow-hidden"
        />
      </div>

      <div className="mb-4">
        {list?.presentations && (
          <Pagination
            className=""
            exportPresentation={exportPresentation}
            deletePre={deletePre}
            presentations={Object.values(list?.presentations)}
          />
        )}
      </div>

      <div className="uploadPresentation">
        <UplaodPresentation />
      </div>
    </div>
  );
}
