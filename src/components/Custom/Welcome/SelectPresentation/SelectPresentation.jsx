import React, { useEffect, useState } from 'react';
import Button from '../../../Shard/Button/Button';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Pagination from '../../../Shard/Pagination/Pagination';
import FileUpload from '../../../Shard/FileUpload/FileUpload';

export default function SelectPresentation() {
  const [list, setList] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(process.env.PUBLIC_URL + '/db.json');
      const responseList = await response.json();
      setList(responseList);
    })();
  }, []);
  const images = [
    'https://placekitten.com/800/400',
    'https://placekitten.com/801/400',
    'https://placekitten.com/802/400',
    'https://placekitten.com/803/400',
  ];
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
    <div className="w-[40%] min-w-[340px] mx-auto">
      <h2 className="text-2xl font-semibold">Your Presentation</h2>
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
            presentations={Object.values(list?.presentations)}
          />
        )}
      </div>

      <div className="uploadPresentation">
        <input type="file" name="file" id="" onChange={(e) => uploadPre(e)} />
        {/* <FileUpload
          text="Upload the exported book"
          name="Drag and drop exported book or click to select one"
          change={(e) => uploadPre(e)}
        /> */}
      </div>
    </div>
  );
}
