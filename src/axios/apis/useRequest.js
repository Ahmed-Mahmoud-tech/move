import useUserRequest from './requests/useUserRecquest';
const useRequest = () => {
  const useRequest = useUserRequest();
  return { ...useRequest };
};
export default useRequest;
