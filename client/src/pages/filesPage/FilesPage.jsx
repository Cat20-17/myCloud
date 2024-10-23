import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getFiles } from '../../redux/reducers/filesSlice';
const FilesPage = () => {
  const dispatch = useDispatch();
  const files = useSelector(state => state.files.files);

  const fetchFiles = useCallback(async () => {
    await dispatch(getFiles());
  }, [dispatch]
  );

  useEffect(() => {
    fetchFiles();
  }, [dispatch, fetchFiles]);

  return (
    <div>
      <h1>USER PAGE</h1>
      {files && <h1>{ files }</h1>}
      {!files && <h1>No Files</h1>}
    </div>
  );
};

export default FilesPage;