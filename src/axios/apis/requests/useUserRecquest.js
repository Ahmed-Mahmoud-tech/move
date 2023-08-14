import useApi from '../../useApi';
import { useDispatch } from 'react-redux';
import { logOut as logOutRequest } from '../../../store/slices/auth';

const useUserRequest = () => {
  //   const dispatch = useDispatch()
  //   const Request = useApi()

  //   const logOut = async () => {
  //     dispatch(logOutRequest())
  //     return await Request.get(`logout`)
  //   }

  //   const signIn = async (data) => {
  //     return await Request.post('identity/sadmin/v1/Auth/Signin', data)
  //   }
  //   const userData = async () => {
  //     return await Request.get('identity/sadmin/v1/Account')
  //   }
  //   const editTenantRequest = async (data) => {
  //     return await Request.put('management/sadmin/v1/Tenants', data)
  //   }
  //   const deleteTenantReq = async (data) => {
  //     return await Request.delete(`management/sadmin/v1/Tenants`, data)
  //   }
  //   const editProductRequest = async (data) => {
  //     return await Request.put(
  //       `management/sadmin/v1/Products/${data.id}`,
  //       data.data
  //     )
  //   }

  return {
    // signIn,
    // userData,
    // logOut,
    // editTenantRequest,
    // deleteTenantReq,
    // editProductRequest,
  };
};
export default useUserRequest;
