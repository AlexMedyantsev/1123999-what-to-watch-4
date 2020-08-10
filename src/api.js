import axios from "axios";
import {connect} from "react-redux";
import {ActionCreator} from "./reducer/condition/condition.js";

const Error = {
  UNAUTHORIZED: 401,
};


const createAPI = (onError) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;
    if (response) {
      onError(response.status);
    } else if (response.status === Error.UNAUTHORIZED) {
      onError(`Вы не авторизированы`);
    } else {
      onError(`Отсутствует интернет подключение`);
    }

    
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

const mapStateToProps = {
};

const mapDispatchToProps = {
  changeErrorFlag: ActionCreator.changeErrorFlag(),
};

export {createAPI};
export default connect(mapStateToProps, mapDispatchToProps)(createAPI);
